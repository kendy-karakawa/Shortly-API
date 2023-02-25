import db from "../config/database.connection.js"
import { registrationSchema } from "../schema/auth.schema.js"

export async function authValidation(req,res,next){
    const customer = req.body
    
    const {error} = registrationSchema.validate(customer, {abortEarly:false})

        if (error){
            const errorMessages = error.details.map(err => err.message)
            return res.status(422).send({ errorMessages })
        }

    const emailExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [customer.email])
    
    if(emailExists.rowCount !== 0) return res.status(409).send("E-mail ja existe")
       
    next()
    
}