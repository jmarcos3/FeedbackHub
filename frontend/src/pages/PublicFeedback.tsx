import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function PublicFeedback() {
  const { roomId } = useParams<{ roomId: string }>()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const isLoggedIn = Boolean(token)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      toast.error('Por favor, escreva seu feedback antes de enviar.')
      return
    }

    setLoading(true)
    try {
      await axios.post(`http://localhost:3000/feedback/${roomId}`, { content })
      toast.success('Feedback enviado com sucesso! Obrigado.')
      setContent('')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao enviar feedback.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {isLoggedIn && (
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold shadow transition text-white"
        >
          Home
        </button>
      )}

      <div className="bg-zinc-900 rounded-xl shadow-lg p-8 max-w-lg w-full text-white relative">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Deixe seu Feedback</h1>
        <p className="mb-4 text-center text-indigo-300">
          Sala: <span className="font-semibold">{roomId}</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            placeholder="Escreva seu feedback aqui..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            className="resize-none p-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg py-3 font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </form>

        {!isLoggedIn && (
          <p className="mt-6 text-center text-sm text-indigo-300">
            Não possui conta?{' '}
            <Link to="/register" className="underline hover:text-indigo-400 font-semibold">
              Registre-se aqui
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
