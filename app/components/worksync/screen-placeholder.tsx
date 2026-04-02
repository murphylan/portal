"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScreenPlaceholderProps {
  title: string;
  description?: string;
  imageSrc?: string;
  className?: string;
  variant?: "laptop" | "browser";
}

export default function ScreenPlaceholder({
  title,
  description,
  imageSrc,
  className,
  variant = "browser",
}: ScreenPlaceholderProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-xl border border-gray-200/60 bg-white shadow-2xl shadow-black/10 dark:border-gray-700/40 dark:bg-gray-900 overflow-hidden">
        {/* Browser / Laptop toolbar */}
        <div
          className={cn(
            "flex items-center gap-2 px-4 border-b border-gray-200/60 dark:border-gray-700/40 bg-gray-50/80 dark:bg-gray-800/60",
            variant === "laptop" ? "py-2" : "py-2.5",
          )}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <div className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          {variant === "browser" && (
            <div className="flex-1 mx-8">
              <div className="h-6 rounded-md bg-gray-200/80 dark:bg-gray-700/60 max-w-md mx-auto flex items-center justify-center">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-wider">
                  worksync.app
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Screen content */}
        {imageSrc ? (
          <div className="relative aspect-16/10">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
            />
          </div>
        ) : (
          <div className="aspect-16/10 bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 flex flex-col items-center justify-center p-8">
            <div className="mb-4 h-16 w-16 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">W</span>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {title}
            </p>
            {description && (
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-sm">
                {description}
              </p>
            )}
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-300 dark:text-gray-600">
              <div className="h-px w-8 bg-gray-300 dark:bg-gray-600" />
              <span>截图待替换</span>
              <div className="h-px w-8 bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
