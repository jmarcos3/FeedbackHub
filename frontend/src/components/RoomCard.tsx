import { ShareButton } from './ShareButton'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import type { Room } from '@/types'

export function RoomCard({ 
  room, 
  onEdit, 
  onDelete,
  onViewFeedback 
}: {
  room: Room
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onViewFeedback: (id: string) => void 
}) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700 hover:border-blue-500 transition-colors flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-white truncate">
            {room.title}
          </h2>
          {room.createdAt && (
            <span className="text-xs text-zinc-500">
              {new Date(room.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        
        <div className="min-h-[60px] mb-4">
          {room.description ? (
            <p className="text-zinc-400 line-clamp-3">
              {room.description}
            </p>
          ) : (
            <p className="text-zinc-600 italic">Nenhuma descrição</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-zinc-700">
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(room.id)
            }}
            className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors"
            aria-label="Editar"
          >
            <PencilIcon className="w-4 h-4 text-blue-400" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(room.id)
            }}
            className="p-2 rounded-lg bg-zinc-700 hover:bg-red-900 transition-colors"
            aria-label="Excluir"
          >
            <TrashIcon className="w-4 h-4 text-red-400" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <ShareButton roomId={room.id} />
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onViewFeedback(room.id)
            }}
            className="px-3 py-1 text-xs bg-blue-900 text-blue-400 rounded-full hover:bg-blue-800 transition-colors"
          >
            Ver Feedbacks
          </button>
        </div>
      </div>
    </div>
  )
}