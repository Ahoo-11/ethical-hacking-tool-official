import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Database,
  Settings,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    {
      title: "Database",
      icon: Database,
      href: "/database",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed lg:relative z-30 flex h-screen flex-col justify-between glass-morphism",
          isOpen ? "w-64" : "w-20",
          isMobile && !isOpen && "hidden",
          "transition-all duration-300 ease-in-out animate-slideIn"
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Shield className="h-8 w-8" />
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform",
                    !isOpen && "rotate-180"
                  )}
                />
              </Button>
            )}
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive && "bg-gray-100 dark:bg-gray-800"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-5 w-5" />
                {isOpen && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                {isOpen && <span>Dark Mode</span>}
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
};