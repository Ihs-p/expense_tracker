const { Types, isValidObjectId } = require("mongoose");
const Expense = require("../models/Expense");
const Income = require("../models/Income");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // fetch total income & Expenses

    const totalIncome = await Income.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    console.log("total income ", totalIncome, {
      userid: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // get income transaction last 60 days

    const last60daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // get total income for last 60 days

    const incomeLast60Days = last60daysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // get expense transaction in last 30 days 

    const last30DaysExpenseTransaction = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // get total expense for last 30 days
    const expenselast30Days = last30DaysExpenseTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // fetch last 5 transactions

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    // final response

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenselast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60daysIncome: {
        total: incomeLast60Days,
        transactions: last60daysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};
