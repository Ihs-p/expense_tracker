const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "expense deleted successfully" });
  } catch (err) {
    res.status(500).json({message:"server error"});
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item)=>(
      {
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
      }
    )   )
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    console.log(err);
    
    res.status(500).json({message:"server error"});

  }
};
