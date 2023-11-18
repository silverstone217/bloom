import type { Metadata } from 'next'
import { Inter, Merriweather_Sans } from 'next/font/google'
import './globals.css'
import Provider from '@/components/provider/next-auth-provider'
import ToastContainerNotif from '@/components/ToasContainerNotif'


const inter = Merriweather_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloom',
  description: 'Blog website for intrutive content, sharing opinions and views with others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Provider>
           {children}
        </Provider>
        <ToastContainerNotif/>
      </body>
    </html>
  )
}
