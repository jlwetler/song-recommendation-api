import "../src/setup";
import supertest from "supertest";
import app from "../src/app";
import { cleanDatabase, endConnection } from "./utils/database";

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
    it('should return 422 for invalid recommendation', async () => {
        const body = {
            name: "test",
            youtubeLink: "https://www.google.com"
        }

        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toBe(422);
    })
})