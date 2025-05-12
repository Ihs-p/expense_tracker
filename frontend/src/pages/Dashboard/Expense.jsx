import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import AddExpenseForm from '../../components/expense/AddExpenseForm'
import Modal from '../../components/Modal'
import toast from 'react-hot-toast'
import ExpenseList from '../../components/expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

export const Expense = () => {
  useUserAuth()
  const [expenseData,setExpenseData] = useState([])
  const [loading,setLoading]  = useState(false)
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null
  })

  const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false)


  const fetchExpenseDetails = async()=>{
    if(loading) return;
  
    setLoading(true)
  
  try {
    const result = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
    if(result.data){
      setExpenseData(result.data)
    }
    
  } catch (error) {
    console.log("Something went wrong, please try agian ",error)
  }finally{
    setLoading(false)
  }
  }
  
  const handleAddExpense = async(expense)=>{
   console.log();
   
    const {source,amount,date,icon} = expense
  
  
    if(!source.trim()){
      toast.error("Category is required")
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
  
      await axiosInstance.post(API_PATHS.EXPENSE.ADD,{
        source,amount, date,icon
  
  
      });
  
      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully")
      fetchExpenseDetails()
      
    } catch (error) {
  
      console.error("error adding expense :",error?.response?.data?.message || error.message);
      
      
    }
    
  }
  
  const handledeleteExpense = async(data)=>{
  
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(data));
      toast.success('Expense deleted successfully')
      setOpenDeleteAlert({show:false,data:null})
      fetchExpenseDetails()
    } catch (error) {
      console.log(error)
      toast.error("error delete Expense")
    }
    
  }
  
  
  const handleDownloadExpenseDetais = async()=>{

  try {
    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWLOAD_EXPENSE,{responseType:"blob"});


    // create url for blob 
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url;
    link.setAttribute("download","expense_details.xlsx");
    document.body.appendChild(link)
    link.click();
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url);   
    
  } catch (error) {
    console.error(error)
    toast.error("error download expense details,please try again")
    
  }
    
  }

  useEffect(()=>{
    fetchExpenseDetails()
    return ()=>{}
  },[])
  

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto  ">
      <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
            transactions = {expenseData}
            onaddexpense={()=>setOpenAddExpenseModal(true)} />
          </div>  
          <ExpenseList
          transactions = {expenseData}
          onDelete  = {(id)=>setOpenDeleteAlert({show:true,data:id})}
          onDownload = {handleDownloadExpenseDetais}

           />
      </div>
      <Modal 
        isOpen = {openAddExpenseModal}
        onClose = {()=>setOpenAddExpenseModal(false)}
        title = "Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal 
        isOpen = {openDeleteAlert.show}
        onClose = {()=>setOpenDeleteAlert({show:false,data:null})}
        title = "Delete Expense"
        >
          <DeleteAlert content={"are you sure you want to delete this expense details?"}
          onDelete = {()=>handledeleteExpense(openDeleteAlert.data)}/>
        </Modal>
      </div>
  </DashboardLayout>
)}
