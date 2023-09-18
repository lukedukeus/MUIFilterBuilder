import {
  Button,
  Menu,
  MenuItem,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useState } from "react";

interface SelectButtonProps<T> extends SelectProps<T> {
  items: T[];
}

function SelectButton<T>({ value, onChange, items }: SelectButtonProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getDisplayValue = (item?: T | string) => {
    // if string, return as is
    if (typeof item === "string") {
      return capitalize(item);
    }
    return "";
  };

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        id="select-button"
        aria-controls={open ? "select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {getDisplayValue(value)}
      </Button>
      <Menu
        id="select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "select-button",
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            id={`select-menu-item-${index}`}
            onClick={() => {
              if (onChange) {
                const event = {
                  target: {
                    value: item,
                  },
                } as SelectChangeEvent<T>;

                onChange(event, null);
              }

              handleMenuClose();
            }}
          >
            {getDisplayValue(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SelectButton;
