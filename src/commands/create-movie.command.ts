import { z } from "zod";

export interface CreateMovieCommand {
    name: string;
    description: string;
    rating: number;
}

export const createMovieCommandSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    rating: z.number().min(1).max(5),
})