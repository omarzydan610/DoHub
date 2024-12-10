const jwt = require("jsonwebtoken");
const userDataAccess = require("../dataAccess/userDataAccess");

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "HCi-group");
        const user = await userDataAccess.checkUser(decoded.id);
        if(user){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = {
    verifyToken,
}