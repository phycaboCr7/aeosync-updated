
// This is a simple server to handle API requests during development
// For production, you would use a proper backend or serverless functions

import express from 'express';
import cors from 'cors';
import { handleGeminiRequest } from './src/api/geminiProxy';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/geminiProxy', async (req, res) => {
  // Create a Request object from the Express request
  const request = new Request('http://localhost/api/geminiProxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  try {
    // Forward to our handler
    const response = await handleGeminiRequest(request);
    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
