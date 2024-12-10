const userDataAccess = require("../dataAccess/userDataAccess");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const createToken = (userId ) => {
    const payload = { id: userId }; // Payload containing user-specific data
    const secret = "HCi-group"; // Secret key used to sign the token
    const options = { expiresIn: "8h" }; // Token expiration time

    return jwt.sign(payload, secret, options);
};


const loginService = async (email,password)=>{
    try{
        const user = await userDataAccess.getUserByEmail(email);
        if(!user) return null;
        if(!bcrypt.compareSync(password,user.password)) return null;
        const token = createToken(user.id);
        return token;
    }catch(error){
        throw error;
    }
}   

const registerService = async (userData)=>{
    try{
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const userId = await userDataAccess.createUser(userData);
        const token = createToken(userId);
        return token;
    }catch(error){
        if(error.message === "Email already exists"){   
            throw new Error("Email already exists");
        }   
        throw error;
    }
}

module.exports = {
    loginService,
    registerService
}
