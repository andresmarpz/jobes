"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { IconArrowsSplit2, IconCheck, IconProgress, IconTrash } from "@tabler/icons-react";
import type { Application, ApplicationStatus, ApplicationMethod } from "../types";
import { statusConfig, methodLabels } from "./table-columns";
import { useUpdateApplicationMutation, useDeleteApplicationMutation } from "../queries";
import { DeleteApplicationDialog } from "./delete-application-dialog";

const statusOptions: ApplicationStatus[] = [
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn"
];

const methodOptions: ApplicationMethod[] = [
  "cold-email",
  "referral",
  "job-board",
  "linkedin",
  "other"
];

type Props = React.PropsWithChildren<{
  application: Application;
}>;

export default function ApplicationContextMenu({ children, application }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const updateMutation = useUpdateApplicationMutation();
  const deleteMutation = useDeleteApplicationMutation();

  const handleStatusChange = (status: ApplicationStatus) => {
    if (status !== application.status) {
      updateMutation.mutate({ id: application.id, input: { status } });
    }
  };

  const handleMethodChange = (method: ApplicationMethod) => {
    if (method !== application.method) {
      updateMutation.mutate({ id: application.id, input: { method } });
    }
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(application.id);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="w-full" asChild>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48 overflow-y-hidden">
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <IconProgress className="mr-2" /> Status
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {statusOptions.map(status => (
                <ContextMenuItem key={status} onClick={() => handleStatusChange(status)}>
                  <span className="flex-1">{statusConfig[status].label}</span>
                  {application.status === status && <IconCheck className="size-4" />}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <IconArrowsSplit2 className="mr-2" /> Method
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {methodOptions.map(method => (
                <ContextMenuItem key={method} onClick={() => handleMethodChange(method)}>
                  <span className="flex-1">{methodLabels[method]}</span>
                  {application.method === method && <IconCheck className="size-4" />}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <IconTrash className="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteApplicationDialog
        applicationPosition={application.position}
        companyName={application.company}
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
