import app from "./app.js";
import dotenv from "dotenv/config";

app.listen(process.env.APP_PORT, () => console.log(`app is running on http://localhost:${process.env.APP_PORT}`))