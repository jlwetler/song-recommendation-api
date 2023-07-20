import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";

export async function postRecommendation(req: Request, res: Response) {
    try{
        const name: string = req.body.name;
        const youtubeLink = req.body.youtubeLink;  
    
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
        const id: number = parseInt(req.params["id"]);

        await recommendationService.saveUpvote(id);

        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function downvote(req: Request, res: Response) {
    try {
        const id: number = parseInt(req.params["id"]);

        await recommendationService.saveDownvote(id);

        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}