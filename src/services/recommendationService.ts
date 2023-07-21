import getYouTubeID from "get-youtube-id";
import * as recommendationRepository from "../repositories/recommendationRepository"

export async function saveRecommendation(name: string, youtubeLink: string) {
    const youtubeId = getYouTubeID(youtubeLink);
    const score= 0;

    if (!youtubeId) return null;

    return await recommendationRepository.createRecommendation(name, youtubeLink, score);
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
        let recommendations;

        if(random < 0.3) {
            recommendations = await recommendationRepository.findRecommendationsByScore(-5,10, "RANDOM()")
        } else {
            recommendations = await recommendationRepository.findRecommendationsByScore(11, Infinity, "RANDOM()")
        }
        
        return recommendations.length === 0 ? null : recommendations[0];
}

export async function getTopRecommendation() {
    const recommendations = await recommendationRepository.findRecommendationsByScore(-5,Infinity, "score DESC")
    
    return recommendations.length === 0 ? null : recommendations[0];
}