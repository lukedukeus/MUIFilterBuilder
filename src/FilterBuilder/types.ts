export interface FilterBuilderModel {
  logicOperator: GroupLogicOperator;
  items: Array<ConditionItem | GroupItem>;
}

export enum GroupLogicOperator {
  And = "and",
  Or = "or",
}

export enum ConditionLogicOperator {
  Equals = "=",
  DoesNotEqual = "<>",
}

export interface FilterItem {
  id: string;
}

export interface ConditionItem extends FilterItem {
  field: string;
  operator: GroupLogicOperator;
  value: string;
}

export interface GroupItem extends FilterBuilderModel, FilterItem {}
