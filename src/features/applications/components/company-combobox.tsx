"use client";

import { useState, useMemo } from "react";
import { IconCheck, IconSelector, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCompaniesQuery } from "@/features/companies/queries";
import { CompanyIcon } from "@/features/companies/components/company-icon";
import { cn } from "@/lib/utils";

interface CompanyComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function CompanyCombobox({ value, onChange }: CompanyComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: companies = [] } = useCompaniesQuery();

  const filteredCompanies = useMemo(() => {
    if (!search.trim()) return companies;
    const normalizedSearch = search.toLowerCase().trim();
    return companies.filter(company => company.name.toLowerCase().includes(normalizedSearch));
  }, [companies, search]);

  const hasExactMatch = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    return companies.some(company => company.name.toLowerCase() === normalizedSearch);
  }, [companies, search]);

  const showCreateOption = search.trim() !== "" && !hasExactMatch;

  const selectedCompany = useMemo(() => {
    if (!value) return null;
    return companies.find(c => c.name === value) ?? null;
  }, [companies, value]);

  const handleSelect = (companyName: string) => {
    onChange(companyName);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedCompany ? (
            <span className="flex items-center gap-2">
              <CompanyIcon iconUrls={selectedCompany.iconUrls} size={16} />
              {selectedCompany.name}
            </span>
          ) : (
            <span className={cn("text-muted-foreground", value && "text-foreground")}>
              {value || "Select company..."}
            </span>
          )}
          <IconSelector className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search companies..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {filteredCompanies.map(company => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={() => handleSelect(company.name)}
                  className="justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CompanyIcon iconUrls={company.iconUrls} size={16} />
                    {company.name}
                  </span>
                  {value === company.name && <IconCheck className="size-4" />}
                </CommandItem>
              ))}
              {showCreateOption && (
                <CommandItem value={`create-${search}`} onSelect={() => handleSelect(search.trim())}>
                  <IconPlus className="mr-2 size-4" />
                  Create &quot;{search.trim()}&quot;
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
