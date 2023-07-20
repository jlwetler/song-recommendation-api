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