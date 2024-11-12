import MenuItem from './MenuItem'
import Barrier from '../icons/Barrier'
import Chart from '../icons/Chart'
import CreditCard from '../icons/CreditCard'
import ExitDoor from '../icons/ExitDoor'
import useAxios from '@/hooks/useAxios'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const axios = useAxios()
  const navigate = useNavigate()
  const menuItems = [
    {
      icon: Chart,
      title: 'Dashboard',
      href: '/',
    },
    {
      icon: CreditCard,
      title: 'Transactions',
      href: '/transactions',
    },
    {
      icon: Barrier,
      title: 'Budget Limits',
      href: '/budget-limits',
    },
  ]

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <aside className="w-64 py-6 px-4 h-full hidden sm:flex flex-col justify-between gap-4 transition-all duration-300 bg-[#2d3e50] text-gray-100 fixed left-0 ">
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-[#425c77] rounded-xl transition duration-300 flex items-center gap-2 hover:cursor-pointer"
        >
          <ExitDoor /> Logout
        </button>
      </div>
    </aside>
  )
}

export default Menu
