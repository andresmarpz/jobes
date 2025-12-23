import Link from "next/link";

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
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </span>
          <span>
            {/* <Link href="/about">
              <div className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
                <IconQuestionMark />
              </div>
            </Link> */}
          </span>
        </div>
      </nav>
    </header>
  );
}
