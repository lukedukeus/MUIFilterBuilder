import { GridColType } from "@mui/x-data-grid-premium";

export interface FilterBuilderModel {
  operator: GroupLogicOperator;
  items: Array<IConditionItem | IGroupItem>;
}

export enum GroupLogicOperator {
  And = "and",
  Or = "or",
}

export type FieldType = GridColType;

export enum ConditionLogicOperator {
  Equals = "=",
  DoesNotEqual = "<>",
  GreaterThan = ">",
  LessThan = "<",
  GreaterThanOrEqual = ">=",
  LessThanOrEqual = "<=",
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
