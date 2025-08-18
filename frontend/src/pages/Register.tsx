import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import api from '@/services/api'
import 'react-toastify/dist/ReactToastify.css'
import { TermsModal } from '../components/modals/TermsModal'
import { FeedbackHubLogo } from '../components/FeedbackHubLogo' // Componente do logo que criamos anteriormente

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username.trim()) {
      toast.error('O nome de usuário é obrigatório')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (!acceptedTerms) {
      toast.error('Você precisa aceitar os termos de serviço')
      return
    }

    setLoading(true)
    try {
      await api.post('/users', { 
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })

      toast.success('Registro realizado com sucesso! Redirecionando para login...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptTerms = () => {
    setAcceptedTerms(true)
    setShowModal(false)
    toast.success('Termos aceitos com sucesso!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 px-4">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="!bg-zinc-800 !text-white"
        progressClassName="!bg-blue-500"
      />
      
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <FeedbackHubLogo />

        <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white">
          Criar sua conta
        </h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nome de usuário
            </label>
            <input
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Seu nome de usuário"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirmar Senha
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              className="mt-1 w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500 text-blue-600"
            />
            <label htmlFor="terms-checkbox" className="text-sm text-zinc-700 dark:text-zinc-300">
              Eu aceito os {' '}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
              >
                Termos de Serviço
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className={`w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all text-white font-semibold rounded-xl ${
              !acceptedTerms ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando conta...
              </span>
            ) : 'Registrar'}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Já possui uma conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>

      <TermsModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onAccept={handleAcceptTerms} 
      />
    </div>
  )
}