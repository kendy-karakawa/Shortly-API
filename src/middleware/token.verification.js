import db from "../config/database.connection.js";

export async function tokenVerification(req,res,next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.status(401).send("Informe o token!")
    
    try {
        
        const checkSession = await db.query(`SELECT * FROM auth WHERE token = $1;`, [token])

        if(checkSession.rowCount === 0) return res.status(401).send("Informe o token!")

        res.locals.sessao = checkSession.rows[0]

        next()

    } catch (error) {
        res.status(500).send(error.message)
    }


}