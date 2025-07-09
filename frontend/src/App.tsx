import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vite + React + Tailwind</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setCount((c) => c + 1)}
      >
        count is {count}
      </button>
    </div>
  )
}

export default App
