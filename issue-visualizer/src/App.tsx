import React, { useEffect, useState } from 'react';

const App = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching issues:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue: any, index: number) => (
          <li key={index}>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
