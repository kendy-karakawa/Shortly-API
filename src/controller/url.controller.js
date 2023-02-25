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

export async function getUrlById(req, res){
    const {id} = req.params 

    try {
        const findUrl = await db.query(`SELECT id, url, short_url as "shortUrl" FROM shorten WHERE id = $1;`, [id])
        if (findUrl.rowCount === 0) return res.status(404).send("url não encontrado")

        res.status(200).send(findUrl.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function redirectUrl(req, res){
    const {shortUrl} = req.params 

    try {
        const findShortUrl = await db.query(`SELECT * FROM shorten WHERE short_url = $1;`, [shortUrl])
        if (findShortUrl.rowCount === 0) return res.status(404).send("url não existe")

        const urlOriginal = findShortUrl.rows[0].url
        const count = findShortUrl.rows[0].visit_count + 1
        await db.query(`UPDATE shorten SET visit_count = $1 WHERE short_url = $2;`, [count, shortUrl])
        
        res.redirect(urlOriginal)

    } catch (error) {
        res.status(500).send(error.message)
    }
}