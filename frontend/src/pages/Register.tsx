import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import TermsModal from '../components/TermsModal'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast.error('O nome de usuário é obrigatório')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (!acceptedTerms) {
      toast.error('Você precisa aceitar os termos de serviço')
      return
    }

    setLoading(true)
    try {
      await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
      })

      toast.success('Registro realizado com sucesso! Redirecionando para login...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white">Registrar</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Nome de usuário
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Confirmar Senha
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center space-x-2 text-sm text-zinc-700 dark:text-zinc-200">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
              required
            />
            <span>
              Aceito os{' '}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:underline"
              >
                Termos de Serviço
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className="w-full py-2 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Já possui conta?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>

      {/* Modal de termos */}
      <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
