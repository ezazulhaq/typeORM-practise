import 'reflect-metadata';
import { AppRouter } from './routes/route';
const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

/** routes */
const appRouter = new AppRouter();
app.use("/api", appRouter.router);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
