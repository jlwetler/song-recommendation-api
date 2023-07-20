import pg from "pg";

const { Pool } = pg;

const dbConfig = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "senha1234", 
    database: "song_recs"
}

const connection = new Pool(dbConfig);

export default connection;