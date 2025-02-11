import { useState } from "react";
import Issue from "./Issue";
import PaginationButtons from "./Pagination";

interface IssueProps {
  title: string;
  id: number;
  state: string;
  first: string;
  messages: string;
}

interface IssueListProps {
  issues: IssueProps[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const issuesPerPage = 10;

  // Filter issues based on status
  const filteredIssues = issues.filter((issue) => {
    if (statusFilter === "all") return true;
    return issue.state === statusFilter;
  });

  const sortedIssues = sortOrder === "oldest" ? [...filteredIssues].reverse() : filteredIssues;

  // Pagination logic
  const totalPages = Math.ceil(sortedIssues.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const paginatedIssues = sortedIssues.slice(startIndex, startIndex + issuesPerPage);

  return (
    <div className="mt-4 space-y-4">
      {/* Filters & Sorting */}
      <div className="flex justify-between items-center mb-4">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          className="px-3 py-2 bg-gray-700 text-white rounded-md"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="no reaction">No Reaction</option>
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 bg-gray-700 text-white rounded-md"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Issue List */}
      {paginatedIssues.map((issue) => (
        <Issue key={issue.id} {...issue} />
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <PaginationButtons count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} />
        </div>
      )}
    </div>
  );
};

export default IssueList;
