import { Box, IconButton, SxProps, Tooltip, useTheme } from "@mui/material";
import { ConditionLogicOperator, FieldType, IConditionItem } from "./types";
import ClearIcon from "@mui/icons-material/Clear";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid-premium";
import SelectButton from "./SelectButton";
import { useState } from "react";
import ValueSelect from "./ValueSelect";

interface ConditionItemProps<T extends GridValidRowModel> {
  item: IConditionItem;
  fields: Array<GridColDef<T>>;
  onChange: (item: IConditionItem) => void;
  onRemove: () => void;
  sx?: SxProps;
  size: "small" | "medium";
}

function ConditionItem<T extends GridValidRowModel>({
  item,
  fields,
  onChange,
  onRemove,
  sx,
  size,
}: ConditionItemProps<T>) {
  const theme = useTheme();

  const [fieldType, setFieldType] = useState<FieldType>("string");

  const handleFieldChange = (newField: string) => {
    onChange({
      ...item,
      field: newField,
    });

    setFieldType(fields.find((f) => f.field === newField)?.type ?? "string");
  };

  const handleOperatorChange = (newOperator: ConditionLogicOperator) => {
    onChange({
      ...item,
      operator: newOperator,
    });
  };

  const handleValueChange = (newValue: unknown) => {
    onChange({
      ...item,
      value: newValue as string,
    });
  };

  const availibleOperators = getAvailibleOperators(fieldType);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Tooltip title="Remove">
        <IconButton
          aria-label="remove"
          onClick={onRemove}
          sx={{
            color: theme.palette.error.main,
          }}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <SelectButton
        size={size}
        items={fields.map((field) => field.field)}
        onChange={handleFieldChange}
        value={item.field}
        color="primary"
        sx={{
          margin: 1,
        }}
      />
      <SelectButton
        size={size}
        items={availibleOperators}
        onChange={handleOperatorChange}
        value={
          availibleOperators.includes(item.operator)
            ? item.operator
            : availibleOperators[0]
        }
        color="success"
        sx={{
          margin: 1,
        }}
      />
      <ValueSelect
        size={size}
        type={fieldType}
        onChange={handleValueChange}
        value={item.value}
        sx={{
          margin: 1,
        }}
      />
    </Box>
  );
}

const getAvailibleOperators = (fieldType: string) => {
  if (fieldType === "number") {
    return [
      ConditionLogicOperator.Equals,
      ConditionLogicOperator.DoesNotEqual,
      ConditionLogicOperator.GreaterThan,
      ConditionLogicOperator.GreaterThanOrEqual,
      ConditionLogicOperator.LessThan,
      ConditionLogicOperator.LessThanOrEqual,
    ];
  }

  if (fieldType === "boolean") {
    return [ConditionLogicOperator.Equals, ConditionLogicOperator.DoesNotEqual];
  }

  return [ConditionLogicOperator.Equals, ConditionLogicOperator.DoesNotEqual];
};

export default ConditionItem;
