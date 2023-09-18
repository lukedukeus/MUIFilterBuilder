import {
  IconButton,
  SelectChangeEvent,
  Stack,
  SxProps,
  Tooltip,
} from "@mui/material";
import { ConditionLogicOperator, IConditionItem } from "./types";
import ClearIcon from "@mui/icons-material/Clear";
import SelectButton from "./SelectButton";

interface ConditionItemProps {
  item: IConditionItem;
  onChange: (item: IConditionItem) => void;
  onRemove: () => void;
  sx?: SxProps;
}

function ConditionItem({ item, onChange, onRemove, sx }: ConditionItemProps) {
  const handleFieldChange = (e: SelectChangeEvent<string>) => {
    const newField = e.target.value;

    onChange({
      ...item,
      field: newField,
    });
  };

  const handleOperatorChange = (e: SelectChangeEvent<string>) => {
    const newOperator = e.target.value as ConditionLogicOperator;

    onChange({
      ...item,
      operator: newOperator,
    });
  };

  const handleValueChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;

    onChange({
      ...item,
      value: newValue,
    });
  };

  return (
    <Stack direction="row" sx={sx}>
      <Tooltip title="Remove">
        <IconButton aria-label="remove" onClick={onRemove}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <SelectButton
        items={["Name", "Unit Price", "Quantity"]}
        onChange={handleFieldChange}
        value={item.field}
      />
      <SelectButton
        items={["Equals", "Contains"]}
        onChange={handleOperatorChange}
        value={item.operator}
      />
      <SelectButton
        items={["Value 1", "Value 2"]}
        onChange={handleValueChange}
        value={item.value}
      />
    </Stack>
  );
}

export default ConditionItem;
