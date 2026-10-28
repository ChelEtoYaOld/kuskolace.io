export type AccountUserRole = "CUSTOMER" | "ADMIN";

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminLoginOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: AccountUserRole; // data-from: AccountUser-role
}

export interface AdminLoginFormValues {
  email: string;
  password: string;
}

export interface AdminLoginValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface AdminLoginSecurityMeta {
  roleBadge: string;
  locationStamp: string;
  systemSubtext: string;
  securityNotice: string;
}