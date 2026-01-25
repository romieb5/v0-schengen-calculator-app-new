"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle, Info, ChevronDown, Coffee } from "lucide-react"
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
    <>
      <nav className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <span>Schengen Monitor</span>
              </Link>
              {/* Buy Me a Coffee button next to title - hidden on mobile */}
              <Link
                href="https://www.buymeacoffee.com/romieb"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex"
              >
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=romieb&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"
                  alt="Buy me a coffee"
                  height="37"
                  className="h-9 w-auto"
                />
              </Link>
            </div>

            {/* Desktop tabs - right aligned */}
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

      {/* Floating Buy Me a Coffee button for mobile and tablet - hidden on desktop */}
      <Link
        href="https://www.buymeacoffee.com/romieb"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:hidden z-50"
        title="Support me on Buy Me a Coffee"
      >
        <button className="bg-white rounded-full p-2 hover:scale-110 transition-transform flex items-center justify-center shadow-lg">
          <img
            src="/buy-me-coffee-icon.webp"
            alt="Buy me a coffee"
            className="h-8 w-8"
          />
        </button>
      </Link>
    </>
  )
}
