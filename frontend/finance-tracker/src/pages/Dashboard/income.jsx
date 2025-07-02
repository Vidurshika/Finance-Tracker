import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import { toast } from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';


const Income = () => {
  
  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
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
    const {source, amount, date, icon} = income; //separates the values from the income object

    //validation check - Toaster is in app
    if(!source.trim()){ // user didn’t type a source, it shows an error toast and stops.
      toast.error("Source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0 ){ //Checks if it's empty ,Checks if it’s not a number,Checks if it's less than or equal to 0
      toast.error("Amount should be a valid number");
      return;
    }

    if(!date){ // no data
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      }); // send data to backend

      setOpenAddIncomeModal(false); //Closes the "Add Income" popup/modal
      toast.success("Income added successfully");
      fetchIncomeDetails();//as db is updated; ui needs to be changed, it is not implicit , so this will Gets the latest income data from the database ,Updates the UI (state) to show the latest info
    } catch(error){
       "Error adding income:",
       error.response?.data?.message || error.message
    };

  };

  //delete income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false , date:null});
      toast.success("Income record deleted successfully");
      fetchIncomeDetails();
    } catch(error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

  //handle download income detail 
const handleDownloadIncomeDetails = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
      responseType: 'blob', // Important! Treat response as a binary file
    });

    // Create a blob URL and force download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'income-details.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Income file downloaded successfully!");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download income file");
  }
};



  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  },[] );


  return (//Renders the layout and passes income data + a handler to open the moda
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'> {/* bar graph */}
          <div className=''>
            <IncomeOverview
             transactions={incomeData}
             onAddIncome={()=> setOpenAddIncomeModal(true)}
             /* IncomeOverview component receives a prop onAddIncome which is a function.
                When the user clicks the "Add Income" button inside IncomeOverview, it calls this onAddIncome function.
                That function calls setOpenAddIncomeModal(true) in your Income component state, changing openAddIncomeModal from false to true.
                Since openAddIncomeModal becomes true, your Modal component renders and model is displayed ,because isOpen becomes true*/
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => { //incomeList passes id 
              setOpenDeleteAlert({ show: true, data: id });//show an alert before calling the handler
            }}
            onDownload={handleDownloadIncomeDetails} // when onDownload in incomeList is initiated-handler runs
          />

        </div>
        
        {/* Inside modal, render the AddIncomeForm and pass handleAddIncome as prop */}
        {/* AIF is passed automatically as a child to the Modal component */}
        <Modal
         isOpen = {openAddIncomeModal}
         onClose = {()=> setOpenAddIncomeModal(false)} // close btn clicked -> onClose is called in Modal-> so isopen= false -> so model doesnt render and model disappear
         title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/> {/* send data to back end */}
        </Modal>

        {/* modal for delete alert*/}
        <Modal
         isOpen={openDeleteAlert.show}
         onClose={()=> setOpenDeleteAlert({ show:false , data:null})} // alert stores data=id in its state
         title="Delete Income"
        >
         <DeleteAlert
          content="Are you sure you want to delete this income record?"
          onDelete={()=> deleteIncome(openDeleteAlert.data)} // handler is called
         />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income