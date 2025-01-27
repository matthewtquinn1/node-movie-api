import { z } from "zod";

export interface UpdateMovieCommand {
    id: string;
    name: string;
    description: string;
    rating: number;
}

export const updateMovieCommandSchema = z.object({
    id: z.string(), // TODO: .uuid(),
    name: z.string().min(1),
    description: z.string().min(1),
    rating: z.number().min(1).max(5),
})
