"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle, Info, ChevronDown, LogIn, LogOut, User, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function Navigation() {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading: authLoading, signOut } = useAuth()

  const links = [
    { href: "/", label: "Calculator", icon: null },
    { href: "/how-it-works", label: "How It Works", icon: null },
    { href: "/faq", label: "FAQ", icon: null },
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
              {!authLoading && (
                isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-2 gap-2">
                        <User className="h-4 w-4" />
                        {user?.name || user?.email}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-muted-foreground text-xs cursor-default">
                        {user?.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                          <Settings className="h-4 w-4" />
                          Account Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/sign-in">
                    <Button variant="outline" className="ml-2">
                      Log In
                    </Button>
                  </Link>
                )
              )}
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
                  {!authLoading && (
                    <>
                      <DropdownMenuSeparator />
                      {isAuthenticated ? (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              Account Settings
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href="/sign-in" className="flex items-center gap-2 cursor-pointer">
                            <LogIn className="h-4 w-4" />
                            Log In
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
