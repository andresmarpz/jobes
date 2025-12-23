import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Jobes",
  description: "Your personal dashboard to do job tracking the right way."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark bg-background antialiased`}>
        <nav className="border-b">
          <div className="container mx-auto flex h-14 items-center px-4">
            <Link href="/" className="mr-8 font-semibold">
              Jobes
            </Link>
            <div className="flex gap-6">
              <Link
                href="/companies"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Companies
              </Link>
              <Link
                href="/applications"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Applications
              </Link>
              <Link
                href="/tools"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Tools
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
