export type AccountUserRole = "CUSTOMER" | "ADMIN";

export interface RegisterAdminInput {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterAdminOutput {
  id: string; // data-from: AccountUser-id
  email: string; // data-from: AccountUser-email
  fullName: string; // data-from: AccountUser-fullName
  role: AccountUserRole; // data-from: AccountUser-role
  createdAt: Date; // data-from: AccountUser-createdAt
}

export interface AdminRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3;
  label: string;
  feedback: string;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";