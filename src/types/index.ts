export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "support";
  avatar?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  userId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  attachments?: Attachment[];
  comments?: Comment[];
}

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory =
  | "access_issue"
  | "system_error"
  | "feature_request"
  | "other";

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
  isInternal?: boolean;
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "support";
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  createdAt: Date;
  isRead: boolean;
}
