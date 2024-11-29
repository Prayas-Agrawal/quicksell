import {
  ICONS,
  ICONS_PRIORITY_COLOR,
  ICONS_STATUS,
} from "../../../../consts/icons";
import {
  Dropdown_grouping,
  Dropdown_ordering,
} from "../../../../helpers/contexts";
import { num2priority, Ticket, status } from "../../../../helpers/data";
import { get_avatar_url } from "../../../icon/helper";
import { Avatar, Icon } from "../../../icon/icon";

function SectionHeaderButtons() {
  return (
    <div className="buttons">
      <Icon url={ICONS.add} />
      <Icon url={ICONS.menu} />
    </div>
  );
}

interface HeaderProps {
  grouping_key: status | number | string;
  tickets: Ticket[];
  grouping: Dropdown_grouping | Dropdown_ordering;
}
export function Header({ grouping_key, tickets, grouping }: HeaderProps) {
  let icon = null;
  if (grouping == "status") icon = ICONS_STATUS[grouping_key as status];
  if (grouping == "priority")
    icon = ICONS_PRIORITY_COLOR[grouping_key as number];
  if (grouping == "user")
    icon = get_avatar_url(tickets.length > 0 ? tickets[0].userId : null);
  let title = grouping_key;
  if (grouping == "user") title = tickets[0].user.name;
  else if (grouping == "priority") title = num2priority(grouping_key as number);
  return (
    <div className="section-header">
      <div className="left">
        {grouping == "user" ? <Avatar url={icon!} /> : <Icon url={icon!} />}
        {title} <span className="ticket-count">{tickets.length}</span>
      </div>
      <div className="right">
        <SectionHeaderButtons />
      </div>
    </div>
  );
}
