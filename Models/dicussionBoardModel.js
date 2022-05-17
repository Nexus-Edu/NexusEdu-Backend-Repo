const pool = require('../Database-Config/db');

class DiscussionBoard {
    static async displayAllPost() {
        const databaseResult = await pool.query(`SELECT posts.hashtag, posts."date", posts.message, users.first_name as name, users.username, users.image as profile_pic FROM posts 
        join users
        on users.id = posts.user_id 
        ORDER BY posts.id DESC;`);
        return databaseResult.rows;
    }

    static async addPost(message, hashtag) {
        const databaseResult = await pool.query('INSERT into posts (message, hashtag) values ($1, $2) returning *', [message, hashtag]);
        return databaseResult.rows[0];
    }

    static async updatePost(id, message, hashtag) {
        const databaseResult = await pool.query('UPDATE posts SET message = $2, hashtag = $3 WHERE id = $1', [id, message, hashtag]);

        const searchResult = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

        return searchResult.rows[0];
    }

    static async deletePost(id) {
        const databaseResult = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        return databaseResult.rows[0]
    }
}

module.exports = DiscussionBoard