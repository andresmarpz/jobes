import type { ApplicationStatus, ApplicationMethod } from "./types"

export const APPLICATION_STATUSES: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  screening: {
    label: "Screening",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  interview: {
    label: "Interview",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  offer: {
    label: "Offer",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
}

export const APPLICATION_METHODS: Record<ApplicationMethod, { label: string }> = {
  cold_email: { label: "Cold Email" },
  contact_referral: { label: "Contact Referral" },
  ats_application: { label: "ATS Application" },
  recruiter_outreach: { label: "Recruiter Outreach" },
  linkedin_easy_apply: { label: "LinkedIn Easy Apply" },
  other: { label: "Other" },
}

export const APPLICATION_STATUS_OPTIONS = Object.entries(APPLICATION_STATUSES).map(
  ([value, { label }]) => ({ value, label })
)

export const APPLICATION_METHOD_OPTIONS = Object.entries(APPLICATION_METHODS).map(
  ([value, { label }]) => ({ value, label })
)
