import db from "../config/database.connection.js";

export async function signUp (req, res){
    const {name, email, password, confirmPassword} = req.body

    try {
        db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])
        res.sendStatus(201)
        
    } catch (error) {
        res.status(500).send(error)
    }
}