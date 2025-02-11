import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS to allow requests from frontend
app.use(cors());

// Get the current directory using import.meta.url and convert it to a path
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correct path to issues.json (one level above the current directory)
const issuesFilePath = path.join(__dirname, '..', 'issues.json');

// Route to fetch the data from issues.json
app.get('/', (req, res) => {
  fs.readFile(issuesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading issues.json:', err);
      return res.status(500).json({ message: 'Failed to read issues data' });
    }
    
    try {
      const issues = JSON.parse(data);
      res.json(issues);
    } catch (parseError) {
      console.error('Error parsing issues.json:', parseError);
      res.status(500).json({ message: 'Failed to parse issues data' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
