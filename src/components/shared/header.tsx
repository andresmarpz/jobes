"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string }[] = [
  { href: "/companies", label: "Companies" },
  {
    href: "/applications",
    label: "Applications"
  },
  {
    href: "/tools",
    label: "Tools"
  }
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <nav>
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="flex items-center">
            <Link href="/about" className="mr-8 font-semibold">
              Jobes
            </Link>
            <div className="flex gap-6">
              {links.map(link => (
                <Link
                  key={`headl_${link.label}`}
                  href={link.href}
                  className={cn(
                    "text-muted-foreground hover:text-foreground text-sm transition-colors",
                    pathname.includes(link.href) && "text-zinc-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}
