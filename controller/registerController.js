constUser = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req,res) => {
    const user = req.body.user;
    const pwd = req.body.password;

    if (!user || !pwd)
        return res
            .status(400)
            .json({message: "Username and password is required" });
        
        //check for duplicate usernames in DB
        const duplicate = await User.findOne({username:user}).exec();
        if (duplicate) return res.sendStatus(409); //Conflict

        try {
            //encrypt the password
            const hashPwd = await bcrypt.hash(pwd, 10);

            //create and store the new user
            const result = await User.create({
                username:user,
                password: hashPwd
            });
            console.log(result);
            res.status(201).json({success: 'New user ${user} is created!'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
};

module.exports = {handleNewUser};