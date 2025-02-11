import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons

interface IssueProps {
  title: string;
  id: number;
  state: string;
  first: string;
  messages: string;
}

const Issue: React.FC<IssueProps> = ({ title, id, state, first, messages }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 rounded-2xl bg-gray-800 shadow-md border border-gray-700">
      {/* Title & Status */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-royalblue">{title}</h2>
          <p className={state === "open" ? "text-green-400" : state === "closed" ? "text-red-400" : "text-gray-500"}>
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
          <div className="p-3 bg-gray-700 rounded-md">
            <h3 className="font-semibold text-gray-300">Description:</h3>
            <p className="text-gray-200 whitespace-pre-line">{first}</p>
          </div>

          <div className="p-3 bg-gray-600 rounded-md">
            <h3 className="font-semibold text-gray-300">Messages:</h3>
            <p className="text-gray-200 whitespace-pre-line">{messages}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issue;
