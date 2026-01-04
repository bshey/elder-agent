"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ModuleButtonProps {
    title: string;
    icon: React.ReactNode;
    href: string;
    variant: "health" | "daily" | "people" | "services" | "home" | "help";
    className?: string;
    delay?: number;
}

export function ModuleButton({
    title,
    icon,
    href,
    variant,
    className,
    delay = 0,
}: ModuleButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                "module-button animate-scale-in opacity-0",
                `module-${variant}`,
                className
            )}
            style={{ animationDelay: `${delay * 0.05}s` }}
        >
            <span className="icon">{icon}</span>
            <span className="text-center leading-tight">{title}</span>
        </Link>
    );
}
