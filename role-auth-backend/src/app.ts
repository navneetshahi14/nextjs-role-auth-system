import express from 'express';
import authRouter from './routes/auth.routes'
import roleRouter from './routes/roles.routes'
import connectDB from './config/db';
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors())


connectDB()


app.use('/auth',authRouter)
app.use('/role',roleRouter)

app.get("/", (req, res) => {
  res.send("Hello from Role Auth Backend!");
});

export default app;