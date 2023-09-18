import { ConditionItem } from "./types";

interface ConditionItemProps {
  item: ConditionItem;
  onChange: (item: ConditionItem) => void;
  onRemove: () => void;
}

function ConditionItem({ item, onChange }: ConditionItemProps) {
  return <div></div>;
}

export default ConditionItem;
