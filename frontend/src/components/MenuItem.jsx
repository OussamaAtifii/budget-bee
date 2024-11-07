import { Link, useLocation } from 'react-router-dom'

const MenuItem = ({ icon: Icon, title, href }) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={href}
      className={`p-2 hover:bg-[#425c77] rounded-xl transition duration-300 flex items-center gap-2 hover:cursor-pointer ${
        href === pathname ? 'bg-[#425c77]' : ''
      }`}
    >
      <Icon className="size-6" />
      <span>{title}</span>
    </Link>
  )
}

export default MenuItem
