import { status } from "../helpers/data";

export const ICONS = {
  menu: "3 dot menu.svg",
  add: "add.svg",
  backlog: "Backlog.svg",
  cancel: "Cancelled.svg",
  display: "Display.svg",
  done: "Done.svg",
  down: "down.svg",
  highP: "Img - High Priority.svg",
  lowP: "Img - Low Priority.svg",
  mediumP: "Img - Medium Priority.svg",
  inProgress: "in-progress.svg",
  noP: "No-priority.svg",
  urgentPCol: "SVG - Urgent Priority colour.svg",
  urgentPGrey: "SVG - Urgent Priority grey.svg",
  todo: "To-do.svg",
};

export const ICONS_PRIORITY: Record<number, string> = {
  0: ICONS.noP,
  1: ICONS.lowP,
  2: ICONS.mediumP,
  3: ICONS.highP,
  4: ICONS.urgentPGrey,
};

export const ICONS_PRIORITY_COLOR: Record<number, string> = {
  0: ICONS.noP,
  1: ICONS.lowP,
  2: ICONS.mediumP,
  3: ICONS.highP,
  4: ICONS.urgentPCol,
};

export const ICONS_STATUS: Record<status, string> = {
  "In progress": ICONS.inProgress,
  Backlog: ICONS.backlog,
  Todo: ICONS.todo,
};
