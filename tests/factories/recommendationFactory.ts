import connection from "../../src/database";

export async function createRecommendation() {
    const recommendation = {
        name: "RATM - Bulls on Parade",
        youtubeLink: "https://www.youtube.com/watch?v=3L4YrGaR8E4"
    }

    return await connection.query(`
        INSERT INTO recommendations
        (name, "youtubeLink", score)
        VALUES
        ($1, $2, $3)
        RETURNING *
    `, [recommendation.name, recommendation.youtubeLink, 0])
}