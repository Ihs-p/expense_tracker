import React, { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import CustomLineChart from "../charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onaddexpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense OverVIew</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights to where your
            money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onaddexpense}>
          <LuPlus className="text-lg"  />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
