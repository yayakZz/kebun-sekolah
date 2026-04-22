import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  const session = await getSession()
  if (session) {
    redirect('/admin')
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="card text-center">
        <h2>Login Admin</h2>
        <p className="text-muted mb-2">Masuk untuk mengelola tanaman</p>
        <LoginForm />
      </div>
    </div>
  )
}
