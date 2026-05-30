'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mic, ArrowRight, Lock, Mail, Zap, Shield, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const DEMO_EMAIL    = 'admin@meridianhealth.com'
const DEMO_PASSWORD = 'demo123'

const features = [
  { icon: Phone,  text: 'AI answers every call instantly' },
  { icon: Zap,    text: 'Books appointments automatically' },
  { icon: Shield, text: 'Enterprise-grade security & HIPAA ready' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      router.push('/dashboard/overview')
    } else {
      setError('Invalid credentials. Use the pre-filled demo credentials.')
      setLoading(false)
    }
  }

  // Eye toggle button rendered separately — passed as iconRight
  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPwd(!showPwd)}
      className="text-slate-500 hover:text-slate-300 transition-colors"
    >
      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  )

  return (
    <div className="min-h-screen auth-bg flex">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-glow">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg">VoiceAI</p>
            <p className="text-xs text-cyan-400">Receptionist Platform</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Powered by Inworld AI + Twilio
          </div>
          <h1 className="text-5xl font-display font-bold text-white leading-tight">
            Your AI Receptionist,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Always On
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
            Never miss a call again. Our AI answers instantly, books appointments,
            and sends WhatsApp confirmations — 24/7.
          </p>
          <div className="space-y-3">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="flex items-center gap-3 animate-slide-up"
                  style={{ animationDelay: `${200 + i * 80}ms` }}>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{f.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          {[
            { value: '99.9%',  label: 'Uptime SLA' },
            { value: '<400ms', label: 'AI Response' },
            { value: '87%',    label: 'Resolution Rate' },
          ].map((s, i) => (
            <div key={i} className="text-center p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
              <p className="text-xl font-bold text-white font-display">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right login form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-white text-xl">VoiceAI</p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-white">Welcome back</h2>
            <p className="text-slate-400 mt-1 text-sm">Sign in to your dashboard</p>
          </div>

          {/* Demo banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-cyan-400">Demo Mode</p>
              <p className="text-xs text-slate-400 mt-0.5">Credentials are pre-filled. Just click Sign In.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            {/* Password field — iconRight used instead of rightElement */}
            <Input
              label="Password"
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              iconRight={eyeButton}
              required
            />

            {error && (
              <p className="text-sm text-rose-400">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {!loading && <ArrowRight className="w-4 h-4" />}
              Sign in to Dashboard
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
