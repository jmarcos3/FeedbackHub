import React, { useEffect, useState } from "react"
import axios from "axios"

interface Feedback {
  id: string
  content: string
  createdAt: string
}

interface FeedbackModalProps {
  roomId: string
  isOpen: boolean
  onClose: () => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ roomId, isOpen, onClose }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isOpen) return

    const fetchFeedbacks = async () => {
      setLoading(true)
      setError("")
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl max-w-xl w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Feedbacks da Sala</h2>

        {loading && <p className="text-gray-500 dark:text-zinc-300">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {feedbacks.length === 0 ? (
              <p className="text-gray-500 dark:text-zinc-300">Nenhum feedback encontrado.</p>
            ) : (
              feedbacks.map((feedback) => (
                <div key={feedback.id} className="p-3 border rounded bg-zinc-50 dark:bg-zinc-700">
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{feedback.content}</p>
                  <p className="text-xs text-zinc-500">{new Date(feedback.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        )}

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

export default FeedbackModal
