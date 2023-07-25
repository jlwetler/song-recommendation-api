import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";

interface RecommendationBody {
    name: string;
    youtubeLink: string;
}

export async function postRecommendation(req: Request, res: Response) {
    try{
        const { name, youtubeLink } = req.body as RecommendationBody;
    
        if (!name || !youtubeLink) return res.sendStatus(400);

        const result = await recommendationService.saveRecommendation(name, youtubeLink);

        result === null ? res.sendStatus(422) : res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function upvote(req: Request, res: Response) {
    try {
        const id: number = parseInt(req.params.id);

        const result = await recommendationService.saveUpvote(id);

        result === null ? 
        res.sendStatus(404) :
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function downvote(req: Request, res: Response) {
    try {
        const id: number = parseInt(req.params.id);

        const result = await recommendationService.saveDownvote(id);

        result === null ? 
        res.sendStatus(404) :
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRandomRecommendations(req: Request, res: Response) {
    try {
        const result = await recommendationService.getRandomRecommendation();
        
        result === null ? 
            res.sendStatus(404) :
            res.send(result);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getTopRecommendation(req: Request, res: Response) {
    try {
        const result = await recommendationService.getTopRecommendation();

        result === null ? 
            res.sendStatus(404) :
            res.send(result);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}