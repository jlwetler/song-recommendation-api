import * as recommendationRepository from "../repositories/recommendationRepository"

export async function saveRecommendation(name: string, youtubeLink: string) {
    const score= 0;

    await recommendationRepository.createRecommendation(name, youtubeLink, score);
}