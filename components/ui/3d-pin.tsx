"use client";
import React from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <Link
      href={href || "/"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "relative group/pin block cursor-pointer select-none w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "relative rounded-2xl p-4 sm:p-5",
          "bg-[#0e1026]/90 backdrop-blur-md",
          "border border-white/[0.08]",
          "shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:scale-[1.015]",
          "hover:border-purple-500/40",
          "hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(168,85,247,0.15)]",
          "motion-reduce:transform-none motion-reduce:transition-none",
          "overflow-hidden",
          className
        )}
      >
        {/* Subtle top border highlight that glows slightly on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Subtle radial glow background on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.04] via-purple-500/[0.02] to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">{children}</div>
      </div>

      {title && <PinPerspective title={title} href={href} />}
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  if (!title) return null;

  let displayTitle = title;
  try {
    if (title.startsWith("http://") || title.startsWith("https://")) {
      const url = new URL(title);
      if (url.hostname.includes("github.com")) {
        displayTitle = url.pathname.replace(/^\//, "");
      } else {
        displayTitle = url.hostname.replace("www.", "") + url.pathname;
      }
      if (displayTitle.length > 30) {
        displayTitle = displayTitle.slice(0, 30) + "...";
      }
    }
  } catch {
    // keep as is
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 z-30",
        "opacity-0 group-hover/pin:opacity-100",
        "transition-all duration-300 ease-out",
        "group-hover/pin:-translate-y-1",
        "motion-reduce:transform-none motion-reduce:transition-none"
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0d1b]/95 border border-white/[0.15] shadow-lg backdrop-blur-md whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-mono text-slate-300 font-medium tracking-tight">
          {displayTitle}
        </span>
      </div>
    </div>
  );
};
