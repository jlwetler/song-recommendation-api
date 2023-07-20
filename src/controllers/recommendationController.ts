import { Request, Response } from "express";

export async function postRecommendation(req: Request, res: Response) {
    const name: string = req.body.name;
    const youtubeLink = req.body.youtubeLink;  
    
    res.send("test")
}