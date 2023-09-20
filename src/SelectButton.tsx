import { Button, Menu, MenuItem, SxProps } from "@mui/material";
import { useState } from "react";

interface SelectButtonProps<T> {
  value: T;
  items: Array<T>;
  onChange?: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  children?: React.ReactNode;
  size: "small" | "medium";
  sx?: SxProps;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

function SelectButton<T>({
  value,
  onChange,
  renderItem,
  items,
  children,
  size,
  sx,
  color,
}: SelectButtonProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        sx={sx}
        size={size}
        color={color}
        id="select-button"
        aria-controls={open ? "select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        {renderItem ? renderItem(value) : String(value)}
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
        {items.length === 0 && <MenuItem disabled>No items</MenuItem>}
        {children && children}
        {items.map((item, index) => (
          <MenuItem
            key={index}
            id={`select-menu-item-${index}`}
            onClick={() => {
              if (onChange) {
                onChange(item);
              }

              handleMenuClose();
            }}
          >
            {renderItem ? renderItem(item) : String(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SelectButton;
