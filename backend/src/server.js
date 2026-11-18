import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger for easy debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Mount routes at both /api and root level for maximum flexibility with assignment spec
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'coy-discover-backend', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Coy Discover Backend running at http://localhost:${PORT}`);
  console.log(`Endpoints available:`);
  console.log(` - GET  /feed (or /api/feed)`);
  console.log(` - POST /swipe (or /api/swipe)`);
  console.log(` - GET  /matches (or /api/matches)`);
  console.log(` - POST /undo (or /api/undo)`);
  console.log(` - POST /reset (or /api/reset)`);
});
