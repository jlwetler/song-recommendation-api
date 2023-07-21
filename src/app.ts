import express from "express";
import cors from "cors";
import * as recommendationController from "./controllers/recommendationController";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.send("OK");
})

app.post("/recommendations", recommendationController.postRecommendation);

app.post("/recommendations/:id/upvote", recommendationController.upvote);

app.post("/recommendations/:id/downvote", recommendationController.downvote);

app.get("/recommendations/random", recommendationController.getRandomRecommendations);

app.get("/recommendations/top", recommendationController.getTopRecommendation);

export default app;