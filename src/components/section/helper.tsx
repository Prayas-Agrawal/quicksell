import { Dropdown_grouping, Dropdown_ordering } from "../../helpers/contexts";
import { status, Ticket } from "../../helpers/data";

export function group_tickets(
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
