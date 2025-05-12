const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");// all goes through PROTECT means Bearer token is needed
// therefore 1st login and get token to access below routes
const router = express.Router();

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpense);
router.get("/downloadexcel",protect,downloadExpenseExcel);
router.delete("/:id",protect,deleteExpense);

module.exports = router;

