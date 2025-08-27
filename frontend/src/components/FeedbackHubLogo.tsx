import { cn } from '../libs/utils' 
interface FeedbackHubLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLine?: boolean
}

export function FeedbackHubLogo({
  size = 'md',
  className = '',
  showLine = true
}: FeedbackHubLogoProps) {
  const sizes = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-xl',
      line: 'w-12'
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
      line: 'w-16'
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-3xl',
      line: 'w-20'
    }
  }

  return (
    <div className={cn(
      "flex flex-col items-center group",
      className
    )}>
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className={cn(
          "p-2 rounded-xl bg-blue-100/30 dark:bg-blue-900/20",
          "group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/30",
          "transition-all duration-300 animate-float",
          sizes[size].icon
        )}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "text-blue-500 drop-shadow-[0_2px_1px_rgba(59,130,246,0.3)]",
              sizes[size].icon
            )}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <polyline points="9 11 11.5 13.5 15 10" />
          </svg>
        </div>
        <span className={cn(
          "font-bold bg-gradient-to-r from-blue-600 to-blue-500",
          "bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300",
          "tracking-tight",
          sizes[size].text
        )}>
          FeedbackHub
        </span>
      </div>
      {showLine && (
        <div className={cn(
          "h-1 bg-gradient-to-r from-blue-400 to-blue-600",
          "rounded-full opacity-80 group-hover:w-20 transition-all duration-500",
          sizes[size].line
        )} />
      )}
    </div>
  )
}