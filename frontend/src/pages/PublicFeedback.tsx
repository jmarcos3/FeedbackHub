import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeftIcon, PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/outline'
import type { RoomInfo, RatingValue } from '@/types'
import { ratingLabels } from '@/types'

export default function PublicFeedback() {
  const { roomId } = useParams<{ roomId: string }>()
  const [content, setContent] = useState('')
  const [rating, setRating] = useState<RatingValue | null>(null)
  const [hoverRating, setHoverRating] = useState<RatingValue | 0>(0)
  const [loading, setLoading] = useState(false)
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
  const [roomLoading, setRoomLoading] = useState(true)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const isLoggedIn = Boolean(token)


  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/rooms/${roomId}`)
        setRoomInfo(data)
      } catch (error) {
        toast.error('Não foi possível carregar as informações da sala')
      } finally {
        setRoomLoading(false)
      }
    }

    fetchRoomInfo()
  }, [roomId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === null || rating < 1 || rating > 5) {
      toast.error('Por favor, avalie com 1 a 5 estrelas')
      return
    }

    if (content.length > 256) {
      toast.error('O feedback deve ter no máximo 256 caracteres')
      return
    }

    setLoading(true)
    try {
      await axios.post(`http://localhost:3000/feedback/${roomId}`, { 
        content: content.trim(), 
        rating 
      })
      toast.success('Avaliação enviada com sucesso!')
      setContent('')
      setRating(null)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao enviar avaliação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 flex flex-col items-center justify-center p-6">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="!bg-zinc-800 !text-white"
        progressClassName="!bg-blue-500"
      />

      {isLoggedIn && (
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center space-x-2 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Voltar</span>
        </button>
      )}

      <div className="bg-zinc-800 rounded-xl shadow-2xl p-8 max-w-lg w-full text-white border border-zinc-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            {roomLoading ? 'Carregando...' : roomInfo?.title || 'Avalie esta Sala'}
          </h1>
          
          {roomInfo?.description && (
            <p className="text-zinc-300 mb-6 px-4">
              {roomInfo.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-zinc-300 mb-1">Deixe sua avaliação sincera abaixo ☺️</p>
            
            <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 focus:outline-none"
                onClick={() => setRating(star as RatingValue)}
                onMouseEnter={() => setHoverRating(star as RatingValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <StarIcon
                  className={`h-8 w-8 ${
                    (hoverRating || rating || 0) >= star 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-zinc-500'
                  } transition-colors`}
                />
              </button>
              ))}
            </div>
            
            <p className="text-sm text-zinc-300 min-h-6 text-center">
              {(hoverRating && !rating) ? ratingLabels[hoverRating] : 
               rating ? `Você avaliou: ${ratingLabels[rating]}` : 'Passe o mouse sobre as estrelas para ver as opções'}
            </p>
          </div>

          <div className="relative">
            <textarea
              placeholder="Comentário opcional (máx. 256 caracteres)..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              maxLength={256}
              className="w-full p-4 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400 resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
              {content.length}/256
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || rating === null}
            className="w-full flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-3 px-4 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="h-5 w-5" />
                <span>Enviar Avaliação</span>
              </>
            )}
          </button>
        </form>

        {!isLoggedIn && (
          <p className="mt-6 text-center text-sm text-zinc-400">
            Quer criar suas próprias salas de avaliação?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Registre-se gratuitamente
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}