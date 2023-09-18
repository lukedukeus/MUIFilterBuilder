import { GroupItem } from "./types";

interface GroupItemProps {
  item: GroupItem;
  onChange: (item: GroupItem) => void;
  onAddCondition: () => void;
  onAddGroup: () => void;
  onRemove: () => void;
}

function GroupItem({ item, onChange }: GroupItemProps) {
  return <div></div>;
}

export default GroupItem;
