"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input bg-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ring-ring focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border bg-clip-padding shadow-xs transition-shadow outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[3px] not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-offset-1 data-disabled:opacity-64 sm:size-4 dark:bg-clip-border dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="text-primary-foreground data-[state=checked]:bg-primary data-indeterminate:text-foreground absolute -inset-px flex items-center justify-center rounded-[4px] data-unchecked:hidden"
      >
        <IconCheck className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
