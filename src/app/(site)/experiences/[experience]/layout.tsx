import { Cormorant_Garamond } from 'next/font/google'
import Navbar from '@/components/Navbar'



export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={` flex flex-col min-h-screen`}>
      <Navbar relative redLogo red />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}