import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import IncomeOverview from '../../components/income/IncomeOverview'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
useUserAuth()

  const [incomeData,setIncomeData] = useState([])
  const [loading,setLoading] = useState(false)
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false)
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  })


const fetchIncomeDetails = async()=>{
  if(loading) return;

  setLoading(true)

try {
  const result = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
  if(result.data){
    setIncomeData(result.data)
  }
  
} catch (error) {
  console.log("Something went wrong, please try agian ",error)
}finally{
  setLoading(false)
}
}

const handleAddIncome = async(income)=>{
 console.log(income);
 
  const {source,amount,date,icon} = income


  if(!source.trim()){
    toast.error("source is required")
    return;
  }

  if(!amount || isNaN(amount) || Number(amount) <= 0){
    toast.error("amount should be a   valid number greater  than 0")
    return;
  }

  if(!date){
    toast.error("date is required")
    return;
  }

  try {

    await axiosInstance.post(API_PATHS.INCOME.ADD,{
      source,amount, date,icon


    });

    setOpenAddIncomeModal(false);
    toast.success("Income Added Successfully")
    fetchIncomeDetails()
    
  } catch (error) {

    console.error("error adding income :",error?.response?.data?.message || error.message);
    
    
  }
  
}

const handledeleteIncome = async(data)=>{

  try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(data));
    toast.success('income deleted successfully')
    setOpenDeleteAlert({show:false,data:null})
    fetchIncomeDetails()
  } catch (error) {
    console.log(error)
    toast.error("error delete income")
  }
  
}


const handleDownloadIncomeDetais = async()=>{
  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWLOAD_INCOME,{responseType:"blob"});


    // create url for blob 
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url;
    link.setAttribute("download","income_details.xlsx");
    document.body.appendChild(link)
    link.click();
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url);   
    
  } catch (error) {
    console.error(error)
    toast.error("error download income details,please try again")
    
  }
}

  useEffect(()=>{
    fetchIncomeDetails()
    return ()=>{}
  },[])


 

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto  ">
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview
            transactions = {incomeData}
            onaddincome={()=>setOpenAddIncomeModal(true)} />
          </div>    

          <IncomeList 
          transactions   = {incomeData}
          onDelete = {(id)=>{
            setOpenDeleteAlert({show:true,data:id})
          }}
          onDownload = {handleDownloadIncomeDetais}

          />

        </div>


        <Modal 
        isOpen = {openAddIncomeModal}
        onClose = {()=>setOpenAddIncomeModal(false)}
        title = "Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
        isOpen = {openDeleteAlert.show}
        onClose = {()=>setOpenDeleteAlert({show:false,data:null})}
        title = "Delete Income"
        >
          <DeleteAlert content={"are you sure you want to delete this income details?"}
          onDelete = {()=>handledeleteIncome(openDeleteAlert.data)}/>
        </Modal>

      </div>
      </DashboardLayout>
  )
}

export default Income