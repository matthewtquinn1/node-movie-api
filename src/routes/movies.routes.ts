import { Router } from "express";
import { Request, Response } from 'express';
import { Movie } from './../entities/movie';
import { db } from './../database';
import { CreateMovieCommand } from "../commands/create-movie.command";
import { UpdateMovieCommand } from "../commands/update-movie.command";
import { PatchMovieCommand } from "../commands/patch-movie.command";
import { DeleteMovieCommand } from "../commands/delete-movie.command";

export const movieRoutes = Router();

movieRoutes.post('/', async (request: Request<{}, {}, CreateMovieCommand>, response: Response) => {
    if (!request.body.name) {
        response.status(400).send({ error: 'Name is required'});
        return;
    }
    if (!request.body.description) {
        response.status(400).send({ error: 'Description is required'});
        return;
    }
    if (!request.body.rating) {
        response.status(400).send({ error: 'Rating is required'});
    }
    if (isNaN(request.body.rating)) {
        response.status(400).send({ error: 'Rating must be a number'});
        return;
    }
    if (request.body.rating < 1 || request.body.rating > 5) {
        response.status(400).send({ error: 'Rating must be between 1 and 5'});
        return;
    }

    try {
        const [movie] = await db('movies').insert(request.body).returning('*');
        response.status(201).send(movie);
        return;
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: 'Failed to create movie.' });
        return;
    }
});

movieRoutes.get('/', async (_: Request, result: Response) => {
    const movies: Movie[] = await db('movies').select('*');
    result.send(movies);

    return;
});

movieRoutes.get('/:id', async (request: Request, result: Response) => {
    const { id } = request.params;
    const movie: Movie = await db('movies').where({ id }).first();
    if (!movie) {
        result.status(404).send({ error: 'Movie not found' });
        return;
    }

    result.send(movie);
    return;
});

movieRoutes.put('/:id', async (request: Request<{ id: string }, {}, UpdateMovieCommand>, response: Response) => {
    if (!request.params.id) {
        response.status(400).send({ error: 'ID is required' });
        return;
    }
    if (request.params.id !== request.body.id) {
        response.status(400).send({ error: 'ID in URL must match ID in body' });
        return;
    }
    if (!request.body.name) {
        response.status(400).send({ error: 'Name is required'});
        return;
    }
    if (!request.body.description) {
        response.status(400).send({ error: 'Description is required'});
        return;
    }
    if (!request.body.rating) {
        response.status(400).send({ error: 'Rating is required'});
    }
    if (isNaN(request.body.rating)) {
        response.status(400).send({ error: 'Rating must be a number'});
        return;
    }
    if (request.body.rating < 1 || request.body.rating > 5) {
        response.status(400).send({ error: 'Rating must be between 1 and 5'});
        return;
    }

    const [movie] = await db('movies')
        .where({ id: request.params.id })
        .update({ ...request.body, updated_at: db.fn.now() })
        .returning('*');
    if (!movie) {
        response.status(404).send({ error: 'Movie not found' });
        return;
    }

    response.send(movie);
    return;
});

movieRoutes.patch('/:id', async (request: Request<{ id: string }, {}, PatchMovieCommand>, response: Response) => {
    if (!request.params.id) {
        response.status(400).send({ error: 'ID is required' });
        return;
    }
    if (request.params.id !== request.body.id) {
        response.status(400).send({ error: 'ID in URL must match ID in body' });
        return;
    }
    if (request.body.name?.length === 0) {
        response.status(400).send({ error: 'Name is required'});
        return;
    }
    if (request.body.description?.length === 0) {
        response.status(400).send({ error: 'Description is required'});
        return;
    }
    if (request.body.rating && isNaN(request.body.rating)) {
        response.status(400).send({ error: 'Rating must be a number'});
        return;
    }
    if (request.body.rating && (request.body.rating < 1 || request.body.rating > 5)) {
        response.status(400).send({ error: 'Rating must be between 1 and 5'});
        return;
    }

    const [movie] = await db('movies')
        .where({ id: request.params.id })
        .update({ ...request.body, updated_at: db.fn.now() }) // It will only update the provided fields.
        .returning('*');
    if (!movie) {
        response.status(404).send({ error: 'Movie not found' });
        return;
    }

    response.send(movie);
    return;
});

movieRoutes.delete('/:id', async (request: Request<{ id: string}, {}, DeleteMovieCommand>, response: Response) => {
    if (!request.params.id) {
        response.status(400).send({ error: 'ID is required' });
        return;
    }
    if (request.params.id !== request.body.id) {
        response.status(400).send({ error: 'ID in URL must match ID in body' });
        return;
    }

    const affectedRows = await db('movies').where({ id: request.body.id }).del();
    if (affectedRows === 0) {
        response.status(404).send({ error: 'Movie not found' });
        return;
    }

    response.status(204).send();
    return;
});
