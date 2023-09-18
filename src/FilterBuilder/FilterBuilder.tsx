import { FilterBuilderModel } from "./types";
import { Stack } from "@mui/material";
import { GroupItem } from ".";

interface FilterBuilderProps {
  value: FilterBuilderModel;
  onChange: (value: FilterBuilderModel) => void;
}

function FilterBuilder({ value, onChange }: FilterBuilderProps) {
  return (
    <Stack spacing={2}>
      <GroupItem
        item={{
          ...value,
          id: "root",
        }}
        onChange={onChange}
      />
    </Stack>
  );
}

export default FilterBuilder;
