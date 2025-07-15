import type { Dispatch, SetStateAction } from 'react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ForgotPasswordModal({ isOpen, setIsOpen }: ForgotPasswordModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-zinc-200 dark:border-zinc-700 animate-slideUp">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-zinc-800 dark:text-white">Recuperação de senha</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            aria-label="Fechar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Esta funcionalidade está em desenvolvimento. Por favor, entre em contato com o suporte para redefinir sua senha.
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}