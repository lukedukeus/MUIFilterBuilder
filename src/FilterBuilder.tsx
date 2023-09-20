import { FilterBuilderModel } from "./types";
import { Box, SxProps } from "@mui/material";
import { GroupItem } from ".";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid-premium";

interface FilterBuilderProps<T extends GridValidRowModel> {
  value: FilterBuilderModel;
  onChange: (value: FilterBuilderModel) => void;
  fields: Array<GridColDef<T>>;
  sx?: SxProps;
  size?: "small" | "medium";
}

function FilterBuilder<T extends GridValidRowModel>({
  value,
  onChange,
  fields,
  sx,
  size = "medium",
}: FilterBuilderProps<T>) {
  return (
    <Box sx={sx}>
      <GroupItem
        item={{
          ...value,
          id: "root",
        }}
        onChange={onChange}
        fields={fields}
        size={size}
      />
    </Box>
  );
}

export default FilterBuilder;
