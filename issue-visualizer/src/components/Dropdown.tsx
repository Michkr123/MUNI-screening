import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectDropdown({ label, value, options, onChange }: SelectDropdownProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" sx={{ color: "white" }}>
          {label}
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={onChange}
          sx={{
            color: "white",
            fontSize: "inherit",
            "& svg": { color: "white" },
            "& option": { olor: "black" },
            "& option:hover": { backgroundColor: "#ff0000", color: "white" },
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
