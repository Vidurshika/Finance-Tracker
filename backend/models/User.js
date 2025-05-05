const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* In mongodb 
   A collection is like a SQL table.
   A document is like a row in that table. 
   A field is a column*/

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    profileImageUrl: { type: String, default: null }, 
  },
  {
    timestamps: true,
  }
  /* The first argument to mongoose.Schema is for defining fields (like columns).
     The second argument is for schema-level options (like settings).
     timestamps: true is a built-in option provided by Mongoose. It tells Mongoose to automatically add two fields to every document:
            createdAt → the date when the document was first created.
            updatedAt → the date when the document was last updated.
            You don’t define them manually — Mongoose handles that for you. 

    MongoDB automatically creates a unique _id for each document (record).
    _id means: "the primary key of this document"
   */
);

// Hash the user password before saving, feature=pre
UserSchema.pre("save", async function (next) { //This runs automatically before saving a user to the database — it's a "pre-save hook".
  if (!this.isModified("password")) return next();//If the password hasn't changed, skip hashing.
  this.password = await bcrypt.hash(this.password, 10);// else  hash it with bcrypt (10 is the salt rounds = strength).
  next(); //Continue saving the document.
});

/* 
 isModified() -
    is a Mongoose method that checks whether a specific field in the document has been modified (changed) after the document was retrieved from the database or created.
    How it works: this.isModified("password") checks if the password field has been changed (modified) on the current instance of the document.
    If the password was not changed (i.e., the password stored in the database is the same as the one in the document), isModified("password") will return false.
*/

// Compare passwords, feature = comparePw
UserSchema.methods.comparePassword = async function (candidatePassword) { //When a user logs in, they give their password (candidatePassword).
  return await bcrypt.compare(candidatePassword, this.password);// this.password refers to the password field of the current user document.
  /* this.password → the hashed password stored in the database for that user.
     bcrypt.compare() takes the plain password and checks if it matches the hashed version.
                      It does not decrypt the password (because bcrypt is one-way).
                      Instead, it hashes the entered password and checks if the result matches the stored hash.
     If they match → it returns true.
 */
};

module.exports = mongoose.model("User", UserSchema); 
/*  UserSchema → blueprint (fields, types, options)
    mongoose.model("User", UserSchema) → creates a Model
    This creates a MongoDB collection named users (notice the plural)
    Mongoose automatically pluralizes "User" → "users"
    So the collection name in MongoDB is: users (like a table name) */