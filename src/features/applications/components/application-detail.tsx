"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconExternalLink,
  IconPencil,
  IconTrash,
  IconArrowLeft,
  IconDots
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useApplication } from "../hooks/use-applications";
import { DeleteApplicationDialog } from "./delete-application-dialog";
import { EditApplicationDialog } from "./edit-application-dialog";
import { Frame } from "@/components/ui/frame";
import { useIsMounted } from "@/hooks/use-is-mounted";
import type { ApplicationStatus, ApplicationMethod } from "../types";

type ApplicationDetailProps = {
  applicationId: string;
};

const statusConfig: Record<
  ApplicationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  applied: { label: "Applied", variant: "default" },
  screening: { label: "Screening", variant: "secondary" },
  interviewing: { label: "Interviewing", variant: "outline" },
  offer: { label: "Offer", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  withdrawn: { label: "Withdrawn", variant: "secondary" }
};

const methodLabels: Record<ApplicationMethod, string> = {
  "cold-email": "Cold Email",
  referral: "Referral",
  "job-board": "Job Board",
  linkedin: "LinkedIn",
  other: "Other"
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function ApplicationDetail({ applicationId }: ApplicationDetailProps) {
  const router = useRouter();
  const { application, isLoading, error, deleteApplication } = useApplication(applicationId);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted() && application) {
      document.title = `Application — ${application.position} at ${application.company}`;
    }
  }, [application, isMounted]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading application...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-destructive">{error ?? "Application not found"}</p>
        <Button
          variant="outline"
          render={
            <Link href="/applications">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Link>
          }
        ></Button>
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteApplication();
    router.push("/applications");
  };

  const statusInfo = statusConfig[application.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          render={
            <Link href="/applications" className="cursor-default">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          }
        ></Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{application.position}</h1>
          <p className="text-muted-foreground text-lg">{application.company}</p>
        </div>
        <Badge variant={statusInfo.variant} className="text-sm">
          {statusInfo.label}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon">
                <IconDots className="h-4 w-4" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
              <IconPencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => setIsDeleteDialogOpen(true)}>
              <IconTrash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Frame>
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Method</h3>
                <p className="text-foreground mt-1">{methodLabels[application.method]}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Salary</h3>
                <p className="text-foreground mt-1">{application.salary ?? "-"}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Applied On</h3>
                <p className="text-foreground mt-1">{formatDate(application.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Last Updated</h3>
                <p className="text-foreground mt-1">{formatDate(application.updatedAt)}</p>
              </div>
            </div>

            {application.relevantUrl && (
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Job Posting</h3>
                <a
                  href={application.relevantUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  <IconExternalLink className="h-4 w-4" />
                  {application.relevantUrl}
                </a>
              </div>
            )}

            {application.notes && (
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Notes</h3>
                <p className="text-foreground/90 mt-1 whitespace-pre-wrap">{application.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Frame>

      <DeleteApplicationDialog
        applicationPosition={application.position}
        companyName={application.company}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />

      <EditApplicationDialog
        application={application}
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      />
    </div>
  );
}
