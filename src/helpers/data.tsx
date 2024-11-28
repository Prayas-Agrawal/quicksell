import { Dropdown_grouping } from "./contexts";

export type status = "In progress" | "Backlog" | "Todo";

export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: status;
  priority: number;
  user: User;
}

interface User {
  id: string;
  name: string;
  available: boolean;
}

export class DataModel {
  tickets: Ticket[];
  users: User[];

  constructor(tickets: Ticket[], users: User[]) {
    this.tickets = tickets;
    const _users = users.reduce<Record<string, User>>((prev, user) => {
      prev[user.id] = user;
      return prev;
    }, {});
    this.tickets.map((ticket) => {
      ticket.user = _users[ticket.userId];
    });
    this.users = users;
  }
}

export interface CardModel {
  id: string;
  user: User;
  title: string;
  tags: string[];
  status: status;
  priority: number;
  userAvatarUrl: string;
}

export function num2priority(priority: number) {
  return ["No Priority", "Low", "Medium", "High", "Urgent"][priority];
}

