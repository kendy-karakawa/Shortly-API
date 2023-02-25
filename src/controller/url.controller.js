import db from "../config/database.connection.js";
import { nanoid } from 'nanoid';

export async function shorten(req, res){
    const { url } = req.body
    const id = res.locals.sessao.user_id

    const shortUrl = nanoid(8)

    try {
        await db.query(`INSERT INTO shorten (user_id, url, short_url) VALUES ($1, $2,$3);`, [id, url, shortUrl])

        res.status(201).send({id, shortUrl})

        
    } catch (error) {
        res.status(500).send(error.message)
    }



}