import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ============================================
// BUTTON COMPONENT with class-variance-authority
// ============================================
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/30",
                outline: "border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400",
                ghost: "text-white hover:bg-white/10",
                glow: "bg-transparent border border-cyan-500/50 text-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:border-cyan-400",
                secondary: "bg-gray-800/80 text-white hover:bg-gray-700/80 border border-white/10",
                destructive: "bg-red-500/80 text-white hover:bg-red-600/80",
            },
            size: {
                default: "h-11 px-6 py-2 text-sm",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// ============================================
// CARD COMPONENTS
// ============================================
const cardVariants = cva(
    "rounded-2xl border transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-black/40 border-white/10 hover:border-cyan-500/30",
                glass: "bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30",
                glow: "bg-black/60 border-cyan-500/20 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] hover:border-cyan-500/40",
                solid: "bg-gray-900 border-gray-800 hover:border-cyan-500/30",
            },
        },
        defaultVariants: {
            variant: "glass",
        },
    }
);

interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn("text-xl font-semibold text-cyan-400", className)} {...props} />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn("text-sm text-gray-400", className)} {...props} />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    )
);
CardFooter.displayName = "CardFooter";

// ============================================
// BADGE COMPONENT
// ============================================
const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
                secondary: "bg-gray-700/50 text-gray-300 border border-gray-600/50",
                success: "bg-green-500/20 text-green-400 border border-green-500/30",
                warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
                destructive: "bg-red-500/20 text-red-400 border border-red-500/30",
                outline: "border border-cyan-500/50 text-cyan-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => (
        <div ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
    )
);
Badge.displayName = "Badge";

// ============================================
// INPUT COMPONENT
// ============================================
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

// ============================================
// TEXTAREA COMPONENT
// ============================================
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

// ============================================
// SEPARATOR COMPONENT
// ============================================
const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent", className)}
            {...props}
        />
    )
);
Separator.displayName = "Separator";

export {
    Button,
    buttonVariants,
    Card,
    cardVariants,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Badge,
    badgeVariants,
    Input,
    Textarea,
    Separator,
};
