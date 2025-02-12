import { useState, useEffect } from "react";
import Issue from "./Issue";
import PaginationButtons from "./Pagination";
import SelectDropdown from "./Dropdown";

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

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="mt-4 space-y-4">
      {/* Filters & Sorting */}
      <div className="flex justify-between items-center mb-4">
        {/* Status Filter */}
        <SelectDropdown
          label="Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: "all", label: "All" },
            { value: "open", label: "Open" },
            { value: "closed", label: "Closed" },
            { value: "no reaction", label: "No Reaction" },
          ]}
        />

        {/* Sorting */}
        <SelectDropdown
          label="Sort By"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
          ]}
        />
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
