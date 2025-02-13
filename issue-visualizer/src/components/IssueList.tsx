import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import { Pagination, Tabs, Tab, Box } from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

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

  const filteredIssues = issues.filter((issue) => {
    if (statusFilter === "all") return true;
    return issue.state === statusFilter;
  });

  const sortedIssues =
    sortOrder === "oldest" ? [...filteredIssues].reverse() : filteredIssues;

  const totalPages = Math.ceil(sortedIssues.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const paginatedIssues = sortedIssues.slice(startIndex, startIndex + issuesPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleStatusChange = (_: React.SyntheticEvent, newValue: string) => {
    setStatusFilter(newValue);
    setCurrentPage(1);
  };

  const handleSortChange = (
    _: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSortOrder(newValue || "newest");
    setCurrentPage(1);
  };

  return (
    <div className="mt-4 space-y-4">
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          flexWrap: "nowrap",
          "@media (max-width: 768px)": {
            flexWrap: "wrap",
          },
        }}
      >
        {/* State Filter - MUI Tabs */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            "@media (max-width: 768px)": {
              width: "100%",
              justifyContent: "center",
            },
          }}
        >
          <Tabs
            value={statusFilter}
            onChange={handleStatusChange}
            sx={{
              width: "100%",
              maxWidth: "400px",
              display: "flex",
              justifyContent: "flex-start",
              "& .MuiTab-root": {
                color: "white",
                fontSize: "clamp(0.7rem, 2vw, 1rem)",
                minWidth: "80px",
                textAlign: "center",
                flexGrow: 1,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "white",
              },
              "@media (max-width: 768px)": {
                width: "100%",
                justifyContent: "center",
                maxWidth: "100%",
              },
            }}
          >
            <Tab label="All" value="all" />
            <Tab label="Open" value="open" />
            <Tab label="Closed" value="closed" />
            <Tab label="No Reaction" value="no reaction" />
          </Tabs>
        </Box>

        {/* Sorting - MUI Select */}
        <Select
          defaultValue="newest"
          onChange={handleSortChange}
          sx={{
            flex: "0.3 1 auto",
            minWidth: "120px",
            maxWidth: "200px",
            backgroundColor: "#222222",
            color: "white",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            "&:hover": {
              backgroundColor: "#222222",
            },
            "@media (max-width: 768px)": {
              width: "100%",
              maxWidth: "800px",
            },
          }}
        >
          <Option value="newest">Newest</Option>
          <Option value="oldest">Oldest</Option>
        </Select>
      </Box>

      {/* Issue List */}
      {paginatedIssues.map((issue) => (
        <Issue key={issue.id} {...issue} />
      ))}

      {/* Pagination - MUI Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            showFirstButton
            showLastButton
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": { color: "white" },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default IssueList;
