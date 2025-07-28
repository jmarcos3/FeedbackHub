import React, { useEffect, useState } from "react"
import axios from "axios"
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface Feedback {
  id: string
  content: string
  createdAt: string
}

interface FeedbackModalProps {
  roomId: string | null
  roomTitle?: string
  isOpen: boolean
  onClose: () => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ roomId, roomTitle, isOpen, onClose }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const feedbacksPerPage = 5 // Alterado para 5 feedbacks por página

  useEffect(() => {
    if (!isOpen || !roomId) return

    const fetchFeedbacks = async () => {
      setLoading(true)
      setError("")
      setCurrentPage(1)
      try {
        const { data } = await axios.get(`http://localhost:3000/feedback/${roomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setFeedbacks(data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao carregar feedbacks")
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [roomId, isOpen])

  if (!isOpen) return null

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback)
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
      <div 
        className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl border border-zinc-200 dark:border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            {roomTitle && (
              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {roomTitle}
              </h2>
            )}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Feedbacks da sala
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
              <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2">
            {feedbacks.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-500 dark:text-zinc-400 text-center">
                  Nenhum feedback encontrado.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentFeedbacks.map((feedback) => (
                  <div 
                    key={feedback.id} 
                    className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                  >
                    <p className="text-zinc-800 dark:text-zinc-100 mb-2">
                      {feedback.content}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(feedback.createdAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls - Sempre visível quando há feedbacks */}
        {feedbacks.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                currentPage === 1 
                  ? 'text-zinc-400 dark:text-zinc-500 cursor-not-allowed' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              } transition`}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Anterior</span>
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    currentPage === number
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  } transition`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                currentPage === totalPages 
                  ? 'text-zinc-400 dark:text-zinc-500 cursor-not-allowed' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              } transition`}
            >
              <span>Próxima</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackModal