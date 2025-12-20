"use client";

import Link from "next/link";
import { useCompanies } from "@/features/companies/hooks/use-companies";
import { toolCategories } from "./tools/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { companies, isLoading } = useCompanies();

  const totalContacts = companies.reduce(
    (sum, company) => sum + company.contacts.length,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>

      <div className="grid gap-8">
        {/* Companies Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Companies</h2>
            <Link href="/companies">
              <Button variant="outline" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Companies</CardDescription>
                <CardTitle className="text-4xl">
                  {isLoading ? "..." : companies.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Contacts</CardDescription>
                <CardTitle className="text-4xl">
                  {isLoading ? "..." : totalContacts}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Contacts per Company</CardDescription>
                <CardTitle className="text-4xl">
                  {isLoading
                    ? "..."
                    : companies.length > 0
                    ? (totalContacts / companies.length).toFixed(1)
                    : "0"}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Applications Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link href="/applications">
              <Button variant="outline" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                No applications yet. Start tracking your job applications!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tools Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tools</h2>
            <Link href="/tools">
              <Button variant="outline" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              {toolCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm" className="gap-2">
                          <span className="size-4 shrink-0 [&>svg]:size-4">
                            {tool.icon}
                          </span>
                          {tool.name}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
