import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  IConditionItem,
  ConditionLogicOperator,
  IGroupItem,
  GroupLogicOperator,
} from "./types";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SelectButton from "./SelectButton";
import { useState } from "react";
import { ConditionItem } from ".";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid-premium";

interface GroupItemProps<T extends GridValidRowModel> {
  item: IGroupItem;
  fields: Array<GridColDef<T>>;
  onChange: (item: IGroupItem) => void;
  onRemove?: () => void;
  sx?: SxProps;
  size: "small" | "medium";
}

function GroupItem<T extends GridValidRowModel>({
  item,
  onChange,
  onRemove,
  fields,
  sx,
  size,
}: GroupItemProps<T>) {
  const theme = useTheme();

  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(addMenuAnchorEl);

  const handleOperatorChange = (newOperator: GroupLogicOperator) => {
    if (onChange) {
      onChange({
        ...item,
        operator: newOperator,
      });
    }
  };

  const getNewItemId = () => `${item.id}.${item.items.length}`;

  const handleAddGroup = () => {
    const newGroup: IGroupItem = {
      id: getNewItemId(),
      operator: GroupLogicOperator.And,
      items: [],
    };

    onChange({
      ...item,
      items: [...item.items, newGroup],
    });

    handleAddMenuClose();
  };

  const handleAddCondition = () => {
    const newCondition: IConditionItem = {
      id: getNewItemId(),
      field: fields[0].field,
      operator: ConditionLogicOperator.Equals,
    };

    onChange({
      ...item,
      items: [...item.items, newCondition],
    });

    handleAddMenuClose();
  };

  const handleRemove = (id: string) => {
    onChange({
      ...item,
      items: item.items.filter((item) => item.id !== id),
    });
  };

  const handleItemChange = (modifiedItem: IConditionItem | IGroupItem) => {
    onChange({
      ...item,
      items: item.items.map((i) => {
        if (i.id === modifiedItem.id) {
          return modifiedItem;
        }
        return i;
      }),
    });
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddMenuAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...sx,
        }}
      >
        {onRemove && (
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
        )}

        <SelectButton
          items={Object.values(GroupLogicOperator)}
          value={item.operator}
          onChange={handleOperatorChange}
          size={size}
          color="error"
          sx={{
            margin: 1,
          }}
        />
        <Tooltip title="Add">
          <IconButton
            aria-label="add"
            onClick={handleAddClick}
            sx={{
              color: theme.palette.success.main,
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="add-menu"
          anchorEl={addMenuAnchorEl}
          open={open}
          onClose={handleAddMenuClose}
          MenuListProps={{
            "aria-labelledby": "add-button",
          }}
        >
          <MenuItem onClick={handleAddCondition}>Add Condition</MenuItem>
          <MenuItem onClick={handleAddGroup}>Add Group</MenuItem>
        </Menu>
      </Box>

      {item.items.map((item, index) => {
        const style = { ...sx, pl: 4 };

        if ("field" in item) {
          return (
            <ConditionItem
              key={index}
              item={item}
              fields={fields}
              onChange={handleItemChange}
              onRemove={() => handleRemove(item.id)}
              sx={style}
              size={size}
            />
          );
        }

        return (
          <GroupItem
            key={index}
            item={item}
            fields={fields}
            onChange={handleItemChange}
            onRemove={() => handleRemove(item.id)}
            sx={style}
            size={size}
          />
        );
      })}
    </Box>
  );
}

export default GroupItem;
