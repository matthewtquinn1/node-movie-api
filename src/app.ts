import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { movieRoutes } from './routes/movies.routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

// Middleware.
app.use(cors({ origin: '*' })); // Allow all origins for now.
app.use(express.json());

// Routes.
app.use('/movies', movieRoutes);

// Error handling - always define after routes to avoid override of error handling.
app.use(errorHandler);

// Start listening for requests on the defined port.
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
