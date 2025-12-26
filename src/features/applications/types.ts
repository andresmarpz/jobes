export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interviewing"
  | "offer"
  | "rejected"
  | "withdrawn";

export type ApplicationMethod = "cold-email" | "referral" | "job-board" | "linkedin" | "other";

export type Application = {
  id: string;
  position: string;
  company: string;
  companyId: string;
  status: ApplicationStatus;
  relevantUrl: string | null;
  method: ApplicationMethod;
  salary: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateApplicationInput = Omit<
  Application,
  "id" | "companyId" | "createdAt" | "updatedAt"
>;

export type UpdateApplicationInput = Partial<CreateApplicationInput>;

export type SortDirection = "asc" | "desc";

export type SortConfig = {
  column: keyof Application;
  direction: SortDirection;
};
