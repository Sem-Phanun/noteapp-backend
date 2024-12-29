import 'reflect-metadata';
import 'dotenv/config'
import express,{ Application, Request, Response } from "express";
import cors from 'cors';
import { NODE_ENV, PORT_URL } from './constants/env';
import database from './config/database';
import errorMiddlewareHandler from './middleware/errorMiddleware';
import noteRoute from './routes/noteRoute';
import userRoute from './routes/userRoute';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true,
}))


// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
    });
});
app.use('/api', noteRoute);
app.use('/api', userRoute)

// Error-handling middleware
app.use(errorMiddlewareHandler)


app.listen(PORT_URL, async() => {
    console.log(`Server is running on port ${PORT_URL} in ${NODE_ENV} environment`);
    await database.connect()
});