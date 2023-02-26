import db from "../config/database.connection.js";

export async function ranking(req, res){

    try {
        const top10 = await db.query(`
        SELECT u.id, u.name, COUNT(s.url) as "linksCount", SUM(s.visit_count) as "visitCount"
        FROM users u 
        JOIN shorten s ON u.id = s.user_id
        GROUP BY u.id
        ORDER BY visitCount DESC
        LIMIT 10;
        `)

        res.status(200).send(top10.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}