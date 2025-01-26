import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { Movie } from './entities/movie';
import { db } from './database';
import { movieRoutes } from './routes/movies.routes';

const app = express();
app.use(cors()); // Middleware to allow CORs.
app.use(express.json()); // Middleware to allow our endpoints to accept JSON.

// Add routes.
app.use('/movies', movieRoutes);

// Define a port to listen to (as defined by secrets, or 3000 if not defined).
const port = process.env.port || 3000;

// Start listening for requests on the defined port.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
