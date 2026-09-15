import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-slate-900">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <defs>
            <linearGradient id="app-logo-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="url(#app-logo-ring)"
            strokeWidth="2.5"
          />
          <path
            d="m8 12.5 2.8 2.8 5.7-5.8"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="bg-linear-to-r from-[#3b4fd8] to-[#6d4fd8] bg-clip-text text-xl font-bold tracking-tight text-transparent">
        ModMatch
      </span>
    </div>
  );
}
