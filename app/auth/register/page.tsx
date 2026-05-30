'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mic, User, Mail, Lock, Building2, Phone, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const perks = [
  'Free 14-day trial, no credit card',
  'AI receptionist live in 5 minutes',
  'Unlimited test calls during trial',
  'Cancel anytime, no questions asked',
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    password: '', business: '', phone: '',
  })
  const [loading, setLoading] = useState(false)

  function update(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    router.push('/dashboard/overview')
  }

  return (
    <div className="min-h-screen auth-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-glow">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg">VoiceAI</p>
            <p className="text-xs text-cyan-400">Receptionist Platform</p>
          </div>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Start your free{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                14-day trial
              </span>
            </h2>
            <p className="text-slate-400 mt-3 leading-relaxed">
              Join hundreds of businesses using AI to handle their phone calls professionally.
            </p>
          </div>

          <div className="space-y-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03]">
          <p className="text-sm text-slate-400 italic leading-relaxed">
            "VoiceAI handles 300+ calls a day for our clinic. Our receptionist now focuses on
            in-person patients while the AI handles everything else."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-cyan-400">DR</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Dr. Rebecca Kim</p>
              <p className="text-[11px] text-slate-500">Coastal Medical Group</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6 animate-scale-in">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-white text-xl">VoiceAI</p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-white">Create your account</h2>
            <p className="text-slate-400 mt-1 text-sm">Get started in under 2 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="Alex" value={form.firstName}
                onChange={update('firstName')} icon={<User className="w-4 h-4" />} required />
              <Input label="Last name" placeholder="Morgan" value={form.lastName}
                onChange={update('lastName')} required />
            </div>
            <Input label="Work email" type="email" placeholder="you@company.com"
              value={form.email} onChange={update('email')} icon={<Mail className="w-4 h-4" />} required />
            <Input label="Business name" placeholder="Meridian Health"
              value={form.business} onChange={update('business')} icon={<Building2 className="w-4 h-4" />} required />
            <Input label="Business phone" type="tel" placeholder="+1 (555) 000-0000"
              value={form.phone} onChange={update('phone')} icon={<Phone className="w-4 h-4" />} required />
            <Input label="Password" type="password" placeholder="Min. 8 characters"
              value={form.password} onChange={update('password')} icon={<Lock className="w-4 h-4" />}
              hint="At least 8 characters with a number" required />

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              {!loading && <ArrowRight className="w-4 h-4" />}
              Start Free Trial
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500">
            By signing up, you agree to our{' '}
            <button className="text-cyan-400 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-cyan-400 hover:underline">Privacy Policy</button>
          </p>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
