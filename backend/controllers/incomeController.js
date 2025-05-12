const xlsx = require('xlsx');
const Income= require("../models/Income");

//add income source
exports.addIncome = async (req , res) => {
    const userId = req.user.id; // req.user comes from protect middlware
    try{
        const { icon, source, amount, date }= req.body; //Destructures the incoming request body

        //validation
        if (!source || !amount || !date){
            return res.status(400).json({Message: "All fields are required"});
        }

        const newIncome= new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save(); //Creates a new Income document to be saved in the database.
        res.status(200).json(newIncome);
    } catch (error){
        res.status(500).json({ message: "Server Error"})
    }
}

//get all income source
exports.getAllIncome = async (req , res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1});
        /* This searches the Income collection in your database and retrieves all documents (income records) where the userId field matches the current logged-in user's ID (req.user.id).
           .sort({ date: -1 })→ This sorts the returned results by the date field in descending order, so the most recent income entries appear first. */
        res.json(income);
    }catch (error) {
        res.status(500).json({ message:"server Error"});
    }
}

//delete income source
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id); //find and delete a document in your MongoDB collection using Mongoose
         /* This tries to find a document in the Income collection by its _id (which is passed in the URL as a route parameter: req.params.id).
            find and delete a document in your MongoDB collection using Mongoose */
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        // Check if the logged-in user (jwt token is actually from the owner of income) owns this income entry
         if (income.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this income" });
        }

        await income.deleteOne();

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//download excel- Create the file in memory and send it to the user(different from tutor)
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });//Fetches income records for the logged-in user from the database, sorted by the most recent date.

        const data = income.map((item) => ({ //Maps the fetched income records into an array with Source, Amount, and formatted Date for Excel.
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new(); //Creates a new Excel workbook.
        const ws = xlsx.utils.json_to_sheet(data);//Converts the mapped data into a worksheet format.
        xlsx.utils.book_append_sheet(wb, ws, "Income");//Appends the worksheet to the workbook and names the sheet "Income."

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });//Converts the workbook into a binary buffer in .xlsx format.

        res.setHeader('Content-Disposition', 'attachment; filename="income-details.xlsx"');//Sets the response header to indicate that the content is an attachment and names the file "income-details.xlsx."
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');//Sets the correct content type for an Excel file.
        res.send(buffer);//Sends the generated Excel file to the client for download.
    } catch (error) {
        console.error("Excel Download Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
