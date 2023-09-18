import { useEffect, useState } from "react";
import "./App.css";
import {
  FilterBuilder,
  FilterBuilderModel,
  GroupLogicOperator,
} from "./FilterBuilder";
import { GridColDef } from "@mui/x-data-grid-premium";

interface RowType {
  id: number;
  name: string;
  age: number;
  job: string;
}

const fields: Array<GridColDef<RowType>> = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "job",
    headerName: "Job",
    width: 150,
    editable: false,
  },
];

function App() {
  const [filter, setFilter] = useState<FilterBuilderModel>({
    operator: GroupLogicOperator.And,
    items: [],
  });

  useEffect(() => {
    console.log("Filter Changed:", filter);
  }, [filter]);

  return (
    <div>
      <FilterBuilder
        value={filter}
        onChange={setFilter}
        fields={fields}
        size="small"
      />
    </div>
  );
}

export default App;
