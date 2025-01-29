import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { movieRoutes } from './routes/movies.routes';
import { errorHandler } from './middleware/error-handler';
import basicAuth from 'express-basic-auth';
import { authenticateUser } from './middleware/auth';

const app = express();

// Middleware.
app.use(cors({ origin: '*' })); // Allow all origins for now.
app.use(express.json());

// Auth.
app.use(
    basicAuth({
      authorizer: authenticateUser,
      authorizeAsync: true,
      challenge: true, // sends WWW-Authenticate header so browser will prompt for credentials
      realm: 'NodeMovieAPI', // an arbitrary string to identify the protected area
    })
  );
  

// Routes.
app.use('/movies', movieRoutes);

// Error handling - always define after routes to avoid override of error handling.
app.use(errorHandler);

// Start listening for requests on the defined port.
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
