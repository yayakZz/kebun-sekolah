'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from './actions'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const success = await loginAction(password)
    if (success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Password salah!')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffebee', borderRadius: '4px' }}>{error}</div>}
      <div className="form-group" style={{ textAlign: 'left' }}>
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          placeholder="Masukkan password admin"
        />
      </div>
      <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Memproses...' : 'Login'}
      </button>
    </form>
  )
}
