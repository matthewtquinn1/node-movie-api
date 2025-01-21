import express from 'express';
import { Request, Response } from 'express';
import { Movie } from './entities/movie';

// Uses express to receive any JSON data sent to our server.
const app = express();
app.use(express.json()); // TODO: Still needed?

// Define a port to listen to (as defined by secrets, or 3000 if not defined).
const port = process.env.port || 3000;

// Start listening for requests on the defined port.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/movies', (request: Request, result: Response) => {    
    const { id } = request.params;

    const requestBody = request.body as Movie;

    result.send(
        {
            name: requestBody.name, 
            description: requestBody.description, 
            rating: requestBody.rating, 
        } as Movie,
    );
});

app.get('/movies', (request: Request, result: Response) => {
    result.send(
        [
            { 
                id: '1111-111111-1111-11111', 
                name: 'The Matrix', 
                description: 'A movie about the matrix', 
                rating: '5', 
            } as Movie,
        ],
    );
});

app.get('/movies/:id', (request: Request, result: Response) => {
    const { id } = request.params;

    result.send(
        {
            id: '1111-111111-1111-11111', 
            name: 'The Matrix', 
            description: 'A movie about the matrix', 
            rating: '5', 
        } as Movie,
    );
});

app.put('/movies/:id', (request: Request, result: Response) => {    
    const { id } = request.params;

    const requestBody = request.body as Movie;

    result.send(
        {
            name: requestBody.name, 
            description: requestBody.description, 
            rating: requestBody.rating, 
        } as Movie,
    );
});

app.patch('/movies/:id', (request: Request, result: Response) => {    
    const { id } = request.params;

    const requestBody = request.body as Movie;

    const movie =         {
        name: requestBody.name, 
        description: requestBody.description, 
        rating: requestBody.rating, 
    } as Movie;

    // Extract possible updates from req.body
    const { name, description, rating } = request.body;

    // Update only the fields provided
    if (name !== undefined) {
        movie.name = name;
    }
    if (description !== undefined) {
        movie.description = description;
    }
    if (rating !== undefined) {
        movie.rating = rating;
    }

    result.send(movie);
});

app.delete('/movies/:id', (request: Request, result: Response) => {
    const { id } = request.params;
    // TODO: Implement.

    result.status(204).send(); // TODO: Needed?
});
