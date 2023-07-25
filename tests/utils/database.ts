import prisma from "../../src/database";

export async function cleanDatabase() {
    await prisma.$queryRaw`TRUNCATE recommendations RESTART IDENTITY`;
}

export async function endConnection() {
    await prisma.$disconnect();
}