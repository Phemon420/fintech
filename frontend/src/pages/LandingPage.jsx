import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    TrendingUp, ArrowRight, Shield, Zap, BarChart3, Wallet,
    Globe, Lock, Star, ChevronRight, Sparkles, Users, Clock, Menu, X
} from 'lucide-react'

/* ── Animated counter ─────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = '' }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const duration = 2000
        const step = Math.ceil(target / (duration / 16))
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(start)
        }, 16)
        return () => clearInterval(timer)
    }, [target])
    return <>{count.toLocaleString()}{suffix}</>
}

/* ── Feature card ─────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, description, color, bgColor, style = {} }) {
    return (
        <div className="group relative rounded-2xl border border-[var(--color-card-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ padding: 'clamp(16px, 2vw, 24px)', ...style }}>
            <div style={{
                width: 'clamp(40px, 5vw, 48px)', height: 'clamp(40px, 5vw, 48px)',
                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'clamp(10px, 1.5vw, 16px)', backgroundColor: bgColor,
                transition: 'transform 0.3s',
            }}>
                <Icon style={{ width: 'clamp(18px, 2.5vw, 24px)', height: 'clamp(18px, 2.5vw, 24px)', color }} />
            </div>
            <h3 style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 600, marginBottom: 'clamp(4px, 0.8vw, 8px)', color: '#111827' }}>{title}</h3>
            <p style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', lineHeight: 1.6, color: '#6B7280' }}>{description}</p>
        </div>
    )
}

/* ── Testimonial card ─────────────────────────────────────────── */
function TestimonialCard({ name, role, quote, avatar }) {
    return (
        <div className="p-15 sm:p-6 rounded-2xl border border-[var(--color-card-border)] bg-white">
            <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 text-[#374151]">"{quote}"</p>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm"
                    style={{ background: `linear-gradient(135deg, ${avatar[0]}, ${avatar[1]})` }}>
                    {name[0]}
                </div>
                <div>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">{name}</p>
                    <p className="text-[11px] sm:text-xs text-[#9CA3AF]">{role}</p>
                </div>
            </div>
        </div>
    )
}

/* ── Main landing page ────────────────────────────────────────── */
export default function LandingPage() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [mobileMenu, setMobileMenu] = useState(false)

    const handleWaitlist = async (e) => {
        e.preventDefault()
        setError('')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) { setError('Please enter a valid email'); return }
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/early-access`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.detail || 'Something went wrong')
                return
            }
            setSubmitted(true)
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F6FA', width: '100%', overflowX: 'hidden' }}>

            {/* ── Navbar ────────────────────────────────────── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                backgroundColor: 'rgba(255,255,255,0.88)', borderBottom: '1px solid #E5E7EB',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            }}>
                <div style={{
                    maxWidth: '1200px', margin: '0 auto',
                    padding: '0 clamp(16px, 4vw, 32px)',
                    height: 'clamp(56px, 8vw, 64px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <TrendingUp style={{ width: '18px', height: '18px', color: '#fff' }} />
                        </div>
                        <span style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>FinVault</span>
                        <span style={{
                            fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px',
                            backgroundColor: '#EDE9FE', color: '#7C3AED',
                        }}>PRE-LAUNCH</span>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex" style={{ alignItems: 'center', gap: 'clamp(16px, 2vw, 24px)' }}>
                        <a href="#features" style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}>Features</a>
                        <a href="#how-it-works" style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}>How it Works</a>
                        <a href="#testimonials" style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}>Testimonials</a>
                        <Link to="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" style={{
                            fontSize: '14px', fontWeight: 600, padding: '10px 20px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff', textDecoration: 'none',
                        }}>Get Early Access</Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}
                        style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {mobileMenu ? <X style={{ width: '22px', height: '22px', color: '#111827' }} /> : <Menu style={{ width: '22px', height: '22px', color: '#111827' }} />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {mobileMenu && (
                    <div className="md:hidden" style={{
                        borderTop: '1px solid #E5E7EB', backgroundColor: '#fff',
                        padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: '4px',
                    }}>
                        {['features', 'how-it-works', 'testimonials'].map(id => (
                            <a key={id} href={`#${id}`} onClick={() => setMobileMenu(false)}
                                style={{ display: 'block', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none', textTransform: 'capitalize' }}>
                                {id.replace('-', ' ')}
                            </a>
                        ))}
                        <Link to="/login" style={{ display: 'block', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" style={{
                            display: 'block', textAlign: 'center', padding: '12px', borderRadius: '12px', marginTop: '4px',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                        }}>Get Early Access</Link>
                    </div>
                )}
            </nav>

            {/* ── Hero ──────────────────────────────────────── */}
            <section style={{ position: 'relative', paddingTop: 'clamp(110px, 18vw, 170px)', paddingBottom: 'clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
                {/* Background blobs */}
                <div style={{
                    position: 'absolute', top: '-10%', left: '15%',
                    width: 'clamp(200px, 40vw, 600px)', height: 'clamp(200px, 40vw, 600px)',
                    borderRadius: '50%', opacity: 0.18, filter: 'blur(80px)', pointerEvents: 'none',
                    background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-10%', right: '15%',
                    width: 'clamp(180px, 35vw, 500px)', height: 'clamp(180px, 35vw, 500px)',
                    borderRadius: '50%', opacity: 0.12, filter: 'blur(80px)', pointerEvents: 'none',
                    background: 'radial-gradient(circle, #F97316 0%, transparent 70%)',
                }} />

                <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', textAlign: 'center' }}>

                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 16px', borderRadius: '100px', marginBottom: 'clamp(20px, 4vw, 32px)',
                        backgroundColor: '#fff', border: '1px solid #E5E7EB',
                    }}>
                        <Sparkles style={{ width: '15px', height: '15px', color: '#F97316' }} />
                        <span style={{ fontSize: 'clamp(11px, 1.5vw, 14px)', fontWeight: 500, color: '#374151' }}>
                            Launching Q2 2026 · <span style={{ color: '#7C3AED' }}>Join 2,400+ on the waitlist</span>
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(28px, 6vw, 72px)', fontWeight: 800,
                        lineHeight: 1.1, letterSpacing: '-0.02em',
                        color: '#111827', marginBottom: 'clamp(12px, 2vw, 24px)',
                    }}>
                        Your money.{' '}
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, #7C3AED, #F97316)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>One dashboard.</span>
                        <br />
                        Zero guesswork.
                    </h1>

                    <p style={{
                        fontSize: 'clamp(13px, 1.8vw, 20px)', lineHeight: 1.6,
                        color: '#6B7280', maxWidth: 'min(90%, 640px)', margin: '0 auto',
                        marginBottom: 'clamp(24px, 4vw, 40px)',
                    }}>
                        FinVault connects all your bank accounts, investments, and expenses into a single beautiful dashboard.
                        Track your net worth in real time. Make smarter decisions, effortlessly.
                    </p>

                    {/* Waitlist form */}
                    {!submitted ? (
                        <form onSubmit={handleWaitlist} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                            maxWidth: 'min(90%, 480px)', margin: '0 auto',
                        }}>
                            <div className="flex flex-col  w-full" style={{ gap: '12px' }}>
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{
                                        flex: 1, width: '100%', padding: 'clamp(12px, 1.5vw, 16px) clamp(14px, 2vw, 20px)',
                                        borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '14px',
                                        outline: 'none', backgroundColor: '#fff', color: '#111827',
                                    }}
                                />
                                <button type="submit" disabled={loading} style={{
                                    padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 3vw, 32px)',
                                    borderRadius: '12px', border: 'none', cursor: 'pointer',
                                    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#fff',
                                    fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    opacity: loading ? 0.6 : 1, width: '100%',
                                }}>
                                    <span className="sm:hidden" style={{ width: '100%', textAlign: 'center' }}>
                                        {loading ? 'Joining...' : 'Get Early Access →'}
                                    </span>
                                    <span className="hidden sm:flex" style={{ alignItems: 'center', gap: '8px' }}>
                                        {loading ? 'Joining...' : <>Get Early Access <ArrowRight style={{ width: '16px', height: '16px' }} /></>}
                                    </span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            padding: '14px 24px', borderRadius: '12px',
                            backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0',
                        }}>
                            <span style={{ fontSize: '18px' }}>🎉</span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#065F46' }}>
                                You're on the list! We'll notify you at launch.
                            </span>
                        </div>
                    )}
                    {error && <p style={{ fontSize: '13px', marginTop: '12px', color: '#DC2626' }}>{error}</p>}

                    <p style={{ fontSize: '11px', marginTop: '12px', color: '#9CA3AF' }}>
                        Free forever for early adopters · No credit card required
                    </p>

                    {/* Stats */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                        gap: 'clamp(24px, 5vw, 48px)', marginTop: 'clamp(40px, 7vw, 64px)',
                    }}>
                        {[
                            { label: 'Waitlist Signups', value: 2400, suffix: '+' },
                            { label: 'Banks Supported', value: 120, suffix: '+' },
                            { label: 'Avg. Savings Found', value: 18, suffix: '%' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#111827' }}>
                                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                                </p>
                                <p style={{ fontSize: 'clamp(11px, 1.2vw, 14px)', marginTop: '4px', color: '#9CA3AF' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Dashboard preview ────────────────────────── */}
            <section style={{ position: 'relative', maxWidth: '960px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)' }}>
                <div style={{
                    borderRadius: 'clamp(12px, 2vw, 16px)', border: '1px solid #E5E7EB',
                    overflow: 'hidden', backgroundColor: '#fff',
                    boxShadow: '0 20px 60px rgba(124, 58, 237, 0.08)',
                }}>
                    {/* Browser chrome */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: 'clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 16px)', borderBottom: '1px solid #E5E7EB' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                        <span className="hidden sm:inline" style={{ fontSize: '11px', marginLeft: '8px', color: '#9CA3AF' }}>app.finvault.com/dashboard</span>
                    </div>
                    <div style={{ padding: 'clamp(12px, 3vw, 32px)', background: 'linear-gradient(180deg, #F5F6FA, #FFFFFF)' }}>
                        {/* Top row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 'clamp(8px, 1.5vw, 16px)', marginBottom: 'clamp(8px, 1.5vw, 16px)' }}>
                            <div className="sm:col-span-2" style={{ borderRadius: '12px', padding: 'clamp(12px, 2vw, 20px)', border: '1px solid #E5E7EB', backgroundColor: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280' }}>Net Worth</span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', backgroundColor: '#ECFDF5', color: '#16A34A' }}>+12.4%</span>
                                </div>
                                <p style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 700, color: '#111827' }}>₹28,45,200</p>
                                <svg viewBox="0 0 300 60" style={{ width: '100%', height: 'clamp(32px, 5vw, 64px)', marginTop: '8px' }}>
                                    <defs>
                                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,50 Q30,45 60,40 T120,30 T180,25 T240,15 T300,10" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
                                    <path d="M0,50 Q30,45 60,40 T120,30 T180,25 T240,15 T300,10 L300,60 L0,60Z" fill="url(#cg)" />
                                </svg>
                            </div>
                            <div style={{ borderRadius: '12px', padding: 'clamp(12px, 2vw, 20px)', border: '1px solid #E5E7EB', backgroundColor: '#fff', textAlign: 'center' }}>
                                <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280' }}>Credit Score</span>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                                    <div style={{ position: 'relative', width: 'clamp(56px, 8vw, 80px)', height: 'clamp(56px, 8vw, 80px)' }}>
                                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#16A34A" strokeWidth="3" strokeDasharray="78 100" strokeLinecap="round" />
                                        </svg>
                                        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 700, color: '#111827' }}>782</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: '11px', fontWeight: 500, color: '#16A34A', marginTop: '6px' }}>Excellent</p>
                            </div>
                        </div>
                        {/* Bank row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 'clamp(8px, 1.5vw, 16px)' }}>
                            {[
                                { label: 'HDFC Bank', amount: '₹4,52,300', icon: '🏦' },
                                { label: 'SBI Account', amount: '₹2,18,700', icon: '💰' },
                                { label: 'ICICI Savings', amount: '₹1,85,400', icon: '🏛️' },
                            ].map((b, i) => (
                                <div key={i} style={{
                                    borderRadius: '12px', padding: 'clamp(10px, 1.5vw, 16px)',
                                    border: '1px solid #E5E7EB', backgroundColor: '#fff',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                }}>
                                    <span style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>{b.icon}</span>
                                    <div>
                                        <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{b.label}</p>
                                        <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', fontWeight: 600, color: '#111827' }}>{b.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Glow */}
                <div style={{
                    position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
                    width: '75%', height: '60px', filter: 'blur(40px)', opacity: 0.25, borderRadius: '50%', pointerEvents: 'none',
                    background: 'linear-gradient(90deg, #7C3AED, #F97316)',
                }} />
            </section>

            {/* ── Features ─────────────────────────────────── */}
            <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
                    <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', backgroundColor: '#EDE9FE', color: '#7C3AED' }}>FEATURES</span>
                    <h2 style={{ fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 700, marginTop: '16px', marginBottom: '12px', color: '#111827' }}>
                        Everything you need to master your money
                    </h2>
                    <p style={{ fontSize: 'clamp(13px, 1.5vw, 18px)', maxWidth: 'min(90%, 600px)', margin: '0 auto', color: '#6B7280' }}>
                        Powerful tools wrapped in a beautiful interface. No finance degree required.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" >
                    <FeatureCard style={{ padding: '15px' }} icon={Wallet} title="All Accounts, One View" description="Link every bank, brokerage, and wallet. See your complete financial picture on one screen." color="#7C3AED" bgColor="#EDE9FE" />
                    <FeatureCard style={{ padding: '15px' }} icon={BarChart3} title="Real-Time Analytics" description="Interactive charts and breakdowns update live. Track spending patterns and investment gains." color="#F97316" bgColor="#FFF7ED" />
                    <FeatureCard style={{ padding: '15px' }} icon={Shield} title="Bank-Grade Security" description="256-bit AES encryption, SOC 2 compliance, and biometric auth. Your data stays yours." color="#16A34A" bgColor="#ECFDF5" />
                    <FeatureCard style={{ padding: '15px' }} icon={Zap} title="Smart Insights" description="AI-powered nudges help you cut unnecessary spending and find better savings opportunities." color="#EAB308" bgColor="#FEFCE8" />
                    <FeatureCard style={{ padding: '15px' }} icon={Globe} title="Multi-Currency Support" description="Track assets across currencies with real-time conversion rates. Perfect for global portfolios." color="#3B82F6" bgColor="#EFF6FF" />
                    <FeatureCard style={{ padding: '15px' }} icon={Lock} title="Privacy First" description="We never sell your data. Read-only bank connections. You're always in control." color="#EC4899" bgColor="#FDF2F8" />
                </div>
            </section>

            {/* ── How it works ─────────────────────────────── */}
            <section id="how-it-works" style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 8vw, 80px) 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
                        <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', backgroundColor: '#FFF7ED', color: '#F97316' }}>HOW IT WORKS</span>
                        <h2 style={{ fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 700, marginTop: '16px', color: '#111827' }}>
                            Get started in under 2 minutes
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(24px, 4vw, 40px)' }}>
                        {[
                            { step: '01', icon: Users, title: 'Create Your Account', desc: 'Sign up with email. No paperwork, no credit card. Just you and your finances.' },
                            { step: '02', icon: Globe, title: 'Connect Your Banks', desc: 'Securely link your accounts using read-only access. We support 120+ Indian and global banks.' },
                            { step: '03', icon: BarChart3, title: 'Watch Your Wealth Grow', desc: 'Get a real-time dashboard with insights, alerts, and recommendations tailored to you.' },
                        ].map((item, i) => (
                            <div key={i} style={{ position: 'relative', textAlign: 'center' }}>
                                <div style={{
                                    width: 'clamp(48px, 6vw, 64px)', height: 'clamp(48px, 6vw, 64px)',
                                    borderRadius: '16px', margin: '0 auto clamp(12px, 2vw, 20px)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                                }}>
                                    <item.icon style={{ width: 'clamp(22px, 3vw, 28px)', height: 'clamp(22px, 3vw, 28px)', color: '#fff' }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', display: 'block', marginBottom: '8px' }}>STEP {item.step}</span>
                                <h3 style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>{item.title}</h3>
                                <p style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', lineHeight: 1.6, color: '#6B7280', maxWidth: '280px', margin: '0 auto' }}>{item.desc}</p>
                                {i < 2 && (
                                    <ChevronRight className="hidden md:block" style={{ position: 'absolute', top: '28px', right: '-16px', width: '18px', height: '18px', color: '#D1D5DB' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* <section id="testimonials" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
                    <span style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', backgroundColor: '#EDE9FE', color: '#7C3AED' }}>TESTIMONIALS</span>
                    <h2 style={{ fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 700, marginTop: '16px', color: '#111827' }}>
                        Loved by early beta testers
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'clamp(12px, 2vw, 24px)' }}>
                    <TestimonialCard name="Priya Sharma" role="Product Designer, Bangalore"
                        quote="I finally know where all my money goes. FinVault's dashboard is the most beautiful finance tool I've ever used."
                        avatar={['#7C3AED', '#5B21B6']} />
                    <TestimonialCard name="Arjun Mehta" role="Software Engineer, Mumbai"
                        quote="Connecting all my accounts took 30 seconds. The real-time net worth tracker is addictively satisfying."
                        avatar={['#F97316', '#EA580C']} />
                    <TestimonialCard name="Sneha Reddy" role="Freelance Writer, Hyderabad"
                        quote="As a freelancer with irregular income, FinVault's spending insights helped me save 18% more last month."
                        avatar={['#16A34A', '#15803D']} />
                </div>
            </section> */}

            {/* ── Final CTA ────────────────────────────────── */}
            <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        borderRadius: 'clamp(16px, 3vw, 24px)',
                        padding: 'clamp(32px, 6vw, 64px) clamp(20px, 4vw, 48px)',
                        textAlign: 'center', position: 'relative', overflow: 'hidden',
                        background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 50%, #4C1D95 100%)',
                    }}>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(249,115,22,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '6px 16px', borderRadius: '100px',
                                backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 'clamp(12px, 3vw, 24px)',
                            }}>
                                <Clock style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.7)' }} />
                                <span style={{ fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>Early access spots are limited</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 'clamp(8px, 2vw, 16px)', letterSpacing: '-0.02em' }}>
                                Be the first to experience FinVault
                            </h2>
                            <p style={{ fontSize: 'clamp(13px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(20px, 4vw, 32px)', maxWidth: 'min(90%, 520px)', margin: '0 auto clamp(20px, 4vw, 32px)' }}>
                                Join our waitlist and get lifetime free access when we launch. No credit card required, ever.
                            </p>
                            <Link to="/signup" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 32px)',
                                borderRadius: '12px', backgroundColor: '#fff', color: '#7C3AED',
                                fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                            }}>
                                Join the Waitlist — It's Free
                                <ArrowRight style={{ width: '16px', height: '16px' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────── */}
            <footer style={{ borderTop: '1px solid #E5E7EB', padding: 'clamp(24px, 4vw, 40px) 0' }}>
                <div className="flex flex-col sm:flex-row" style={{
                    maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)',
                    alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <TrendingUp style={{ width: '14px', height: '14px', color: '#fff' }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>FinVault</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>© 2026 FinVault. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 24px)' }}>
                        <a href="#" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Privacy</a>
                        <a href="#" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Terms</a>
                        <a href="#" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
