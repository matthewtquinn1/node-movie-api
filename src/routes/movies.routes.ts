import { Router } from "express";
import { Request, Response } from 'express';
import { Movie } from './../entities/movie';
import { db } from './../database';
import { CreateMovieCommand, createMovieCommandSchema } from "../commands/create-movie.command";
import { UpdateMovieCommand, updateMovieCommandSchema } from "../commands/update-movie.command";
import { PatchMovieCommand, patchMovieCommandSchema } from "../commands/patch-movie.command";
import { DeleteMovieCommand } from "../commands/delete-movie.command";

export const movieRoutes = Router();

movieRoutes.post('/', async (request: Request<{}, {}, CreateMovieCommand>, response: Response) => {
    const validationResult = createMovieCommandSchema.safeParse(request.body);
    if(validationResult.success === false) {
        response.status(400).send({ errors: validationResult.error.errors });
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
    const validationResult = updateMovieCommandSchema.safeParse(request.body);
    if(validationResult.success === false) {
        response.status(400).send({ errors: validationResult.error.errors });
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
    const validationResult = patchMovieCommandSchema.safeParse(request.body);
    if(validationResult.success === false) {
        response.status(400).send({ errors: validationResult.error.errors });
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
