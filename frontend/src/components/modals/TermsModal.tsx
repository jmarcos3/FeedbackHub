// src/components/modals/TermsModal.tsx
import { BaseModal } from './BaseModal'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept?: () => void // Nova prop
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const termsSections = [
    {
      title: "1. Aceitação dos Termos",
      content: "Ao acessar ou usar o FeedbackHub, você concorda em cumprir estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa plataforma."
    },
    {
      title: "2. Uso Adequado",
      content: "Você concorda em não usar o serviço para: (a) enviar conteúdo ilegal ou prejudicial; (b) violar direitos de propriedade intelectual; (c) realizar atividades fraudulentas; (d) interferir na segurança do sistema."
    },
    {
      title: "3. Conta do Usuário",
      content: "Para acessar certos recursos, você precisará criar uma conta. Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades que ocorrerem sob sua conta."
    },
    {
      title: "4. Conteúdo Gerado",
      content: "Você mantém os direitos sobre o conteúdo que enviar, mas concede ao FeedbackHub uma licença não exclusiva para usar, reproduzir e exibir tal conteúdo para fins de operação e melhoria do serviço."
    },
    {
      title: "5. Privacidade",
      content: "Nossa Política de Privacidade explica como coletamos e usamos suas informações. Ao usar o serviço, você concorda com essas práticas."
    },
    {
      title: "6. Modificações",
      content: "Podemos atualizar estes Termos periodicamente. A versão mais recente estará sempre disponível nesta página, com a data da última revisão destacada."
    }
  ]

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Termos de Serviço"
      hideActionButtons
      size="lg"
    >
      <div className="modal-scrollable text-sm text-zinc-700 dark:text-zinc-300 max-h-[65vh] overflow-y-auto pr-3">
        <p className="text-right text-xs italic mb-6 text-zinc-500 dark:text-zinc-400">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>

        {termsSections.map((section, index) => (
          <div key={index} className="mb-5">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {section.title}
            </h4>
            <p className="text-justify leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}

        <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <button
          onClick={() => {
            onClose()
            onAccept?.()
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          Eu entendi e aceito os termos
        </button>
        </div>
      </div>
    </BaseModal>
  )
}