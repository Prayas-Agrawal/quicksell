import { useContext } from "react";
import { ICONS, ICONS_PRIORITY_COLOR, ICONS_STATUS } from "../../consts/icons";
import { num2priority, status, Ticket } from "../../helpers/data";
import { Card } from "../card/card";
import { Avatar, Icon } from "../icon/icon";
import "./style.css";
import {
  Dropdown_grouping,
  Dropdown_ordering,
  KanbanContext,
} from "../../helpers/contexts";
import { get_avatar_url } from "../icon/helper";

interface SectionProps {
  tickets: Ticket[];
}

interface HeaderProps {
  grouping_key: status | number | string;
  tickets: Ticket[];
  grouping: Dropdown_grouping;
}

function SectionHeaderButtons() {
  return (
    <div className="buttons">
      <Icon url={ICONS.add} />
      <Icon url={ICONS.menu} />
    </div>
  );
}

function Header({ grouping_key, tickets, grouping }: HeaderProps) {
  let icon = null;
  if (grouping == "status") icon = ICONS_STATUS[grouping_key as status];
  if (grouping == "priority")
    icon = ICONS_PRIORITY_COLOR[grouping_key as number];
  if (grouping == "user") icon = get_avatar_url(tickets.length > 0 ? tickets[0].userId : null);
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

function group_tickets(
  tickets: Ticket[],
  grouping: Dropdown_grouping,
  ordering: Dropdown_ordering
) {
  const compare = (a: Ticket, b: Ticket) => {
    if (ordering == "priority") {
      let _a = a.priority;
      let _b = b.priority;
      if (_a < _b) {
        return 1;
      }
      if (_a > _b) {
        return -1;
      }
      return 0;
    } else {
      let _a = a.title;
      let _b = b.title;
      if (_a < _b) {
        return -1;
      }
      if (_a > _b) {
        return 1;
      }
      return 0;
    }
  };
  const reduced = tickets.reduce<Record<string | status | number, Ticket[]>>(
    (acc, ticket) => {
      let key: any = ticket.status;
      if (grouping == "priority") key = ticket.priority;
      else if (grouping == "status") key = ticket.status;
      else if (grouping == "user") key = ticket.userId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      acc[key].sort(compare);
      return acc;
    },
    {}
  );

  return reduced;
}

export function Section({ tickets }: SectionProps) {
  const { grouping, ordering } = useContext(KanbanContext);

  const groupedTickets = group_tickets(tickets, grouping, ordering);

  return (
    <section>
      <div className="scrollable">
        <div className="sections-container">
          {Object.entries(groupedTickets).map(([status, tickets]) => (
            <div className="section" key={status}>
              <Header
                grouping_key={status}
                tickets={tickets}
                grouping={grouping}
              />

              <div className="cards-container">
                {tickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    user={ticket.user}
                    priority={ticket.priority}
                    tags={ticket.tag}
                    status={ticket.status}
                    userAvatarUrl={get_avatar_url(ticket.userId)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section;
