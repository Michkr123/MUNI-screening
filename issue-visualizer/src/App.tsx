import { useEffect, useState } from "react";
import IssueList from "./components/IssueList";

interface IssueProps {
  title: string;
  id: number;
  state: string;
  first: string;
  messages: string;
}

const App = () => {
  const [issues, setIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000") 
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="title font-semibold text-white">Simple issue visualizer</h1>
      <h2>Number of issues: {issues.length}</h2>
      <IssueList issues={issues} />
    </div>
  );
};

export default App;
