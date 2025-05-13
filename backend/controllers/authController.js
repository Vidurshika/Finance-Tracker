const jwt = require("jsonwebtoken");
const User = require("../models/User"); // to save or fetch user data

// Generate JWT token
const generateToken = (id) => { //called inside the registerUser function 
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
};

// Register user
exports.registerUser = async (req, res) => {

    if (!req.body) { // means just { empty }
        return res.status(400).json({ message: "Request body is missing" }); 
    }
    
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation: Check for missing fields means { key : "empty" , key : " empty" ,...}
    if (!fullName || !email || !password) {  // props are accessed from above {}
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email(email of current request) already exists
        const existingUser = await User.findOne({ email }); // props are accessed from above {}
        // User = table, findone = It searches the users collection and finds one document that matches the condition.if matches then return the matched doc
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create user
        const user = await User.create({ //Create a new document (record) in the MongoDB users
            fullName,
            email,
            password,
            profileImageUrl,
        });

        //  response object (sent back to the client) ... 201-Created successfully
        res.status(201).json({  // const user is accessible and referred here
            id: user._id, // there is a _id field for every doc/user
            user,
            token: generateToken(user._id),
        });
        // res looks like  { id-.., user:{}, token:..}

    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

//login
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required"});
    }
    try{
        const user = await User.findOne({email});
        if ( !user || !(await user.comparePassword(password)) ){ // comparePassword is a function in the model of User
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id),
        });
    } catch(err){
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// get user info by
exports.getUserInfo = async (req, res) => {
    try {
        /* findbyID = Searches the MongoDB User collection for a document where _id matches req.user.id.
        .select("-password")->Tells MongoDB to exclude the password field from the result.The - sign means omit. */
        const user = await User.findById(req.user.id).select("-password");  // (req.user._id) would work too
                                        // user coming from protect mware
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user); // get the user document without the password, stored in the user variable.
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};

