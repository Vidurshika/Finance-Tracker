const mongoose= require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},// it's used to define a relationship between documents in different collections in MongoDB.
    /* ref:user -> This tells Mongoose that the userId refers to the User collection.It expects that the userId field in each income document will store the _id of an existing user from the User collection. */
    icon:{ type: String},
    source: { type: String, required: true}, // example : Salary ,Freelance, etc
    amount: { type:Number, required:true},
    date: { type: Date,default: Date.now},
},{timestamps: true});

module.exports = mongoose.model("Income",IncomeSchema);

/* income document ==>
    {
  "_id": "6648ab7d2a3e8b1d9c1f87f2",        // Unique ID for this income record
  "userId": "66489e3f6dfb2a5bc3a9d7a9",    // ID of the user (from User collection)
  "source": "Freelance",
  "amount": 5000,
  "date": "2025-05-09T11:00:00.000Z",
  "createdAt": "2025-05-09T11:10:00.000Z",
  "updatedAt": "2025-05-09T11:10:00.000Z",
  "__v": 0
   }

*/