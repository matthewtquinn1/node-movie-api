import express from 'express';
import { Request, Response } from 'express';

// Uses express to receive any JSON data sent to our server.
const app = express();
app.use(express.json());

// Define a port to listen to (as defined by secrets, or 3000 if not defined).
const port = process.env.port || 3000;

// Start listening for requests on the defined port.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (request: Request, result: Response) => {
    result.send('Hello World');
});
