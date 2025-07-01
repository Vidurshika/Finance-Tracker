import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

const Income = () => {
  
  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openAddIncomeModal,setopenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  // Get all income details , income object = object in income model
  const fetchIncomeDetails = async () => {
    if (loading) return ;

    setLoading(true);

    try{
      const response= await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.Please try again")
    } finally {
      setLoading(false);
    }
  };

  //handle add income
  const handleAddIncome = async (income) => {

  };

  //delete income
  const deleteIncome = async (id) => {

  };

  //handle download income detail 
  const handleDownloadIncomeDetails = async () =>{

  }

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  },[] );


  return (//Renders the layout and passes income data + a handler to open the moda
    <DashboardLayout active="Income">
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'> {/* bar graph */}
          <div className=''>
            <IncomeOverview
             transactions={incomeData}
             onAddIncome={()=> setopenAddIncomeModal(true)}
             /* IncomeOverview component receives a prop onAddIncome which is a function.
                When the user clicks the "Add Income" button inside IncomeOverview, it calls this onAddIncome function.
                That function calls setopenAddIncomeModal(true) in your Income component state, changing openAddIncomeModal from false to true.
                Since openAddIncomeModal becomes true, your Modal component renders and model is displayed ,because isOpen becomes true*/
            />
          </div>
        </div>
        
        {/* Inside modal, render the AddIncomeForm and pass handleAddIncome as prop */}
        {/* AIF is passed automatically as children to the Modal component */}
        <Modal
         isOpen = {openAddIncomeModal}
         onClose = {()=> setopenAddIncomeModal(false)} // close btn clicked -> onClose is called in Modal-> so isopen= false -> so model doesnt render and model disappear
         title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/> {/* send data to back end */}
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income