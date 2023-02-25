import db from "../config/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'; 

export async function signUp (req, res){
    const {name, email, password} = req.body

    try {
        const emailExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if(emailExists.rowCount !== 0) return res.status(409).send("E-mail ja existe")

        const criptPassword = bcrypt.hashSync(password, 10)

        db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, criptPassword])
        res.sendStatus(201)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn (req, res){
    const { email, password} = req.body

    try {
        const findEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if(findEmail.rowCount === 0 ) return res.status(401).send("E-mail ou senha incorreto")

        const findedPassword = findEmail.rows[0].password 
        const id = findEmail.rows[0].id 

        if (bcrypt.compareSync(password, findedPassword)){

            const token = uuid()
            await db.query(`INSERT INTO auth (token, user_id) VALUES ($1, $2);`, [token, id])

            return res.status(200).send({token:token})


        } else{
            return res.status(401).send("E-mail ou senha incorreto")
        }

        
    } catch (error) {
        res.status(500).send(error.message)
    }
}