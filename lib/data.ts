// ================================================================
// MOCK DATA — Production-ready demo data for all dashboard pages
// In production: replace each export with real API calls
// ================================================================
import type {
  AnalyticsOverview, Call, Appointment, FAQ, AISetting,
  WhatsAppLog, LiveCall, ChartPoint, PieSlice, Transcript,
} from '@/types'

// ─── ANALYTICS ──────────────────────────────────────────────
export const mockAnalytics: AnalyticsOverview = {
  callsToday: 147, callsTodayDelta: 12,
  appointmentsToday: 34, appointmentsTodayDelta: 8,
  resolutionRate: 87.4, resolutionRateDelta: 3.2,
  avgHandleTime: 154, avgHandleTimeDelta: -12,
  activeCalls: 3,
}

export const mockCallVolume: ChartPoint[] = [
  { hour: '6am', calls: 4,  appointments: 1  },
  { hour: '7am', calls: 12, appointments: 3  },
  { hour: '8am', calls: 28, appointments: 8  },
  { hour: '9am', calls: 45, appointments: 14 },
  { hour: '10am',calls: 38, appointments: 11 },
  { hour: '11am',calls: 52, appointments: 16 },
  { hour: '12pm',calls: 31, appointments: 7  },
  { hour: '1pm', calls: 24, appointments: 6  },
  { hour: '2pm', calls: 41, appointments: 12 },
  { hour: '3pm', calls: 48, appointments: 15 },
  { hour: '4pm', calls: 35, appointments: 9  },
  { hour: '5pm', calls: 22, appointments: 5  },
  { hour: '6pm', calls: 14, appointments: 3  },
]

export const mockIntentData: PieSlice[] = [
  { name: 'Book Appointment', value: 42, color: '#06B6D4' },
  { name: 'FAQ / Info',       value: 31, color: '#8B5CF6' },
  { name: 'General Inquiry',  value: 18, color: '#10B981' },
  { name: 'Human Handoff',    value: 7,  color: '#F59E0B' },
  { name: 'Other',            value: 2,  color: '#6B7280' },
]

// ─── LIVE CALLS ─────────────────────────────────────────────
export const mockLiveCalls: LiveCall[] = [
  { callSid: 'CA_LIVE_001', from: '+1 (555) 111-2222', businessId: 'b1',
    startTime: new Date(Date.now() - 45000).toISOString(), status: 'in-progress', intent: 'book_appointment', duration: 45 },
  { callSid: 'CA_LIVE_002', from: '+1 (555) 333-4444', businessId: 'b1',
    startTime: new Date(Date.now() - 118000).toISOString(), status: 'in-progress', intent: 'faq', duration: 118 },
  { callSid: 'CA_LIVE_003', from: '+1 (555) 555-6666', businessId: 'b1',
    startTime: new Date(Date.now() - 23000).toISOString(), status: 'in-progress', intent: undefined, duration: 23 },
]

// ─── CALLS ──────────────────────────────────────────────────
export const mockCalls: Call[] = [
  { _id:'c1', businessId:'b1', callSid:'CA1234567890abcdef', from:'+1 (555) 234-5678', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:187,
    startTime: new Date(Date.now()-900000).toISOString(), endTime: new Date(Date.now()-720000).toISOString(),
    intent:'book_appointment', resolution:'resolved', sentiment:'positive', appointmentId:'a1',
    createdAt: new Date(Date.now()-900000).toISOString() },
  { _id:'c2', businessId:'b1', callSid:'CA2345678901bcdefg', from:'+1 (555) 345-6789', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:94,
    startTime: new Date(Date.now()-1920000).toISOString(), endTime: new Date(Date.now()-1800000).toISOString(),
    intent:'faq', resolution:'resolved', sentiment:'neutral',
    createdAt: new Date(Date.now()-1920000).toISOString() },
  { _id:'c3', businessId:'b1', callSid:'CA3456789012cdefgh', from:'+1 (555) 456-7890', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:312,
    startTime: new Date(Date.now()-3480000).toISOString(), endTime: new Date(Date.now()-3180000).toISOString(),
    intent:'human_handoff', resolution:'transferred', sentiment:'negative',
    createdAt: new Date(Date.now()-3480000).toISOString() },
  { _id:'c4', businessId:'b1', callSid:'CA4567890123defghi', from:'+1 (555) 567-8901', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:145,
    startTime: new Date(Date.now()-5400000).toISOString(), endTime: new Date(Date.now()-5220000).toISOString(),
    intent:'book_appointment', resolution:'resolved', sentiment:'positive', appointmentId:'a2',
    createdAt: new Date(Date.now()-5400000).toISOString() },
  { _id:'c5', businessId:'b1', callSid:'CA5678901234efghij', from:'+1 (555) 678-9012', to:'+1 (800) 555-0100',
    status:'no-answer', direction:'inbound', duration:0,
    startTime: new Date(Date.now()-7200000).toISOString(),
    intent:'other', resolution:'abandoned', sentiment:'neutral',
    createdAt: new Date(Date.now()-7200000).toISOString() },
  { _id:'c6', businessId:'b1', callSid:'CA6789012345fghijk', from:'+1 (555) 789-0123', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:223,
    startTime: new Date(Date.now()-8700000).toISOString(), endTime: new Date(Date.now()-8460000).toISOString(),
    intent:'faq', resolution:'resolved', sentiment:'positive',
    createdAt: new Date(Date.now()-8700000).toISOString() },
  { _id:'c7', businessId:'b1', callSid:'CA7890123456ghijkl', from:'+1 (555) 890-1234', to:'+1 (800) 555-0100',
    status:'completed', direction:'inbound', duration:167,
    startTime: new Date(Date.now()-10800000).toISOString(), endTime: new Date(Date.now()-10620000).toISOString(),
    intent:'book_appointment', resolution:'resolved', sentiment:'positive', appointmentId:'a3',
    createdAt: new Date(Date.now()-10800000).toISOString() },
  { _id:'c8', businessId:'b1', callSid:'CA8901234567hijklm', from:'+1 (555) 901-2345', to:'+1 (800) 555-0100',
    status:'busy', direction:'inbound', duration:0,
    startTime: new Date(Date.now()-12600000).toISOString(),
    intent:'other', resolution:'abandoned', sentiment:'neutral',
    createdAt: new Date(Date.now()-12600000).toISOString() },
]

// ─── APPOINTMENTS ────────────────────────────────────────────
export const mockAppointments: Appointment[] = [
  { _id:'a1', businessId:'b1', callId:'c1', customerName:'Sarah Johnson',
    customerPhone:'+1 (555) 234-5678', customerEmail:'sarah@example.com',
    service:'Annual Check-up', date: new Date(Date.now()+86400000).toISOString(),
    startTime:'10:00', endTime:'10:30', duration:30, status:'confirmed',
    reminderSent:false, confirmationSent:true, createdBy:'ai',
    createdAt: new Date(Date.now()-900000).toISOString() },
  { _id:'a2', businessId:'b1', callId:'c4', customerName:'Marcus Chen',
    customerPhone:'+1 (555) 567-8901', customerEmail:'marcus@example.com',
    service:'Consultation', date: new Date(Date.now()+172800000).toISOString(),
    startTime:'14:00', endTime:'14:45', duration:45, status:'confirmed',
    reminderSent:false, confirmationSent:true, createdBy:'ai',
    createdAt: new Date(Date.now()-5400000).toISOString() },
  { _id:'a3', businessId:'b1', callId:'c7', customerName:'Emily Rodriguez',
    customerPhone:'+1 (555) 890-1234',
    service:'Follow-up Visit', date: new Date(Date.now()+259200000).toISOString(),
    startTime:'09:00', endTime:'09:30', duration:30, status:'pending',
    reminderSent:false, confirmationSent:false, createdBy:'ai',
    createdAt: new Date(Date.now()-10800000).toISOString() },
  { _id:'a4', businessId:'b1', customerName:'David Kim',
    customerPhone:'+1 (555) 012-3456',
    service:'Initial Consultation', date: new Date(Date.now()-7200000).toISOString(),
    startTime:'11:00', endTime:'11:30', duration:30, status:'completed',
    reminderSent:true, confirmationSent:true, createdBy:'agent',
    createdAt: new Date(Date.now()-86400000).toISOString() },
  { _id:'a5', businessId:'b1', customerName:'Priya Patel',
    customerPhone:'+1 (555) 234-5670',
    service:'Annual Review', date: new Date(Date.now()-18000000).toISOString(),
    startTime:'15:30', endTime:'16:00', duration:30, status:'no_show',
    reminderSent:true, confirmationSent:true, createdBy:'ai',
    createdAt: new Date(Date.now()-172800000).toISOString() },
  { _id:'a6', businessId:'b1', customerName:'James Wilson',
    customerPhone:'+1 (555) 345-6780',
    service:'Dental Cleaning', date: new Date(Date.now()+432000000).toISOString(),
    startTime:'13:00', endTime:'14:00', duration:60, status:'confirmed',
    reminderSent:false, confirmationSent:true, createdBy:'ai',
    createdAt: new Date(Date.now()-3600000).toISOString() },
]

// ─── FAQs ─────────────────────────────────────────────────────
export const mockFAQs: FAQ[] = [
  { _id:'f1', businessId:'b1', question:'What are your office hours?',
    answer:'We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays.',
    category:'General', tags:['hours','schedule','open'], priority:10, isActive:true, hitCount:234,
    createdAt: new Date(Date.now()-2592000000).toISOString() },
  { _id:'f2', businessId:'b1', question:'How do I reschedule my appointment?',
    answer:"You can reschedule by calling us at least 24 hours in advance, or by replying RESCHEDULE to your WhatsApp confirmation. Our AI will find the next available slot.",
    category:'Appointments', tags:['reschedule','appointment','cancel'], priority:9, isActive:true, hitCount:187,
    createdAt: new Date(Date.now()-2160000000).toISOString() },
  { _id:'f3', businessId:'b1', question:'Do you accept insurance?',
    answer:'Yes, we accept most major insurance plans including BlueCross BlueShield, Aetna, United Healthcare, and Cigna. Please bring your insurance card to your appointment.',
    category:'Billing', tags:['insurance','payment','coverage'], priority:8, isActive:true, hitCount:156,
    createdAt: new Date(Date.now()-1728000000).toISOString() },
  { _id:'f4', businessId:'b1', question:'Where are you located?',
    answer:'We are located at 123 Medical Center Drive, Suite 400, New York, NY 10001. Free parking is available in the building garage.',
    category:'General', tags:['location','address','directions','parking'], priority:7, isActive:true, hitCount:142,
    createdAt: new Date(Date.now()-1296000000).toISOString() },
  { _id:'f5', businessId:'b1', question:'What should I bring to my first appointment?',
    answer:'Please bring: (1) Photo ID, (2) Insurance card, (3) List of current medications, (4) Medical history records if available, (5) Any referral paperwork. Arrive 15 minutes early.',
    category:'Appointments', tags:['first visit','documents','new patient'], priority:6, isActive:true, hitCount:98,
    createdAt: new Date(Date.now()-864000000).toISOString() },
  { _id:'f6', businessId:'b1', question:'How long is a typical appointment?',
    answer:'New patient consultations are 45–60 minutes. Follow-up visits are typically 20–30 minutes. Annual check-ups are 30 minutes. Procedures vary — please ask when scheduling.',
    category:'Appointments', tags:['duration','time','how long'], priority:5, isActive:true, hitCount:76,
    createdAt: new Date(Date.now()-432000000).toISOString() },
  { _id:'f7', businessId:'b1', question:'What payment methods do you accept?',
    answer:'We accept cash, all major credit/debit cards (Visa, Mastercard, Amex, Discover), HSA/FSA cards, and checks. Payment is due at time of service.',
    category:'Billing', tags:['payment','credit card','cash','HSA'], priority:4, isActive:true, hitCount:54,
    createdAt: new Date(Date.now()-216000000).toISOString() },
  { _id:'f8', businessId:'b1', question:'Do you offer telehealth appointments?',
    answer:'Yes! We offer telehealth consultations for follow-up visits, prescription renewals, and minor concerns. Book through our AI receptionist or mention telehealth when scheduling.',
    category:'General', tags:['telehealth','virtual','online'], priority:3, isActive:false, hitCount:32,
    createdAt: new Date(Date.now()-86400000).toISOString() },
]

// ─── AI SETTINGS ─────────────────────────────────────────────
export const mockAISettings: AISetting = {
  _id:'ai1', businessId:'b1', personaName:'Aria', voice:'aria-professional',
  language:'en-US',
  greeting:"Hello! Thank you for calling Meridian Health. I'm Aria, your AI receptionist. How can I help you today?",
  personality:"Professional, warm, and empathetic. Always be concise and clear. Use the customer's name when known. Show genuine care. Offer to help with next steps proactively.",
  fallbackMsg:"I'm not sure I fully understood that. Could you rephrase your question? Or I can transfer you to our team for further assistance.",
  maxCallDuration:600, silenceTimeout:3000, interruptionMode:'smart',
  handoffKeywords:['speak to someone','human','representative','manager','supervisor','real person'],
  enableBooking:true, enableFAQs:true, enableRecording:true, enableTranscript:true,
  createdAt: new Date(Date.now()-5184000000).toISOString(),
}

// ─── WHATSAPP LOGS ───────────────────────────────────────────
export const mockWhatsApp: WhatsAppLog[] = [
  { _id:'w1', businessId:'b1', to:'+1 (555) 234-5678', from:'whatsapp:+14155238886',
    messageType:'appointment_confirmation',
    body:"Hi Sarah! ✅ Your appointment at Meridian Health is confirmed.\n📅 Tomorrow at 10:00 AM\n🏥 Service: Annual Check-up\nReply CANCEL to cancel.",
    messageSid:'SM1234567890abcdef', status:'delivered', appointmentId:'a1', callId:'c1',
    sentAt: new Date(Date.now()-840000).toISOString(), deliveredAt: new Date(Date.now()-780000).toISOString() },
  { _id:'w2', businessId:'b1', to:'+1 (555) 567-8901', from:'whatsapp:+14155238886',
    messageType:'appointment_confirmation',
    body:"Hi Marcus! ✅ Your appointment at Meridian Health is confirmed.\n📅 Day after tomorrow at 2:00 PM\n🏥 Service: Consultation\nReply CANCEL to cancel.",
    messageSid:'SM2345678901bcdefg', status:'read', appointmentId:'a2', callId:'c4',
    sentAt: new Date(Date.now()-5340000).toISOString(), deliveredAt: new Date(Date.now()-5280000).toISOString() },
  { _id:'w3', businessId:'b1', to:'+1 (555) 012-3456', from:'whatsapp:+14155238886',
    messageType:'reminder',
    body:"⏰ Reminder: David, you have an appointment today at 11:00 AM at Meridian Health. Please arrive 10 minutes early.",
    messageSid:'SM3456789012cdefgh', status:'delivered', appointmentId:'a4',
    sentAt: new Date(Date.now()-10800000).toISOString(), deliveredAt: new Date(Date.now()-10770000).toISOString() },
  { _id:'w4', businessId:'b1', to:'+1 (555) 234-5670', from:'whatsapp:+14155238886',
    messageType:'reminder',
    body:"⏰ Reminder: Priya, you have an appointment today at 3:30 PM at Meridian Health.",
    messageSid:'SM4567890123defghi', status:'delivered', appointmentId:'a5',
    sentAt: new Date(Date.now()-21600000).toISOString(), deliveredAt: new Date(Date.now()-21570000).toISOString() },
  { _id:'w5', businessId:'b1', to:'+1 (555) 890-1234', from:'whatsapp:+14155238886',
    messageType:'appointment_confirmation',
    body:"Hi Emily! ✅ Your appointment at Meridian Health is confirmed.\n📅 In 3 days at 9:00 AM\n🏥 Service: Follow-up Visit",
    messageSid:'SM5678901234efghij', status:'sent', appointmentId:'a3', callId:'c7',
    sentAt: new Date(Date.now()-10740000).toISOString() },
]

// ─── TRANSCRIPT ──────────────────────────────────────────────
export const mockTranscript: Transcript = {
  _id:'t1', callId:'c1', businessId:'b1', duration:187,
  keywords:['annual check-up','appointment','tomorrow','10am'],
  summary:"Customer Sarah Johnson called to book an annual check-up. Successfully scheduled for tomorrow at 10:00 AM. WhatsApp confirmation sent. Resolved on first contact.",
  createdAt: new Date(Date.now()-720000).toISOString(),
  messages:[
    { role:'assistant', content:"Hello! Thank you for calling Meridian Health. I'm Aria, your AI receptionist. How can I help you today?",
      timestamp: new Date(Date.now()-900000).toISOString() },
    { role:'user', content:"Hi, I'd like to book an appointment for a check-up.",
      timestamp: new Date(Date.now()-893000).toISOString() },
    { role:'assistant', content:"Of course! I'd be happy to help you schedule an annual check-up. May I have your name please?",
      timestamp: new Date(Date.now()-890000).toISOString(), intent:'book_appointment' },
    { role:'user', content:"It's Sarah Johnson.",
      timestamp: new Date(Date.now()-884000).toISOString() },
    { role:'assistant', content:"Great, Sarah! Do you have a preferred date and time for your appointment?",
      timestamp: new Date(Date.now()-881000).toISOString() },
    { role:'user', content:"Tomorrow morning if possible, around 10 AM.",
      timestamp: new Date(Date.now()-875000).toISOString() },
    { role:'assistant', content:"I have a slot available tomorrow at 10:00 AM for your annual check-up. Shall I confirm that booking for you?",
      timestamp: new Date(Date.now()-870000).toISOString() },
    { role:'user', content:"Yes, please!",
      timestamp: new Date(Date.now()-864000).toISOString() },
    { role:'assistant', content:"Your appointment has been confirmed for tomorrow at 10:00 AM. I'll send you a WhatsApp confirmation now. Is there anything else I can help you with?",
      timestamp: new Date(Date.now()-859000).toISOString() },
    { role:'user', content:"No, that's all. Thank you!",
      timestamp: new Date(Date.now()-854000).toISOString() },
    { role:'assistant', content:"You're welcome, Sarah! Have a wonderful day and we'll see you tomorrow at 10 AM. Goodbye!",
      timestamp: new Date(Date.now()-849000).toISOString() },
  ],
}

// ─── SUBSCRIPTION PLANS ──────────────────────────────────────
export const plans = [
  { id:'free',       name:'Free',       price:0,   popular:false,
    desc:'Perfect for trying out the platform',
    features:['50 calls/month','100 minutes','20 WhatsApp messages','10 FAQs','1 team member','Basic analytics'],
    limits:{ calls:50, minutes:100, whatsapp:20, faqs:10, users:1 } },
  { id:'starter',    name:'Starter',    price:49,  popular:false,
    desc:'For small businesses getting started',
    features:['500 calls/month','1,000 minutes','200 WhatsApp messages','50 FAQs','3 team members','Advanced analytics','Call recordings'],
    limits:{ calls:500, minutes:1000, whatsapp:200, faqs:50, users:3 } },
  { id:'pro',        name:'Pro',        price:149, popular:true,
    desc:'For growing businesses with high call volume',
    features:['2,000 calls/month','5,000 minutes','1,000 WhatsApp messages','Unlimited FAQs','10 team members','Priority AI processing','Custom AI persona','API access'],
    limits:{ calls:2000, minutes:5000, whatsapp:1000, faqs:999, users:10 } },
  { id:'enterprise', name:'Enterprise', price:499, popular:false,
    desc:'For large organizations with custom needs',
    features:['Unlimited calls','Unlimited minutes','Unlimited WhatsApp','Unlimited FAQs','Unlimited users','Custom integrations','Dedicated support','SLA guarantee'],
    limits:{ calls:999999, minutes:999999, whatsapp:999999, faqs:999999, users:999999 } },
]

export const mockUsage = {
  calls:    { used:1247, limit:2000 },
  minutes:  { used:3412, limit:5000 },
  whatsapp: { used:347,  limit:1000 },
}

// ─── COMPATIBILITY ALIASES ───────────────────────────────────
// So pages can import either name without breaking
export const subscriptionPlans = plans
export const mockWhatsAppLogs  = mockWhatsApp

// ─── HELPER UTILITIES ────────────────────────────────────────
/** Format seconds → "2m 34s" */
export function formatDuration(seconds: number): string {
  if (!seconds) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

/** Calculate usage percentage clamped 0-100 */
export function usagePct(used: number, limit: number): number {
  if (!limit) return 0
  return Math.min(Math.round((used / limit) * 100), 100)
}
