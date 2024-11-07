// src/components/Layout.js
import { Outlet } from 'react-router-dom'
import Menu from './Menu'

const Layout = () => {
  return (
    <div className="flex w-screen h-screen font-inter font-medium pl-64">
      <Menu />
      <section className="px-10 py-6 w-full bg-white">
        <Outlet />
      </section>
    </div>
  )
}

export default Layout
