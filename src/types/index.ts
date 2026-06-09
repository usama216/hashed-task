export type UserStatus = "active" | "inactive";

export type UserRole = "admin" | "editor" | "member";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role?: UserRole;
  status?: UserStatus;
  createdAt?: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserMeta {
  role: UserRole;
  status: UserStatus;
}

export interface DashboardStats {
  total: number;
  active: number;
  inactive: number;
  newUsers: number;
}
