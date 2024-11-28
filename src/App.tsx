import { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./helpers/fetchers";
import { Section } from "./components/section/section";
import { DataModel } from "./helpers/data";
import { Header } from "./components/header/header";
import {
  Dropdown_grouping,
  Dropdown_ordering,
  KanbanContext,
} from "./helpers/contexts";

const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

interface MainProps {
  data: DataModel;
}
function Main({ data }: MainProps) {
  const [grouping, setGrouping] = useState<Dropdown_grouping>(() => {
    const savedState = localStorage.getItem(
      "appContext_grouping"
    ) as Dropdown_grouping;
    return savedState ?? "status";
  });
  const [ordering, setOrdering] = useState<Dropdown_ordering>(() => {
    const savedState = localStorage.getItem(
      "appContext_ordering"
    ) as Dropdown_ordering;
    return savedState ?? "priority";
  });
  const [statusIcon, setStatusIcon] = useState(false);
  const [priorityIcon, setPriorityIcon] = useState(true);
  const [avatar, setAvatar] = useState(true);

  useEffect(() => {
    localStorage.setItem("appContext_grouping", grouping);
  }, [grouping]);
  useEffect(() => {
    localStorage.setItem("appContext_ordering", ordering);
  }, [ordering]);

  return (
    <KanbanContext.Provider
      value={{
        grouping,
        ordering,
        setGrouping,
        setOrdering,
        setPriorityIcon,
        setStatusIcon,
        setAvatar,
        priorityIcon,
        avatar,
        statusIcon,
      }}
    >
      <Header />
      <Section tickets={data.tickets} />
    </KanbanContext.Provider>
  );
}

function App() {
  const [data, setData] = useState<DataModel>();

  useEffect(() => {
    fetchData(API).then((d) => setData(d));
  }, []);
  if (!data) return <div>LOADING</div>;

  return (
    <>
      <div>
        <Main data={data} />
      </div>
    </>
  );
}

export default App;
