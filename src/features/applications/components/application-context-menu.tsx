"use client";

import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup
} from "@/components/ui/command";
import {
  IconArrowsSplit2,
  IconCheck,
  IconCurrencyDollar,
  IconProgress,
  IconTrash,
  IconX
} from "@tabler/icons-react";
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

type Props = {
  application: Application;
  children: React.ReactElement;
};

export default function ApplicationContextMenu({ children, application }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [salaryDialogOpen, setSalaryDialogOpen] = useState(false);
  const [salaryInput, setSalaryInput] = useState("");
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

  const handleOpenSalaryDialog = () => {
    setSalaryInput(application.salary ?? "");
    setSalaryDialogOpen(true);
  };

  const handleSalaryDialogClose = (open: boolean) => {
    if (!open) {
      setSalaryInput("");
    }
    setSalaryDialogOpen(open);
  };

  const handleSetSalary = () => {
    const trimmedSalary = salaryInput.trim();
    if (trimmedSalary !== (application.salary ?? "")) {
      updateMutation.mutate({
        id: application.id,
        input: { salary: trimmedSalary || null }
      });
    }
    setSalaryDialogOpen(false);
    setSalaryInput("");
  };

  const handleCancelSalary = () => {
    setSalaryDialogOpen(false);
    setSalaryInput("");
  };

  return (
    <>
      <Dialog open={salaryDialogOpen} onOpenChange={handleSalaryDialogClose}>
        <ContextMenu>
          <ContextMenuTrigger render={props => React.cloneElement(children, props)} />
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
            <ContextMenuItem onClick={handleOpenSalaryDialog}>
              <IconCurrencyDollar className="size-4" />
              Edit salary
            </ContextMenuItem>
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
        <DialogContent showCloseButton={false} className="max-w-sm gap-0 p-0">
          <DialogHeader className="hidden px-4 pt-4 pb-2">
            <DialogTitle>Edit Salary</DialogTitle>
          </DialogHeader>
          <Command shouldFilter={false} className="border-t">
            <CommandInput
              placeholder="Enter salary..."
              value={salaryInput}
              onValueChange={setSalaryInput}
            />
            <CommandList>
              <CommandGroup>
                <CommandItem onSelect={handleSetSalary}>
                  <IconCheck className="mr-2 size-4" />
                  Set salary to {salaryInput.trim() ? `"${salaryInput.trim()}"` : "(empty)"}
                </CommandItem>
                <CommandItem onSelect={handleCancelSalary}>
                  <IconX className="mr-2 size-4" />
                  Cancel
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
