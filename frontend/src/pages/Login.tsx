import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erro ao fazer login')
      }

      const { accessToken } = await res.json()
      localStorage.setItem('token', accessToken)
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (err: any) {
      toast.error(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Não possui conta?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Registre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
