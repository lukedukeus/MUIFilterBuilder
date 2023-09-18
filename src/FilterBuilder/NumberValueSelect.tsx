import { SxProps, TextField } from "@mui/material";

interface NumberValueSelectProps {
  value: number;
  onChange: (value: number) => void;
  size: "small" | "medium";
  sx?: SxProps;
}

function NumberValueSelect({
  value,
  onChange,
  size,
  sx,
}: NumberValueSelectProps) {
  return (
    <TextField
      sx={sx}
      size={size}
      type="number"
      variant="outlined"
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
    />
  );
}

export default NumberValueSelect;
