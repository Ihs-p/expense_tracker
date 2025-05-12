import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import { LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanaceOverview from "../../components/dashboard/FinanaceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [DashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong,please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();

  
    return () => {};
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="py-5 mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <InfoCard
            icon={<IoMdCard />}
            label="Total balance"
            value={addThousandsSeperator(DashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThousandsSeperator(DashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Expense"
            value={addThousandsSeperator(DashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
        <RecentTransactions
        transactions = {DashboardData?.recentTransactions} 
        onSeeMore  = {()=> navigate('/expense')}/>

        <FinanaceOverview 
        totalBalance   = {DashboardData?.totalBalance || 0}
        totalIncome = {DashboardData?.totalIncome || 0  }
        totalExpense = {DashboardData?.totalExpenses || 0  }
        />

        <ExpenseTransactions 
        transactions = {DashboardData?.last30DaysExpenses?.transactions  } 
        onSeeMore  = {()=> navigate('/expense')}
        />

        <Last30DaysExpenses 
        data = {DashboardData?.last30DaysExpenses?.transactions  } 
        onSeeMore  = {()=> navigate('/expense')}
        />


        <RecentIncomeWithChart 
        data = {DashboardData?.last60daysIncome?.transactions.slice(0,4) || []  } 
        totalIncome  = { DashboardData?.totalIncome || 0 }
        />

        <RecentIncome 
        transactions  = {DashboardData?.last60daysIncome?.transactions.slice(0,4) || []  } 
        onSeeMore  =  {()=> navigate('/income')}
        />




      </div>

      </div>
    </DashboardLayout>
  );
};

export default Home;
