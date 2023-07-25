import "../src/setup";
import supertest from "supertest";
import app from "../src/app";
import { cleanDatabase, endConnection } from "./utils/database";
import { createRecommendation } from "./factories/recommendationFactory";
import prisma from "../src/database";

beforeEach(cleanDatabase);
afterAll(async ()=> {
    await cleanDatabase();
    await endConnection();
});

describe("POST /recommendations", () => {
    it('should return 201 for valid recommendation', async () => {
        const body = {
            name: "RATM - Bulls on Parade",
            youtubeLink: "https://www.youtube.com/watch?v=3L4YrGaR8E4"
        }

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(201);
    })

    it('should return 400 for invalid recommendation', async () => {
        const body = {
            youtubeLink: "https://www.youtube.com/watch?v=3L4YrGaR8E4"
        }

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(400);
    })
    it('should return 422 for invalid link', async () => {
        const body = {
            name: "test",
            youtubeLink: "https://www.google.com"
        }

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(422);
    })
})

describe("POST /recommendations/:id/upvote", () => {
    it('should return 404 for inexistent recommendation', async () => {
        const response = await supertest(app).post("/recommendations/1/upvote").send({});

        expect(response.status).toBe(404);
    }); 
    it('should upvote an existent recommendation', async () => {
        const recommendation = await createRecommendation();
        const { id } = recommendation
        
        const response = await supertest(app).post(`/recommendations/${id}/upvote`).send({});

        const upvote = await prisma.recommendations.findUnique({
            where: { id }
        })

        expect(response.status).toBe(201);
        expect(upvote.score).toBe(1);
    }); 
})

describe("POST /recommendations/:id/downvote", () => {
    it('should return 404 for inexistent recommendation', async () => {
        const response = await supertest(app).post("/recommendations/1/downvote").send({});

        expect(response.status).toBe(404);
    }); 
    it('should downvote an existent recommendation', async () => {
        const recommendation = await createRecommendation();
        const { id } = recommendation
        
        const response = await supertest(app).post(`/recommendations/${id}/downvote`).send({});

        const downvote = await prisma.recommendations.findUnique({
            where: { id }
        })
        console.log(downvote);
        expect(response.status).toBe(201);
        expect(downvote.score).toBe(-1);
    }); 
    it('should delete an existent recommendation downvoted with score -5', async () => {
        const recommendation = await createRecommendation();
        const { id } = recommendation
        
        for(let i=0; i<5; i++) {
            await supertest(app).post(`/recommendations/${id}/downvote`).send({});
        }

        const response = await supertest(app).post(`/recommendations/${id}/downvote`).send({});

        const downvote = await prisma.recommendations.findMany({
            where: { id }
        })

        expect(response.status).toBe(201);
        expect(downvote.length).toBe(0);
    }); 
})