import getYouTubeID from "get-youtube-id";
import * as recommendationRepository from "../repositories/recommendationRepository"

export async function saveRecommendation(name: string, youtubeLink: string) {
    const youtubeId = getYouTubeID(youtubeLink);
    const score= 0;

    if (!youtubeId) return null;

    const recommendationParams = {
        name, youtubeLink, score
    }

    return await recommendationRepository.createRecommendation(recommendationParams);
}

export async function saveUpvote(id:number) {
    const recommendation = await recommendationRepository.findRecommendation(id);
    
    if (!recommendation) return null;

    return await recommendationRepository.upvoteRecommendation(id);
}

export async function saveDownvote(id:number) {
    
    const recommendation = await recommendationRepository.findRecommendation(id);

    if (!recommendation) return null;

    const score: number = recommendation.score; 

    return (score === -5) ? 
    await recommendationRepository.deleteRecommendation(id) :
    await recommendationRepository.downvoteRecommendation(id);
}

export async function getRandomRecommendation() {
        const random = Math.random();
        let recommendations: recommendationRepository.Recommendation[];
        const params =
            (random < 0.3) ?
            { minScore: -5, maxScore:10, orderBy: "score" } :
            { minScore: 11, orderBy: "score"};
        
        recommendations = await recommendationRepository.findRecommendationsByScore(params)

        return recommendations.length === 0 ? null : recommendations[0];
}

export async function getTopRecommendation() {
    const params = { minScore: -5, orderBy: "score" }

    const recommendations = await recommendationRepository.findRecommendationsByScore(params);
    
    return recommendations.length === 0 ? null : recommendations[0];
}