import { useEffect, useState } from "react";
import "./App.css";
import {
  FilterBuilder,
  FilterBuilderModel,
  GroupLogicOperator,
} from "./FilterBuilder";

function App() {
  const [filter, setFilter] = useState<FilterBuilderModel>({
    logicOperator: GroupLogicOperator.And,
    items: [],
  });

  useEffect(() => {
    console.log("Filter Changed:", filter);
  }, [filter]);

  return (
    <div>
      <FilterBuilder value={filter} onChange={setFilter} />
    </div>
  );
}

export default App;
