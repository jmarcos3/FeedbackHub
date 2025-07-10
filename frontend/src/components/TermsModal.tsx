import React from 'react'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl max-w-lg w-full shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Termos de Serviço</h2>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 max-h-64 overflow-y-auto space-y-3">
          <p className="italic text-center text-zinc-500 dark:text-zinc-400 pt-2">
            Documento em construção...
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsModal
