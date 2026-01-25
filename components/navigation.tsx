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
        <button className="bg-white hover:bg-gray-100 rounded-lg p-3 shadow-lg transition-all hover:scale-110 flex items-center justify-center border border-gray-900">
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cup body */}
            <path d="M6 10H26V28C26 30.2091 24.2091 32 22 32H10C7.79086 32 6 30.2091 6 28V10Z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-black" />
            
            {/* Cup lid */}
            <ellipse cx="16" cy="10" rx="10" ry="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-black" />
            <path d="M8 9.5C8 7 10.69 5 16 5C21.31 5 24 7 24 9.5" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-black" />
            
            {/* Handle */}
            <path d="M26 16C29 16 31 18 31 20.5C31 23 29 25 26 25" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-black" strokeLinecap="round" />
            
            {/* Coffee inside */}
            <path d="M8 16H24V28C24 29.1046 23.1046 30 22 30H10C8.89543 30 8 29.1046 8 28V16Z" fill="currentColor" className="text-yellow-400" />
          </svg>
        </button>
      </Link>
    </>
  )
}
