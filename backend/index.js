import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './connection.js';
import userRouter from './routes/user.js';
import notesRouter from './routes/notes.js';
import authMiddleware from './middleware/auth.js';

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 8000

connectDB(); // Connect to DB
app.get('/',(req,res) => {
    res.send("welcome to my site")
})

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// API test route
app.get('/api/test', (req, res) => {
    res.json({ message: "API is working fine!" });
});

//public routes
app.use('/api',userRouter)
app.use('/api/notes',authMiddleware,notesRouter)


app.listen(PORT , () => {
    console.log("server is running")
})
