import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issuesFilePath = path.join(__dirname, '..', 'issues.json');

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
