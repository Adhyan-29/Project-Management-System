import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
    
});


//const app = express();
// const PORT=3000;
const PORT = process.env.PORT || 8000;


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDb connection error",err)
        process.exit(1)
    })

// app.listen(PORT, ()=>{
//     console.log(`Example app listening on port http://localhost:${PORT}`);
// });





// let myusername = process.env.database;

// console.log("value : ",myusername);

// console.log("Start of the  Project");
