import connection from "../database";

export async function createRecommendation (name: string, youtubeLink: string, score: number) {
    await connection.query(`
        INSERT INTO recommendations
        (name, "youtubeLink", score)
        VALUES
        ($1, $2, $3)
    `, [name, youtubeLink, score]
    );
}

export async function upvoteRecommendation(id:number) {
    await connection.query(`
        UPDATE recommendations 
        SET score = score + 1
        WHERE id = $1;
    `,[id])
}

export async function findRecommendation(id:number) {
    const result = await connection.query(`
        SELECT *
        FROM recommendations
        WHERE id = $1;    
    `, [id])

    return result.rows[0];
}

export async function downvoteRecommendation(id:number) {
    await connection.query(`
        UPDATE recommendations 
        SET score = score - 1
        WHERE id = $1;
    `,[id])
}

export async function deleteRecommendation(id:number) {
    await connection.query(`
        DELETE FROM recommendations 
        WHERE id = $1;
    `,[id])
}