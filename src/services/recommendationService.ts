import * as recommendationRepository from "../repositories/recommendationRepository"

export async function saveRecommendation(name: string, youtubeLink: string) {
    const score= 0;

    await recommendationRepository.createRecommendation(name, youtubeLink, score);
}

export async function saveUpvote(id:number) {
    
    await recommendationRepository.upvoteRecommendation(id);
}

export async function saveDownvote(id:number) {
    
    const score: number = await recommendationRepository.checkRecommendation(id);

    score === -4 ? 
        recommendationRepository.deleteRecommendation(id) : 
        recommendationRepository.downvoteRecommendation(id);
}