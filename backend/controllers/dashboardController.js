const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId)); // you convert it to a valid MongoDB ObjectId.
     //MongoDB’s aggregation pipeline, the dollar sign ($) is used to refer to operators and field names
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
/* Income.aggregate([...])->This runs an aggregation pipeline on the Income collection.
It processes documents in stages.{ $match: { userId: userObjectId } }->This is the first stage.
It filters documents and only includes those that belong to the current user (based on userId).
Think of it like:SELECT * FROM Income WHERE userId = 'abc123';
{ $group: { _id: null, total: { $sum: "$amount" } } }->This is the second stage.
It groups all matched income records into one group (_id: null means "group everything together").
Then ($sum is the aggregation operator that adds numbers):Sums up the amount field from each of those documents.Saves the result in a new field called total.
totalIncome = [
  { _id: null, total: 450 }
]--->Final Result->totalIncome will be an array with one object:[ { _id: null, total: 450 } ] */

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });
/*userId-This filters the documents to only include those added by the currently logged-in user.
date: { $gte: new Date(...) }-$gte means “greater than or equal to”.This checks if the date field is greater than or equal to the date calculated for 60 days ago.
Date.now() gives the current time in milliseconds.60 * 24 * 60 * 60 * 1000 = milliseconds in 60 days.
Subtracting this gives the timestamp from 60 days ago.
.sort({ date: -1 })-This sorts the results by date in descending order.
so the most recent transactions come first. output ={inc obj in db}*/

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );
/* .reduce(...)→ This method processes each item in the array one by one and accumulates a single value — in this case, the total amount.
(sum, transaction) => sum + transaction.amount→ A callback function:sum is the running total.
transaction.amount is the amount from the current income record.It adds that amount to the running total.
0→ This is the initial value for sum. So we start from 0 and keep adding each transaction.amount. */

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        const lastTransactions = [//Starts an array to hold both recent income and expense records.
            /* ... ensures both income and expense transactions are merged flatly into lastTransactions[] so they can be sorted and displayed together.
            [ [income1, income2, ...],[expense1, expense2, ...]],You get this:[income1, income2, ..., expense1, expense2, ...] */
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            /* await Income.find({ userId })→ Finds all income entries for the logged-in user.
            .sort({ date: -1 })→ Sorts the results by date in descending order (latest first).
            .limit(5)→ Limits the results to only the 5 most recent income entries.
            .map(...)→ Loops through each income transaction:
            txn.toObject() turns the Mongoose document into a plain JavaScript object.type: "income" adds a new field called type. 
            lastTransactions will be an array like:
            [
            { amount: 500, category: "Salary", date: ..., type: "income" },
            { amount: 100, category: "Food", date: ..., type: "expense" },
            ...
            ]*/
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date); // all together sorted

        // get a response of { } which contains all below
        res.json({
            /* totalIncome[0]->This accesses the first item of the totalIncome array returned 
               ?.  safely accesses a property.if ti array = [ { _id: null, total: 5000 } ] then 0th = { _id: null, total: 5000 }  , .total gets the value
               if none returned then 0 is used by || 0*/
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            /* {
                    "last30DaysExpenses": {
                        "total": 3500,  // This is the sum of all expenses in the last 30 days
                        "transactions": [
                                             {
                                                "_id": "exp123",
                                                "userId": "user456",...
                                            },
                                            {
                                                 ....
                                            },
                                            // More transaction objects...
                                        ]
                    }
                }
 */
            last60DaysIncome: { // output something like above
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
};
