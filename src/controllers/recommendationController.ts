import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";

export async function postRecommendation(req: Request, res: Response) {
    try{
        const name: string = req.body.name;
        const youtubeLink = req.body.youtubeLink;  
    
        await recommendationService.saveRecommendation(name, youtubeLink);

        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
    
}