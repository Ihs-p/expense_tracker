import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';

const IncomeOverview = ({transactions,onaddincome}) => {
    const [chartData,setChartData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result)
        return ()=>{}
    },[transactions])
  return (
    <div className='card'>

        <div className='flex items-center justify-between'>
            <div>

                <h5 className='text-lg'>Income OverVIew</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze your income trends,</p>
            </div>

        <button className='add-btn' onClick={onaddincome}>
 <LuPlus className='text-lg'  Add Income   />Add Income
        </button>
        </div>

        <div className='mt-10'>
        <CustomBarChart data={chartData}   />
        </div>
        
    </div>
  )
}

export default IncomeOverview