import { FieldType } from ".";
import StringValueSelect from "./StringValueSelect";
import NumberValueSelect from "./NumberValueSelect";
import { SxProps } from "@mui/material";

interface ValueSelectProps {
  type: FieldType;
  value: unknown;
  onChange: (value: unknown) => void;
  size: "small" | "medium";
  sx?: SxProps;
}

function ValueSelect({ type, value, onChange, size, sx }: ValueSelectProps) {
  if (type === "string") {
    return (
      <StringValueSelect
        sx={sx}
        size={size}
        value={value as string}
        onChange={(newValue) => {
          onChange(newValue);
        }}
      />
    );
  }

  if (type === "number") {
    return (
      <NumberValueSelect
        sx={sx}
        size={size}
        value={value as number}
        onChange={(newValue) => {
          onChange(newValue);
        }}
      />
    );
  }

  throw new Error(`Unrecognized type: ${type}`);
}

export default ValueSelect;
