const pool = require("../config/databaseManager");

const getUserByEmail = async (email)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }catch(error){
       throw error;
    }
}
const createUser = async (userData)=>{
    try{
        const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [userData.name, userData.email, userData.password]);
        return result.insertId;
    }catch(error){
        if(error.code === "ER_DUP_ENTRY"){
            throw new Error("Email already exists");
        }
        throw error;
    }
}
const updateUser = async (user)=>{
    try{
        const [result] = await pool.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [user.name, user.email, user.password, user.id]);
        return result.affectedRows;
    }catch(error){
        throw error;
    }
}
const getUserById = async (id)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }catch(error){
        throw error;
    }
}
const checkUser = async (id)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        if(rows.length === 0){
            return false;
        }
        return true;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUser,
    getUserById,
    checkUser
}


