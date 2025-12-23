import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-2xl py-12">
      <h1 className="mb-12 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        About Jobes
      </h1>

      <div className="text-muted-foreground space-y-6 text-sm leading-relaxed">
        <p>
          I created Jobes as personal software to help me stay organized during my own job search.
          Crafting my own tools is a joy, and it motivates me much more. I believe this is useful,
          so I decided to share with the world too.
        </p>

        <p>
          For now, Jobes is a simple application focused on the essentials. I&apos;ll be adding more
          features as I use it and discover what&apos;s actually helpful in practice.
        </p>

        <p>
          Jobes is also open-source, so you can contribute anytime if you want to. The repository is
          hosted on{" "}
          <Link href="https://github.com/andresmarpz/jobes" className="text-primary">
            GitHub
          </Link>
          . You can also reach me at{" "}
          <Link href="https://andrs.me" className="text-primary">
            andrs.me
          </Link>
          . 👋🏼
        </p>
      </div>
    </main>
  );
}
