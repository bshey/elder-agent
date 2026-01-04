"use client";

import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    as?: "div" | "button";
}

export function Card({
    children,
    className,
    onClick,
    as = "div",
}: CardProps) {
    const Component = as;

    return (
        <Component
            className={cn(
                "glass-card p-5",
                onClick && "cursor-pointer hover:border-primary-500/50 transition-colors",
                className
            )}
            onClick={onClick}
        >
            {children}
        </Component>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-4", className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn("text-xl font-semibold", className)}>
            {children}
        </h3>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn("space-y-3", className)}>
            {children}
        </div>
    );
}
