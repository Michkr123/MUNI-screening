import React from "react"; // Ensure React is explicitly imported
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationButtons({ count, page, onChange }: PaginationProps) {
  return (
    <Pagination count={count} page={page} onChange={onChange} showFirstButton showLastButton color="primary" sx={{"& .MuiPaginationItem-root": { color: "white" }}} />
  );
}
