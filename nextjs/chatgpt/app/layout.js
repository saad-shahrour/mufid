import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/Navbar/NavBar'
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mufid AI',
  description: 'نحن مفيد AI، نفتخر بتقديم أفضل وأول خدمة للدردشة على منصة التيلغرام في الوطن العربي. باستخدام تقنية GPT-3.5 turbo، نوفر لك تجربة دردشة فائقة الجودة ومتقدمة.  ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={`${inter.className} bg-gray-100` }>
        <NavBar/>
        {children}
        </body>
    </html>
  )
}
