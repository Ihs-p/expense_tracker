import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";

const RecentIncome = ({transactions,onSeeMore}) => {
    
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="Text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />

        </button>
      </div>
      <div className="mt-6">

        {
            transactions?.slice(0,5)?.map((item)=>(
                <TransactionsInfoCard 
                key={item._id}
                title={item.source}
                source = {item.icon}
                data = {moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn
                />
            ))
        }

      </div>
    </div>
  );
};

export default RecentIncome;
