import { useContext } from "react";
import { Ticket } from "../../helpers/data";
import { Card } from "../card/card";
import "./style.css";
import { KanbanContext } from "../../helpers/contexts";
import { get_avatar_url } from "../icon/helper";
import { group_tickets } from "./helper";
import { Header } from "./components/header/header";

interface SectionProps {
  tickets: Ticket[];
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
