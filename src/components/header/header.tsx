import { useContext, useState } from "react";
import "./style.css";
import {
  Dropdown_grouping,
  Dropdown_ordering,
  groupingString,
  KanbanContext,
  orderingString,
} from "../../helpers/contexts";
import { DisplayButton } from "../buttons/display";
import { SubDropdown } from "../dropdown/dropdown";

export function Header() {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [isOrderingOpen, setIsOrderingOpen] = useState(false);
  const {
    grouping,
    ordering,
    setGrouping,
    setOrdering,
    setStatusIcon,
    setPriorityIcon,
    setAvatar,
  } = useContext(KanbanContext);
  const toggleDisplayDropdown = () => {
    setIsDisplayOpen(!isDisplayOpen);
    setIsGroupingOpen(false);
    setIsOrderingOpen(false);
  };

  const toggleSubDropdown = (type: "grouping" | "ordering") => {
    if (type === "grouping") {
      setIsGroupingOpen(!isGroupingOpen);
      setIsOrderingOpen(false);
    } else {
      setIsOrderingOpen(!isOrderingOpen);
      setIsGroupingOpen(false);
    }
  };

  const handleSelection = (type: "grouping" | "ordering", value: string) => {
    if (type === "grouping") setGrouping(value as Dropdown_grouping);
    else setOrdering(value as Dropdown_ordering);

    setIsGroupingOpen(false);
    setIsOrderingOpen(false);
    setIsDisplayOpen(false);

    if (type == "ordering") return;
    if ((value as Dropdown_grouping) == "status") {
      setStatusIcon(false);
      setPriorityIcon(true);
      setAvatar(true);
    } else if ((value as Dropdown_grouping) == "priority") {
      setPriorityIcon(false);
      setStatusIcon(true);
      setAvatar(true);
    } else if ((value as Dropdown_grouping) == "user") {
      setPriorityIcon(true);
      setStatusIcon(true);
      setAvatar(false);
    } else {
      setPriorityIcon(true);
      setStatusIcon(true);
      setAvatar(true);
    }
  };

  return (
    <div className="header-container">
      <DisplayButton handler={toggleDisplayDropdown} />
      {isDisplayOpen && (
        <div className="dropdown-menu">
          <div className="sub-container">
            Grouping
            <SubDropdown
              title={groupingString(grouping)}
              items={Dropdown_grouping}
              formatter={(v) => groupingString(v as Dropdown_grouping)}
              isOpen={isGroupingOpen}
              toggle={() => toggleSubDropdown("grouping")}
              onSelect={(v) =>
                handleSelection("grouping", v as Dropdown_grouping)
              }
            />
          </div>

          <div className="sub-container">
            Ordering
            <SubDropdown
              title={orderingString(ordering)}
              items={Dropdown_ordering}
              isOpen={isOrderingOpen}
              formatter={(v) => orderingString(v as Dropdown_ordering)}
              toggle={() => toggleSubDropdown("ordering")}
              onSelect={(v) =>
                handleSelection("ordering", v as Dropdown_ordering)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
