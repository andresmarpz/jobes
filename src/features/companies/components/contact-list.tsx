"use client";

import { useState } from "react";
import { IconExternalLink, IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import type { Contact, CreateContactInput } from "../types";
import { ContactForm } from "./contact-form";
import { Frame } from "@/components/ui/frame";

type ContactListProps = {
  contacts: Contact[];
  onAdd: (input: CreateContactInput) => Promise<unknown>;
  onUpdate: (id: string, input: Partial<CreateContactInput>) => Promise<unknown>;
  onRemove: (id: string) => Promise<void>;
};

export function ContactList({ contacts, onAdd, onUpdate, onRemove }: ContactListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleAdd = async (data: CreateContactInput) => {
    await onAdd(data);
    setIsAddDialogOpen(false);
  };

  const handleUpdate = async (data: CreateContactInput) => {
    if (editingContact) {
      await onUpdate(editingContact.id, data);
      setEditingContact(null);
    }
  };

  const handleRemove = async (id: string) => {
    if (confirm("Are you sure you want to remove this contact?")) {
      await onRemove(id);
    }
  };

  return (
    <Frame>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contacts</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger
              render={
                <Button size="sm">
                  <IconPlus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              }
            ></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
              </DialogHeader>
              <ContactForm onSubmit={handleAdd} onCancel={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center">
              No contacts yet. Add your first contact.
            </p>
          ) : (
            <div className="space-y-4">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-muted-foreground text-sm">{contact.role}</div>
                    <div className="text-muted-foreground text-sm">{contact.country}</div>
                    {contact.linkedinUrl && (
                      <a
                        href={contact.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
                      >
                        <IconExternalLink className="h-3 w-3" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      open={editingContact?.id === contact.id}
                      onOpenChange={open => setEditingContact(open ? contact : null)}
                    >
                      <DialogTrigger
                        render={
                          <Button variant="ghost" size="icon">
                            <IconPencil className="h-4 w-4" />
                          </Button>
                        }
                      ></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Contact</DialogTitle>
                        </DialogHeader>
                        <ContactForm
                          defaultValues={{
                            name: contact.name,
                            role: contact.role,
                            linkedinUrl: contact.linkedinUrl ?? "",
                            country: contact.country
                          }}
                          onSubmit={handleUpdate}
                          onCancel={() => setEditingContact(null)}
                          submitLabel="Save Changes"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(contact.id)}>
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Frame>
  );
}
