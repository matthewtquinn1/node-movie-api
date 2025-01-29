import { db } from "../database";

export const authenticateUser = async (
    username: string, 
    password: string, 
    callback: (err: any, authorized?: boolean) => void) => 
{
    const user = await db('users')
        .select('*')
        .where({ username, password })
        .first();
    const userExists = !!user;
    
    // We don't provide an error here - avoids it bubbling up to our custom error handler.
    // Instead, this skips that handler, and returns a 401.
    callback(null, userExists);
}