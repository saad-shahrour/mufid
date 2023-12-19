import NavBar from '@/components/Navbar/NavBar'
import MainContent from '@/components/MainContent/MainContent'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export default async function Home() {

  const session = await getServerSession(options)

  return (
    <main className="">
      <MainContent/>
    </main>
  )
}
