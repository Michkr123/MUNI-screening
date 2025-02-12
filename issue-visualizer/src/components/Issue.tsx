import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface IssueProps {
  title: string;
  id: number;
  state: string;
  first: string;
  messages: string;
}

const Issue: React.FC<IssueProps> = ({ title, id, state, first, messages }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to convert newlines (\n) to Markdown-style line breaks (  \n)
  const formatMarkdown = (text: string) => {
    return text.replace(/\n/g, '  \n');
  };

  // Split the messages based on the '\n---\n' delimiter
  const splitMessages = messages.split('\n---\n');

  return (
    <div className="p-4 rounded-2xl bg-gray-800 shadow-md border border-gray-700">
      {/* Title & Status */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-royalblue">{title}</h2>
          <p className={state === "open" ? "text-green-400" : state === "closed" ? "text-red-400" : "text-gray-400"}>
            {state}
          </p>
        </div>

        {/* Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-3 space-y-3">
          <h3 className="font-semibold text-gray-300">Description:</h3>
          <div className="p-3 bg-gray-700 rounded-md">
            <ReactMarkdown>{formatMarkdown(first)}</ReactMarkdown>
          </div>

          <h3 className="font-semibold text-gray-300">Messages:</h3>
          <div>
            {/* Render each message separately with its own background */}
            {splitMessages.map((message, index) => (
              <div key={index} className="p-3 bg-gray-600 rounded-md mt-2">
                {/* Format the individual message before rendering it */}
                <ReactMarkdown>{formatMarkdown(message)}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Issue;
