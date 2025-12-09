"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle, Info, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Calculator", icon: null },
    { href: "/how-it-works", label: "How It Works", icon: Info },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  const currentPage = links.find((link) => link.href === pathname) || links[0]
  const otherPages = links.filter((link) => link.href !== pathname)
  const CurrentIcon = currentPage.icon

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span>Schengen Monitor</span>
          </Link>

          {/* Desktop tabs - hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile dropdown - hidden on desktop */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  {CurrentIcon && <CurrentIcon className="h-4 w-4" />}
                  {currentPage.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {otherPages.map((link) => {
                  const Icon = link.icon
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
