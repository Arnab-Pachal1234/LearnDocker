import express from "express";
import pg from "pg";
import { createClient } from "redis";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// PostgreSQL connection
const pool = new pg.Pool({
    host: "localhost",
    port: 5431,
    user: "postgres",
    password: "postgres",
    database: "postgres",
});
// Redis connection
const redisClient = createClient({
    url: "redis://localhost:6379"
});
redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});
async function connectServices() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL connected successfully");
        await redisClient.connect();
        console.log("Redis connected successfully");
    }
    catch (error) {
        console.error("Service connection failed:", error);
        process.exit(1);
    }
}
app.get("/", (req, res) => {
    res.json({
        message: "Backend running inside Docker",
        status: "success",
    });
});
app.get("/health", async (req, res) => {
    try {
        const postgresResult = await pool.query("SELECT NOW()");
        await redisClient.set("health", "ok");
        const redisResult = await redisClient.get("health");
        res.json({
            status: "success",
            postgres: postgresResult.rows[0],
            redis: redisResult,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Database or Redis connection failed",
            error,
        });
    }
});
connectServices().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map