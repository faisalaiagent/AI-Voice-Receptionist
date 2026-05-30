// ================================================================
// GLOBAL TYPE DEFINITIONS — AI Voice Receptionist Platform
// ================================================================

export type UserRole   = 'super_admin' | 'business_admin' | 'agent' | 'viewer'
export type Plan       = 'free' | 'starter' | 'pro' | 'enterprise'
export type CallStatus = 'initiated' | 'ringing' | 'in-progress' | 'completed' | 'failed' | 'busy' | 'no-answer'
export type Intent     = 'book_appointment' | 'faq' | 'human_handoff' | 'general_inquiry' | 'other'
export type Resolution = 'resolved' | 'transferred' | 'voicemail' | 'abandoned'
export type ApptStatus = 'pending' | 'confirmed' | 'cancelled' | 'no_show' | 'completed'
export type MsgStatus  = 'queued' | 'sent' | 'delivered' | 'read' | 'failed'
export type Sentiment  = 'positive' | 'neutral' | 'negative'

export interface User {
  _id: string; email: string; firstName: string; lastName: string
  role: UserRole; businessId: string; avatar?: string
  isActive: boolean; lastLogin: string; createdAt: string
}

export interface Business {
  _id: string; name: string; slug: string; phone: string
  whatsappNum?: string; industry: string; timezone: string
  plan: Plan; isActive: boolean; settings: BusinessSettings; createdAt: string
}

export interface BusinessSettings {
  workingHours: WorkingHour[]; language: string; transferNumber?: string
}

export interface WorkingHour {
  day: number; open: string; close: string; isOpen: boolean
}

export interface Call {
  _id: string; businessId: string; callSid: string
  from: string; to: string; status: CallStatus
  direction: 'inbound' | 'outbound'; duration: number
  startTime: string; endTime?: string
  recordingUrl?: string; transcriptId?: string; appointmentId?: string
  intent: Intent; resolution?: Resolution; sentiment?: Sentiment; createdAt: string
}

export interface TranscriptMsg {
  role: 'user' | 'assistant'; content: string; timestamp: string; intent?: string
}

export interface Transcript {
  _id: string; callId: string; businessId: string
  messages: TranscriptMsg[]; summary?: string
  keywords?: string[]; duration: number; createdAt: string
}

export interface Appointment {
  _id: string; businessId: string; callId?: string
  customerName: string; customerPhone: string; customerEmail?: string
  service: string; date: string; startTime: string; endTime: string
  duration: number; status: ApptStatus; notes?: string
  reminderSent: boolean; confirmationSent: boolean
  createdBy: 'ai' | 'agent' | 'admin'; createdAt: string
}

export interface FAQ {
  _id: string; businessId: string; question: string; answer: string
  category: string; tags: string[]; priority: number
  isActive: boolean; hitCount: number; createdAt: string
}

export interface AISetting {
  _id: string; businessId: string; personaName: string; voice: string
  language: string; greeting: string; personality: string; fallbackMsg: string
  maxCallDuration: number; silenceTimeout: number
  interruptionMode: 'allow' | 'disable' | 'smart'
  handoffKeywords: string[]; enableBooking: boolean; enableFAQs: boolean
  enableRecording: boolean; enableTranscript: boolean; createdAt: string
}

export interface WhatsAppLog {
  _id: string; businessId: string; to: string; from: string
  messageType: 'appointment_confirmation' | 'reminder' | 'follow_up' | 'custom'
  body: string; messageSid: string; status: MsgStatus
  appointmentId?: string; callId?: string; sentAt: string; deliveredAt?: string
}

export interface LiveCall {
  callSid: string; from: string; businessId: string; startTime: string
  status: 'in-progress'; intent?: string; duration: number
}

export interface AnalyticsOverview {
  callsToday: number; callsTodayDelta: number
  appointmentsToday: number; appointmentsTodayDelta: number
  resolutionRate: number; resolutionRateDelta: number
  avgHandleTime: number; avgHandleTimeDelta: number; activeCalls: number
}

// Chart data types — exported with multiple names for compatibility
export interface ChartPoint { hour: string; calls: number; appointments: number }
export interface PieSlice   { name: string; value: number; color: string }

// Aliases used by chart components
export type CallVolumeData = ChartPoint
export type IntentData     = PieSlice
