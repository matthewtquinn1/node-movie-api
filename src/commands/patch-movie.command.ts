import { z } from "zod";
import { Movie } from "../entities/movie";

export type PatchMovieCommand = Partial<Movie>;

export const patchMovieCommandSchema = z.object({
    id: z.string(), // TODO: .uuid(),
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    rating: z.number().min(1).max(5).optional(),
})