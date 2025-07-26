import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FeedbackModal from '../components/modals/FeedbackModal'
import { FeedbackHubLogo } from '../components/FeedbackHubLogo' 

interface Room {
  id: string
  title: string
  description?: string
  createdAt?: string 
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true) 
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Sessão expirada, faça login novamente')
        navigate('/login')
        return
      }

      try {
        const { data } = await axios.get('http://localhost:3000/rooms', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRooms(data)
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Erro ao carregar salas')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast.info('Você saiu da sua conta')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-6">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="!bg-zinc-800 !text-white"
        progressClassName="!bg-blue-500"
      />

    <header className="relative flex items-center mb-10 px-4">
      <div className="absolute left-0">
        <FeedbackHubLogo size="sm" showLine={false} />
      </div>

      <h1 className="text-2xl font-bold text-white mx-auto">
        Minhas Salas
      </h1>

      <div className="absolute right-0">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>Sair</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

      <main>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl p-5 h-40 animate-pulse"></div>
            ))}
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Nenhuma sala encontrada</h3>
            <p className="text-zinc-400 mb-6">Crie sua primeira sala para começar</p>
            <button 
              onClick={() => navigate('/create-room')} 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Criar Sala
            </button>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => {
                  setSelectedRoomId(room.id)
                  setIsFeedbackModalOpen(true)
                }}
                className="group bg-zinc-800 bg-opacity-80 hover:bg-opacity-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-zinc-700 hover:border-blue-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                    {room.title}
                  </h2>
                  <span className="text-xs text-zinc-500">
                    {room.createdAt && new Date(room.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {room.description && (
                  <p className="text-zinc-400 group-hover:text-zinc-300 line-clamp-3">
                    {room.description}
                  </p>
                )}
                
                <div className="mt-4 pt-4 border-t border-zinc-700 flex justify-end">
                  <span className="text-xs bg-blue-900 bg-opacity-50 text-blue-400 px-3 py-1 rounded-full">
                    Ver feedbacks
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FeedbackModal
        roomId={selectedRoomId}
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  )
}