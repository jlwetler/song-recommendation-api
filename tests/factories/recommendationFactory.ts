import prisma from "../../src/database"

export async function createRecommendation() {
    const recommendationData = {
        name: "RATM - Bulls on Parade",
        youtubeLink: "https://www.youtube.com/watch?v=3L4YrGaR8E4",
        score: 0
    }

    const recommendation = await prisma.recommendations.create({
        data: recommendationData,
      });
  
      return recommendation;
}