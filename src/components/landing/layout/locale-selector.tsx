"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

export interface LocaleSelectorProps {
  onLocaleChange: (locale: "EN" | "AR") => void;
  iconOnly?: boolean;
}

export function LocaleSelector({ onLocaleChange, iconOnly = false }: LocaleSelectorProps) {
  const currentLocale = useLocale().toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {iconOnly ? (
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-primary-100/30">
            <Globe className="h-5 w-5 text-foreground" />
            <span className="sr-only">Change Language</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-foreground hover:text-primary-700 hover:bg-primary-100/30 focus-visible:ring-primary-500 px-2 py-1"
          >
            <Globe className="h-5 w-5 text-foreground" />
            <span className="text-xs font-bold uppercase text-foreground">{currentLocale}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 bg-white rounded-xl border border-gray-100 shadow-lg p-1 space-y-1"
      >
        <DropdownMenuItem
          onClick={() => onLocaleChange("EN")}
          className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
            currentLocale === "EN"
              ? "bg-secondary-100/50 text-foreground font-bold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          disabled={currentLocale === "EN"}
        >
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLocaleChange("AR")}
          className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
            currentLocale === "AR"
              ? "bg-secondary-100/50 text-foreground font-bold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          disabled={currentLocale === "AR"}
        >
          العربية (AR)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
