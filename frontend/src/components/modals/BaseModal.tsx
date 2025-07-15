// src/components/modals/BaseModal.tsx
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actionButton?: ReactNode
  hideActionButtons?: boolean
  closeOnOverlayClick?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function BaseModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actionButton,
  hideActionButtons = false,
  closeOnOverlayClick = true,
  size = 'md'
}: BaseModalProps) {
  // Tamanhos do modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  }

  // Fechar modal ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Bloqueia scroll da página
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto' // Restaura scroll da página
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div 
        className={`bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full shadow-2xl border border-zinc-200 dark:border-zinc-700 animate-slideUp ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()} // Impede que clicks dentro do modal fechem
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-zinc-800 dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            aria-label="Fechar modal"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="text-zinc-600 dark:text-zinc-300 mb-6">
          {children}
        </div>
        
        {/* Footer (condicional) */}
        {!hideActionButtons && (
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 rounded-lg transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-200"
            >
              Cancelar
            </button>
            {actionButton}
          </div>
        )}
      </div>
    </div>
  )
}