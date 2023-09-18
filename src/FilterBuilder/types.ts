export interface FilterBuilderModel {
  operator: GroupLogicOperator;
  items: Array<IConditionItem | IGroupItem>;
}

export enum GroupLogicOperator {
  And = "and",
  Or = "or",
}

export enum ConditionLogicOperator {
  Equals = "=",
  DoesNotEqual = "<>",
}

export interface IFilterItem {
  id: string;
}

export interface IConditionItem extends IFilterItem {
  field: string;
  operator: ConditionLogicOperator;
  value?: string;
}

export interface IGroupItem extends FilterBuilderModel, IFilterItem {}
