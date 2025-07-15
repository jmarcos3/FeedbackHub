// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ForgotPasswordModal } from '../components/modals/ForgotPasswordModal'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', data.accessToken)
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 px-4">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="!bg-zinc-800 !text-white"
        progressClassName="!bg-blue-500"
      />
      
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal} 
        setIsOpen={setShowForgotPasswordModal} 
      />

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-col items-center mb-8 group">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-100/30 dark:bg-blue-900/20 group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/30 transition-all duration-300 animate-float">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500 drop-shadow-[0_2px_1px_rgba(59,130,246,0.3)]"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <polyline points="9 11 11.5 13.5 15 10" />
              </svg>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300 tracking-tight">
              FeedbackHub
            </span>
          </div>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80 group-hover:w-20 transition-all duration-500"></div>
        </div>

        <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white mb-6">
          Acesse sua conta
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
              <button 
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all text-white font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não possui uma conta?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}