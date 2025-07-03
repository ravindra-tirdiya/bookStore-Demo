import express from 'express';
import 'dotenv/config.js';
import logger from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { notFound, general } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(logger);

app.use('/auth',  authRoutes);
app.use('/books', bookRoutes);

app.use(notFound);
app.use(general);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
