import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, TrendingUp, Loader2, X } from 'lucide-react'
import { usePostHog } from '@posthog/react'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const posthog = usePostHog()

    // const handleClickLogin = () => {
    //     posthog.capture('button_clicked', { button_name: 'login' })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) { setError('Please enter a valid email address'); return }
        if (password.length < 8) { setError('Password must be at least 8 characters'); return }

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.detail || 'Login failed'); return }
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            // 🔥 Add this - identify the user in PostHog  
            posthog.identify(data.user.id, {  
                email: email,  
                username: name,
            })
            // 🔥 Optionally capture a successful signup event  
            posthog.capture('user_logged_in')
            navigate('/dashboard')
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh', width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 40px)',
            background: 'linear-gradient(135deg, #0F0A1E 0%, #1A103A 30%, #0F172A 100%)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background decorative blobs */}
            <div style={{
                position: 'absolute', top: '-15%', left: '-10%',
                width: 'clamp(250px, 40vw, 600px)', height: 'clamp(250px, 40vw, 600px)',
                borderRadius: '50%', opacity: 0.15, filter: 'blur(100px)', pointerEvents: 'none',
                background: 'radial-gradient(circle, #7C3AED, transparent 70%)',
            }} />
            <div style={{
                position: 'absolute', bottom: '-15%', right: '-10%',
                width: 'clamp(200px, 35vw, 500px)', height: 'clamp(200px, 35vw, 500px)',
                borderRadius: '50%', opacity: 0.12, filter: 'blur(100px)', pointerEvents: 'none',
                background: 'radial-gradient(circle, #F97316, transparent 70%)',
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 'clamp(300px, 50vw, 800px)', height: 'clamp(300px, 50vw, 800px)',
                borderRadius: '50%', opacity: 0.06, filter: 'blur(120px)', pointerEvents: 'none',
                background: 'radial-gradient(circle, #7C3AED, transparent 60%)',
            }} />

            {/* Card */}
            <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', maxWidth: '420px',
                backgroundColor: 'rgba(255,255,255,0.97)',
                borderRadius: 'clamp(16px, 3vw, 24px)',
                padding: 'clamp(24px, 4vw, 40px)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
            }}>
                {/* Close / back to home */}
                <Link to="/" style={{
                    position: 'absolute', top: '16px', right: '16px',
                    width: '32px', height: '32px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#F3F4F6', color: '#6B7280', textDecoration: 'none',
                    transition: 'background-color 0.2s',
                }}>
                    <X style={{ width: '16px', height: '16px' }} />
                </Link>

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'clamp(20px, 3vw, 28px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <TrendingUp style={{ width: '18px', height: '18px', color: '#fff' }} />
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>FinVault</span>
                    </div>
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 28px)' }}>
                    <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>Welcome back</h2>
                    <p style={{ fontSize: 'clamp(13px, 1.5vw, 15px)', color: '#6B7280' }}>Sign in to access your financial dashboard</p>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        marginBottom: '16px', padding: '12px 16px', borderRadius: '12px',
                        backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA',
                        fontSize: '13px', fontWeight: 500,
                    }}>{error}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#9CA3AF' }} />
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com" required
                                style={{
                                    width: '100%', padding: '12px 14px 12px 42px',
                                    borderRadius: '12px', border: '1.5px solid #E5E7EB',
                                    fontSize: '14px', color: '#111827', backgroundColor: '#FAFAFA',
                                    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={e => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)' }}
                                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#9CA3AF' }} />
                            <input
                                type="password" value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••" required
                                style={{
                                    width: '100%', padding: '12px 14px 12px 42px',
                                    borderRadius: '12px', border: '1.5px solid #E5E7EB',
                                    fontSize: '14px', color: '#111827', backgroundColor: '#FAFAFA',
                                    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={e => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)' }}
                                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        // onClick={handleClickLogin}
                        type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff',
                            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            transition: 'opacity 0.2s, transform 0.15s',
                            opacity: loading ? 0.6 : 1, marginTop: '4px',
                        }}
                        onMouseOver={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
                        onMouseOut={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
                        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
                        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                        {loading ? (
                            <><Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> Signing in...</>
                        ) : (
                            <>Sign In <ArrowRight style={{ width: '16px', height: '16px' }} /></>
                        )}
                    </button>
                </form>

                {/* Footer link */}
                <p style={{ marginTop: 'clamp(16px, 3vw, 24px)', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ fontWeight: 600, color: '#7C3AED', textDecoration: 'none' }}>Create account</Link>
                </p>
            </div>
        </div>
    )
}
