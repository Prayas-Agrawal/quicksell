import { createContext } from "react";

export const Dropdown_grouping = ["status", "user", "priority"];

export const Dropdown_ordering = ["priority", "title"];

export type Dropdown_grouping = "status" | "user" | "priority";

export type Dropdown_ordering = "priority" | "title";

export const KanbanContext = createContext<{
  grouping: "status" | "user" | "priority";
  ordering: "priority" | "title";
  setGrouping: React.Dispatch<React.SetStateAction<Dropdown_grouping>>;
  setOrdering: React.Dispatch<React.SetStateAction<Dropdown_ordering>>;
  setStatusIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setPriorityIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<boolean>>;
  statusIcon: boolean;
  priorityIcon: boolean;
  avatar:boolean;
}>({
  grouping: "status",
  ordering: "priority",
  setGrouping: () => {},
  setOrdering: () => {},
  statusIcon: false,
  priorityIcon: true,
  avatar: true,
  setPriorityIcon: () => {},
  setStatusIcon: () => {},
  setAvatar: () => {}
});

export function groupingString(grouping: Dropdown_grouping) {
  const t: Record<Dropdown_grouping, string> = {
    status: "Status",
    user: "User",
    priority: "Priority",
  };
  return t[grouping];
}

export function orderingString(ordering: Dropdown_ordering) {
  const t: Record<Dropdown_ordering, string> = {
    priority: "Priority",
    title: "Title",
  };
  return t[ordering];
}
