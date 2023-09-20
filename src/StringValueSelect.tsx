import { SxProps, TextField } from "@mui/material";

interface StringValueSelectProps {
  value: string;
  onChange: (value: string) => void;
  size: "small" | "medium";
  sx?: SxProps;
}

function StringValueSelect({
  value,
  onChange,
  size,
  sx,
}: StringValueSelectProps) {
  return (
    <TextField
      sx={sx}
      size={size}
      variant="outlined"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default StringValueSelect;
