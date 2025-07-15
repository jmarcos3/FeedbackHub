// src/components/FeedbackHubLogo.tsx
export function FeedbackHubLogo() {
  return (
    <div className="flex flex-col items-center mb-8 group">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="p-2 rounded-xl bg-blue-100/30 dark:bg-blue-900/20 group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/30 transition-all duration-300 animate-float">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 drop-shadow-[0_2px_1px_rgba(59,130,246,0.3)]"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <polyline points="9 11 11.5 13.5 15 10" />
          </svg>
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300 tracking-tight">
          FeedbackHub
        </span>
      </div>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80 group-hover:w-20 transition-all duration-500"></div>
    </div>
  )
}