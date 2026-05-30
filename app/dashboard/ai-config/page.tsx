// ============================================================
// AI CONFIG PAGE — persona, voice, behaviour settings
// ============================================================
'use client'
import { useState } from 'react'
import {
  Bot, Mic, Volume2, Zap, Shield, Clock, Play,
  Save, RotateCcw, ChevronRight, Sparkles
} from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Toggle } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { mockAISettings } from '@/lib/data'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

const VOICE_OPTIONS = [
  { value: 'aria-professional', label: 'Aria — Professional (en-US)', preview: '🎙️' },
  { value: 'james-warm', label: 'James — Warm (en-US)', preview: '🎙️' },
  { value: 'sophia-friendly', label: 'Sophia — Friendly (en-US)', preview: '🎙️' },
  { value: 'marcus-confident', label: 'Marcus — Confident (en-US)', preview: '🎙️' },
  { value: 'luna-calm', label: 'Luna — Calm (en-GB)', preview: '🎙️' },
]

const INTERRUPTION_OPTIONS = [
  { value: 'allow', label: 'Allow — Caller can interrupt AI anytime' },
  { value: 'disable', label: 'Disable — AI completes its sentence' },
  { value: 'smart', label: 'Smart — AI detects natural pauses (recommended)' },
]

const TABS = ['Persona', 'Voice & Audio', 'Behaviour', 'Handoff']

export default function AIConfigPage() {
  const { addNotification } = useStore()
  const [activeTab, setActiveTab] = useState('Persona')
  const [settings, setSettings] = useState(mockAISettings)
  const [testing, setTesting] = useState(false)
  const [saving, setSaving] = useState(false)

  const update = (key: string, value: any) =>
    setSettings(s => ({ ...s, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 900))
    setSaving(false)
    addNotification({
      type: 'success',
      title: 'AI Configuration saved',
      message: 'Changes will apply to the next incoming call.',
    })
  }

  const handleTest = async () => {
    setTesting(true)
    await new Promise(r => setTimeout(r, 2000))
    setTesting(false)
    addNotification({
      type: 'info',
      title: 'Test call initiated',
      message: 'Check your phone — AI is calling you now.',
    })
  }

  const handleReset = () => {
    setSettings(mockAISettings)
    addNotification({ type: 'info', title: 'Settings reset to defaults' })
  }

  return (
    <div className="dashboard-page">
      <TopBar
        title="AI Configuration"
        subtitle={`Persona: ${settings.personaName} · Voice: ${settings.voice}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={<RotateCcw size={13} />} onClick={handleReset}>
              Reset
            </Button>
            <Button variant="secondary" size="sm" icon={<Play size={13} />} loading={testing} onClick={handleTest}>
              Test Call
            </Button>
            <Button variant="primary" size="sm" icon={<Save size={13} />} loading={saving} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Tab bar */}
        <div className="flex gap-1 bg-[#0D1B35] border border-[rgba(6,182,212,0.08)] rounded-xl p-1 w-fit">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                  : 'text-[#435A7A] hover:text-[#7B9CC4]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── PERSONA TAB ── */}
        {activeTab === 'Persona' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-cyan-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Identity</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="AI Name"
                  value={settings.personaName}
                  onChange={e => update('personaName', e.target.value)}
                  hint="Callers will hear this name in the greeting"
                  icon={<Sparkles size={13} />}
                />
                <Select
                  label="Language"
                  value={settings.language}
                  onChange={e => update('language', e.target.value)}
                  options={[
                    { value: 'en-US', label: '🇺🇸 English (US)' },
                    { value: 'en-GB', label: '🇬🇧 English (UK)' },
                    { value: 'es-ES', label: '🇪🇸 Spanish (ES)' },
                    { value: 'fr-FR', label: '🇫🇷 French (FR)' },
                    { value: 'de-DE', label: '🇩🇪 German (DE)' },
                  ]}
                />
                <Textarea
                  label="Greeting Message"
                  value={settings.greeting}
                  onChange={e => update('greeting', e.target.value)}
                  rows={3}
                  hint="First thing the AI says when a call is answered"
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Personality</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <Textarea
                  label="Personality Instructions"
                  value={settings.personality}
                  onChange={e => update('personality', e.target.value)}
                  rows={5}
                  hint="Describe the tone, style, and behaviour of the AI"
                />
                <Textarea
                  label="Fallback Message"
                  value={settings.fallbackMsg}
                  onChange={e => update('fallbackMsg', e.target.value)}
                  rows={3}
                  hint="What to say when the AI doesn't understand"
                />
              </CardBody>
            </Card>

            {/* Live preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Greeting Preview</h3>
              </CardHeader>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {settings.personaName[0]}
                  </div>
                  <div className="flex-1 bg-[#0F1F3D] rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-sm text-[#F0F6FF] leading-relaxed">{settings.greeting}</p>
                    {/* Voice wave animation */}
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map(n => (
                        <div key={n} className="wave-bar" style={{ height: `${8 + n * 3}px`, animationDelay: `${n * 0.1}s` }} />
                      ))}
                      <span className="text-[10px] text-[#435A7A] ml-2">AI speaking…</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* ── VOICE & AUDIO TAB ── */}
        {activeTab === 'Voice & Audio' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mic size={16} className="text-cyan-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Voice Selection</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-2">
                {VOICE_OPTIONS.map(v => (
                  <button
                    key={v.value}
                    onClick={() => update('voice', v.value)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left',
                      settings.voice === v.value
                        ? 'border-cyan-500/40 bg-cyan-500/08 text-[#F0F6FF]'
                        : 'border-[rgba(6,182,212,0.08)] bg-[#0F1F3D] text-[#7B9CC4] hover:border-[rgba(6,182,212,0.2)] hover:text-[#F0F6FF]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{v.preview}</span>
                      <span className="text-sm">{v.label}</span>
                    </div>
                    {settings.voice === v.value && (
                      <div className="flex items-center gap-1">
                        {[1,2,3].map(n => (
                          <div key={n} className="wave-bar h-4" style={{ animationDelay: `${n*0.1}s` }} />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-violet-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Audio Settings</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-[#7B9CC4] block mb-1.5">
                    Silence Detection Timeout: {settings.silenceTimeout / 1000}s
                  </label>
                  <input
                    type="range" min="1000" max="6000" step="500"
                    value={settings.silenceTimeout}
                    onChange={e => update('silenceTimeout', parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-[#1A2B52] appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-[#435A7A] mt-1">
                    <span>1s (responsive)</span><span>6s (patient)</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#7B9CC4] block mb-1.5">
                    Max Call Duration: {settings.maxCallDuration / 60}min
                  </label>
                  <input
                    type="range" min="120" max="1200" step="60"
                    value={settings.maxCallDuration}
                    onChange={e => update('maxCallDuration', parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-[#1A2B52] appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-[#435A7A] mt-1">
                    <span>2 min</span><span>20 min</span>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <Toggle
                    label="Enable Call Recording"
                    description="Store audio recordings in S3"
                    checked={settings.enableRecording}
                    onChange={v => update('enableRecording', v)}
                  />
                  <Toggle
                    label="Generate Transcripts"
                    description="AI-powered full call transcription"
                    checked={settings.enableTranscript}
                    onChange={v => update('enableTranscript', v)}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* ── BEHAVIOUR TAB ── */}
        {activeTab === 'Behaviour' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-amber-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Core Features</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <Toggle
                  label="Appointment Booking"
                  description="AI can check slots and create bookings"
                  checked={settings.enableBooking}
                  onChange={v => update('enableBooking', v)}
                />
                <Toggle
                  label="FAQ Answering"
                  description="AI uses your knowledge base to answer questions"
                  checked={settings.enableFAQs}
                  onChange={v => update('enableFAQs', v)}
                />
                <Select
                  label="Interruption Handling"
                  value={settings.interruptionMode}
                  onChange={e => update('interruptionMode', e.target.value)}
                  options={INTERRUPTION_OPTIONS}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Timings & Limits</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="p-3 rounded-xl bg-[#0F1F3D] border border-[rgba(6,182,212,0.08)]">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#7B9CC4]">Max call duration</span>
                    <span className="font-semibold text-[#F0F6FF]">{settings.maxCallDuration / 60} min</span>
                  </div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#7B9CC4]">Silence timeout</span>
                    <span className="font-semibold text-[#F0F6FF]">{settings.silenceTimeout / 1000}s</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7B9CC4]">Interruption mode</span>
                    <Badge className="bg-cyan-500/10 text-cyan-400 capitalize">{settings.interruptionMode}</Badge>
                  </div>
                </div>
                <div className="text-xs text-[#435A7A] leading-relaxed p-3 rounded-xl bg-amber-500/05 border border-amber-500/15">
                  ⚡ Tip: Set a shorter silence timeout (2-3s) for fast-paced businesses. Use 4-5s for medical or legal where callers think longer.
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* ── HANDOFF TAB ── */}
        {activeTab === 'Handoff' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-rose-400" />
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Human Handoff</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#7B9CC4] block mb-2">
                    Trigger Keywords
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {settings.handoffKeywords.map(kw => (
                      <span key={kw} className="tag-chip flex items-center gap-1.5">
                        {kw}
                        <button
                          onClick={() => update('handoffKeywords', settings.handoffKeywords.filter(k => k !== kw))}
                          className="text-[#435A7A] hover:text-rose-400 transition-colors"
                        >×</button>
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add keyword and press Enter…"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        update('handoffKeywords', [...settings.handoffKeywords, e.currentTarget.value.trim()])
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>
                <Input
                  label="Transfer Phone Number"
                  placeholder="+1 (555) 000-0000"
                  hint="Calls will be warm-transferred to this number"
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">How it works</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {[
                    { step: '1', text: 'Caller says a trigger keyword like "speak to a human"', color: 'bg-cyan-500' },
                    { step: '2', text: 'AI acknowledges and prepares the warm transfer', color: 'bg-violet-500' },
                    { step: '3', text: 'AI briefs the agent with call summary before connecting', color: 'bg-emerald-500' },
                    { step: '4', text: 'Call is transferred · transcript saved automatically', color: 'bg-amber-500' },
                  ].map(item => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5', item.color)}>
                        {item.step}
                      </div>
                      <p className="text-xs text-[#7B9CC4] leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
