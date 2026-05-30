// Root "/" redirects immediately to dashboard
// The dashboard layout handles demo auth (always authenticated)
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/dashboard/overview')
}
