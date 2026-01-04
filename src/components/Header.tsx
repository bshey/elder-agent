"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    title: string;
    showBack?: boolean;
    showHome?: boolean;
    backHref?: string;
    className?: string;
}

export function Header({
    title,
    showBack = true,
    showHome = true,
    backHref,
    className,
}: HeaderProps) {
    return (
        <header className={cn("status-bar", className)}>
            <div className="flex items-center gap-3">
                {showBack && (
                    <Link
                        href={backHref || "/"}
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-700/50 hover:bg-secondary-600/50 transition-colors"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                )}
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>

            {showHome && (
                <Link
                    href="/"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-700/50 hover:bg-secondary-600/50 transition-colors"
                    aria-label="Go to home"
                >
                    <Home className="w-6 h-6" />
                </Link>
            )}
        </header>
    );
}
