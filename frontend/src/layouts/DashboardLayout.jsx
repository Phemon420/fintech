import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { TrendingUp, Rocket } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import BottomBar from '../components/BottomBar'

/* Launch date: 7 days from 2026-02-22 = 2026-03-01T00:00:00+05:30 */
const LAUNCH_DATE = new Date('2026-03-01T00:00:00+05:30').getTime()

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft())

    function getTimeLeft() {
        const diff = Math.max(0, LAUNCH_DATE - Date.now())
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        }
    }

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(timer)
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    const units = [
        { label: 'DAYS', value: pad(timeLeft.days) },
        { label: 'HOURS', value: pad(timeLeft.hours) },
        { label: 'MINUTES', value: pad(timeLeft.minutes) },
        { label: 'SECONDS', value: pad(timeLeft.seconds) },
    ]

    return (
        /* Full-screen overlay */
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            background: 'rgba(15, 10, 30, 0.6)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        }}>
            {/* Card */}
            <div style={{
                position: 'relative',
                width: '90%', maxWidth: '560px',
                backgroundColor: 'rgba(255,255,255,0.97)',
                borderRadius: 'clamp(16px, 3vw, 28px)',
                padding: 'clamp(28px, 5vw, 56px) clamp(24px, 4vw, 48px)',
                textAlign: 'center',
                boxShadow: '0 30px 100px rgba(124, 58, 237, 0.2), 0 0 0 1px rgba(124, 58, 237, 0.08)',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: 'clamp(16px, 3vw, 28px)' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <TrendingUp style={{ width: '20px', height: '20px', color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '22px', fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>FinVault</span>
                </div>

                {/* Rocket icon */}
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #EDE9FE, #F5F3FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto clamp(16px, 2.5vw, 24px)',
                }}>
                    <Rocket style={{ width: '28px', height: '28px', color: '#7C3AED' }} />
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800,
                    color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em',
                }}>
                    Launching Soon
                </h1>
                <p style={{
                    fontSize: 'clamp(13px, 1.5vw, 16px)', color: '#6B7280',
                    maxWidth: '380px', margin: '0 auto', lineHeight: 1.6,
                    marginBottom: 'clamp(24px, 4vw, 40px)',
                }}>
                    We're polishing the final details. Your dashboard will be live in:
                </p>

                {/* Countdown boxes */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 'clamp(8px, 2vw, 16px)', marginBottom: 'clamp(24px, 4vw, 36px)',
                }}>
                    {units.map((unit, i) => (
                        <div key={unit.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>
                            <div style={{
                                width: 'clamp(56px, 10vw, 80px)',
                                padding: 'clamp(12px, 2vw, 20px) 0',
                                borderRadius: 'clamp(10px, 2vw, 16px)',
                                background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.25)',
                            }}>
                                <div style={{
                                    fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800,
                                    color: '#fff', lineHeight: 1,
                                    fontFamily: "'Courier New', monospace",
                                }}>{unit.value}</div>
                                <div style={{
                                    fontSize: 'clamp(8px, 1vw, 11px)', fontWeight: 600,
                                    color: 'rgba(255,255,255,0.6)', marginTop: '6px',
                                    letterSpacing: '0.1em',
                                }}>{unit.label}</div>
                            </div>
                            {i < units.length - 1 && (
                                <span style={{
                                    fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700,
                                    color: '#D1D5DB',
                                }}>:</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '100px',
                    backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0',
                }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#065F46' }}>You're on the early access list!</span>
                </div>
            </div>
        </div>
    )
}

export default function DashboardLayout() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F6FA', position: 'relative' }}>
            <Sidebar />
            <main className="ml-64 pb-20 px-6 pt-6" style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }}>
                <Outlet />
            </main>
            <BottomBar />

            {/* Countdown overlay */}
            <CountdownTimer />

            {/* Pulse animation for the green dot */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
            `}</style>
        </div>
    )
}
