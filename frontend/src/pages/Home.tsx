import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface Room {
  id: string
  title: string
  description?: string
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Você precisa estar logado')
        navigate('/login')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('http://localhost:3000/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error('Falha ao buscar salas')
        }

        const data = await res.json()
        setRooms(data)
      } catch (error: any) {
        toast.error(error.message || 'Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 text-white font-sans p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold">Minhas Salas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded font-semibold shadow"
        >
          Logout
        </button>
      </header>

      {loading && <p className="text-center text-lg">Carregando...</p>}

      {!loading && rooms.length === 0 && (
        <p className="text-center text-lg opacity-80">Nenhuma sala encontrada.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="bg-indigo-800 bg-opacity-70 rounded-lg p-5 shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2">{room.title}</h2>
            {room.description && <p className="text-indigo-300">{room.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
