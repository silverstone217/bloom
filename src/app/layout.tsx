import type { Metadata } from 'next'
import { Merriweather_Sans } from 'next/font/google'
import './globals.css'
import Provider from '@/components/provider/next-auth-provider'
import ToastContainerNotif from '@/components/ToasContainerNotif'


const inter = Merriweather_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloom',
  description: 'Blog website for intrutive content, sharing opinions and views with others. Build your specific contents, and share with people, become also an author.',
  verification : {
    google : "C2Vig2VHB0RzzQLqTqimzndGoZfV8fmCNYI1yMD9rHI",
    yandex: "0b10762e19895ec3",
  },
  icons: {
    icon: '/favicon.ico',
  },
  category:"blog",
  creator : "Stephane Mfuni",
  keywords : "react, nextjs, blog, author, content",
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
