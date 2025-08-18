import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api' // ✅ usar o axios centralizado
import FeedbackModal from '@/components/modals/FeedbackModal'
import { FeedbackHubLogo } from '../components/FeedbackHubLogo'
import { RoomCard } from '../components/RoomCard'
import { ArrowLeftOnRectangleIcon, PlusIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import type { Room } from '@/types'
import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { EditRoomModal } from '@/components/modals/EditRoomModal'
import { CreateRoomModal } from '@/components/modals/CreateRoomModal'

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true) 
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const navigate = useNavigate()
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateRoom = async (data: { title: string; description: string }) => {
    try {
      const response = await api.post('/rooms', data)
      const newRoom = response.data.room
      setRooms(prev => [...prev, newRoom])
      toast.success(response.data.message || 'Sala criada com sucesso!')
      return true
    } catch (error) {
      toast.error('Erro ao criar sala')
      return false
    }
  }
      
  const handleViewFeedback = (id: string) => {
    setSelectedRoomId(id)
    setIsFeedbackModalOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setRoomToDelete(id)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!roomToDelete) return
    try {
      await api.delete(`/rooms/${roomToDelete}`)
      setRooms(rooms.filter(room => room.id !== roomToDelete))
      toast.success('Sala excluída com sucesso')
    } catch (error) {
      toast.error('Erro ao excluir sala')
    } finally {
      setIsConfirmModalOpen(false)
      setRoomToDelete(null)
    }
  }

  const handleEditRoom = (id: string) => {
    const room = rooms.find(r => r.id === id)
    if (room) {
      setRoomToEdit(room)
      setIsEditModalOpen(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast.info('Você saiu da sua conta')
  }

  const handleSaveRoom = async (data: { title: string; description: string }) => {
    if (!roomToEdit) return
    try {
      const response = await api.patch(`/rooms/${roomToEdit.id}`, data)
      setRooms(rooms.map(r => r.id === roomToEdit.id ? { ...r, ...response.data } : r))
      toast.success('Sala atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar sala')
    }
  }

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms')
        setRooms(data)
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Erro ao carregar salas')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-6">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="!bg-zinc-800 !text-white"
        progressClassName="!bg-blue-500"
      />

      <header className="flex items-center justify-between mb-6 px-2 sm:px-4 lg:px-0">
        <FeedbackHubLogo size="sm" showLine={false} />
        <h1 className="hidden sm:block text-xl sm:text-2xl font-bold text-white">Minhas Salas</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
        >
          <span>Sair</span>
          <ArrowLeftOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
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
              <BuildingOfficeIcon className="h-12 w-12 text-zinc-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Nenhuma sala encontrada</h3>
            <p className="text-zinc-400 mb-6">Crie sua primeira sala para começar</p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Criar Sala
            </button>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onEdit={handleEditRoom}
                onDelete={handleDeleteClick}
                onViewFeedback={handleViewFeedback} 
              />
            ))}
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex flex-col items-center justify-center p-4 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 rounded-xl transition-colors border-2 border-dashed border-zinc-600 hover:border-blue-500 min-h-[180px]"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-3 hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">Nova Sala</span>
            </button>
          </div>
        )}
      </main>

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateRoom}
      />

      {roomToEdit && (
        <EditRoomModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          room={roomToEdit}
          onSave={handleSaveRoom}
        />
      )}

      <FeedbackModal
        roomId={selectedRoomId}
        roomTitle={rooms.find(r => r.id === selectedRoomId)?.title}
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Sala"
        description="Tem certeza que deseja excluir esta sala? Esta ação não pode ser desfeita."
        confirmText="Excluir"
      />
    </div>
  )
}
