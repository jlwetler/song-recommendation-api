import prisma from "../database";

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
    await prisma.recommendations.create({
        data: params
    })
}

export async function upvoteRecommendation(id:number) {
    await prisma.recommendations.update({
        data: {score: {increment: 1}},
        where: { id }
    })
}

export async function findRecommendation(id:number): Promise<Recommendation> {
    const result = await prisma.recommendations.findUnique({
        where: { id }
    })

    return result;
}

export async function downvoteRecommendation(id:number) {
    await prisma.recommendations.update({
        data: {score: {decrement: 1}},
        where: { id }
    })
}

export async function deleteRecommendation(id:number) {
    await prisma.recommendations.delete({
        where:{id}
    })
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

    const recommendations = await prisma.recommendations.findMany({
        where: {
          score: maxScore === undefined ? 
            { gte: minScore, lte: maxScore } : 
            { gte: minScore },
        },
        orderBy: {
          [orderBy]: 'desc',
        },
      });

    return recommendations;
    /*const result = await connection.query(`
        SELECT * FROM recommendations
        WHERE ${where}
        ORDER BY ${orderBy}
    `,queryArray);

    return result.rows;*/

}