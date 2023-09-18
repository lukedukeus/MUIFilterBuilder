import {
  IconButton,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Stack,
  SxProps,
  Tooltip,
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

interface GroupItemProps {
  item: IGroupItem;
  onChange: (item: IGroupItem) => void;
  onRemove?: () => void;
  sx?: SxProps;
}

function GroupItem({ item, onChange, onRemove, sx }: GroupItemProps) {
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(addMenuAnchorEl);

  const handleOperatorChange = (e: SelectChangeEvent<GroupLogicOperator>) => {
    const newOperator = e.target.value as GroupLogicOperator;

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
      field: "someField",
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
    <Stack direction="column" sx={sx}>
      <Stack direction="row">
        {onRemove && (
          <Tooltip title="Remove">
            <IconButton aria-label="remove" onClick={onRemove}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}

        <SelectButton
          items={Object.values(GroupLogicOperator)}
          value={item.operator}
          onChange={handleOperatorChange}
        />
        <Tooltip title="Add">
          <IconButton aria-label="add" onClick={handleAddClick}>
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
      </Stack>

      {item.items.map((item, index) => {
        const style = { ...sx, pl: 2, borderLeft: "1px solid #ccc" };

        if ("field" in item) {
          return (
            <ConditionItem
              key={index}
              item={item}
              onChange={handleItemChange}
              onRemove={() => handleRemove(item.id)}
              sx={style}
            />
          );
        }

        return (
          <GroupItem
            key={index}
            item={item}
            onChange={handleItemChange}
            onRemove={() => handleRemove(item.id)}
            sx={style}
          />
        );
      })}
    </Stack>
  );
}

export default GroupItem;
