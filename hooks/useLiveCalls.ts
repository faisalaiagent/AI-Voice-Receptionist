// ============================================================
// useLiveCalls — simulates real-time call events
// In production: replace with Socket.IO client subscription
// ============================================================
'use client'
import { useState, useEffect, useCallback } from 'react'
import { LiveCall } from '@/types'
import { mockLiveCalls } from '@/lib/data'

export function useLiveCalls() {
  const [calls, setCalls] = useState<LiveCall[]>(mockLiveCalls)
  const [connected, setConnected] = useState(false)

  // Simulate duration ticking
  useEffect(() => {
    setConnected(true)
    const timer = setInterval(() => {
      setCalls(prev =>
        prev.map(c => ({ ...c, duration: c.duration + 1 }))
      )
    }, 1000)
    return () => { clearInterval(timer); setConnected(false) }
  }, [])

  // Simulate random call endings and new calls
  useEffect(() => {
    const names = ['+1 (555) 777-8888', '+1 (555) 999-0001', '+1 (555) 222-3333']
    const intents = ['book_appointment', 'faq', 'general_inquiry', undefined]

    const sim = setInterval(() => {
      const r = Math.random()
      if (r < 0.15 && calls.length < 6) {
        // New call comes in
        const newCall: LiveCall = {
          callSid: `CA_LIVE_${Date.now()}`,
          from: names[Math.floor(Math.random() * names.length)],
          businessId: 'b1',
          startTime: new Date().toISOString(),
          status: 'in-progress',
          intent: intents[Math.floor(Math.random() * intents.length)] as any,
          duration: 0,
        }
        setCalls(prev => [...prev, newCall])
      } else if (r < 0.25 && calls.length > 1) {
        // Random call ends
        setCalls(prev => prev.slice(1))
      }
    }, 5000)

    return () => clearInterval(sim)
  }, [calls.length])

  const endCall = useCallback((callSid: string) => {
    setCalls(prev => prev.filter(c => c.callSid !== callSid))
  }, [])

  return { calls, connected }
}
