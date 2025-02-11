import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Get the current directory using import.meta.url and convert it to a path
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correct path to issues.json (one level above the current directory)
const issuesFilePath = path.join(__dirname, '..', 'issues.json');

// Route to fetch the data from issues.json
app.get('/', (req, res) => {
  // Read the issues.json file
  fs.readFile(issuesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading issues.json:', err);
      return res.status(500).json({ message: 'Failed to read issues data' });
    }
    
    // Parse the JSON data and send it as a response
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
  console.log(`Example app listening at http://localhost:${port}`);
});
