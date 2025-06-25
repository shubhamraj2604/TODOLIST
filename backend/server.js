import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import {sql} from './config/db.js'
import todoroutes from './routes/todoroutes.js'
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // fallback to 5000
const __dirname = path.resolve(); // get the current directory

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/todo",todoroutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from React
  app.use(express.static(path.join(__dirname, "/frontend/dist")));


//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname , "frontend" , "dist" ,"assets" ,"index-BZwCI-Jc.js"));
//   });
}

async function initDb(params) {
    try{
     await sql`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
    console.log("DATABASE INITIALIZED SUCCESSfullly")
    }catch(error){
        console.log("error",error);
    }
}

initDb().then(()=>{
app.listen(PORT,()=>{
    console.log("Server is running on port"+PORT);
});
});