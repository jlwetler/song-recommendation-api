import connection from "../database";

export interface Recommendation {
    id: number;
    name: string;
    youtubeLink: string;
    score: number;
}

interface RecommendationParams {
    name: string;
    youtubeLink: string;
    score: number;
}

export async function createRecommendation (params: RecommendationParams) {
    const { name, youtubeLink, score } = params

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

export async function findRecommendation(id:number): Promise<Recommendation> {
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

interface QueryParams {
    minScore: number;
    maxScore?: number; 
    orderBy?: string;
}

export async function findRecommendationsByScore(
    params: QueryParams
) : Promise<Recommendation[]>  {
    const { minScore, maxScore, orderBy } = params;
    let where = "";
    let queryArray = [minScore];

    if(maxScore === undefined) {
        where = "score >= $1";
    } else {
        where = "score BETWEEN $1 AND $2";
        queryArray.push(maxScore);
    }
        
    const result = await connection.query(`
        SELECT * FROM recommendations
        WHERE ${where}
        ORDER BY ${orderBy}
    `,queryArray);

    return result.rows;
}