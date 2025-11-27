import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Modal from '../Components/Modal'
import Notification from '../Components/Notification'
import { useAppStore } from '../store/useAppStore'


export default function Layout() {
  const loadFromStorage = useAppStore(state => state.loadFromStorage)
 
  useEffect(() => {
    loadFromStorage()
  },[])

  return (
	<>
	 <Header />
	 <main className='container mx-auto py-16'>
	   <Outlet />
	 </main>
	 <Modal />
	 <Notification />
	</>
  )
}
