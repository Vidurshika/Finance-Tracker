const xlsx = require('xlsx');
const Expense= require("../models/Expense");

//add expense source
exports.addExpense = async (req , res) => {
    const userId = req.user.id; // req.user comes from protect middlware
    try{
        const { icon, category, amount, date }= req.body; //Destructures the incoming request body

        //validation
        if (!category || !amount || !date){
            return res.status(400).json({Message: "All fields are required"});
        }

        const newExpense= new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save(); //Creates a new Income document to be saved in the database.
        res.status(200).json(newExpense);
    } catch (error){
        res.status(500).json({ message: "Server Error"})
    }
}

//get all expense source
exports.getAllExpense = async (req , res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1});
        /* This searches the Income collection in your database and retrieves all documents (income records) where the userId field matches the current logged-in user's ID (req.user.id).
           .sort({ date: -1 })→ This sorts the returned results by the date field in descending order, so the most recent income entries appear first. */
        res.json(expense);
    }catch (error) {
        res.status(500).json({ message:"server Error"});
    }
}

//delete expense source
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id); 
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Check if the logged-in user (jwt token is actually from the owner of expense) owns this income entry
         if (expense.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this expense" });
        }

        await expense.deleteOne();

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//download excel- Create the file in memory and send it to the user(different from tutor)
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });//Fetches income records for the logged-in user from the database, sorted by the most recent date.

        const data = expense.map((item) => ({ //Maps the fetched income records into an array with Source, Amount, and formatted Date for Excel.
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new(); //Creates a new Excel workbook.
        const ws = xlsx.utils.json_to_sheet(data);//Converts the mapped data into a worksheet format.
        xlsx.utils.book_append_sheet(wb, ws, "Expense");//Appends the worksheet to the workbook and names the sheet "Income."

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });//Converts the workbook into a binary buffer in .xlsx format.

        res.setHeader('Content-Disposition', 'attachment; filename="expense-details.xlsx"');//Sets the response header to indicate that the content is an attachment and names the file "income-details.xlsx."
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');//Sets the correct content type for an Excel file.
        res.send(buffer);//Sends the generated Excel file to the client for download.
    } catch (error) {
        console.error("Excel Download Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
