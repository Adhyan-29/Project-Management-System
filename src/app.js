import express from "express";
import cors from "cors"

const app = express();

//basic configguration
app.use(express.json({ limit: "16kb"}));  //.use--> middleware
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"],
}),
);

// import the routes

import healthCheckRouter from "./routes/Healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js"

app.use("api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req,res)=> {
    res.send("Welcome to basecampy");
});

export default app;