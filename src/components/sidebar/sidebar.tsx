import './sidebar.css'
import { CircleDollarSign, House, SquarePen } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className='sidebar'>
      <header className='sidebar-header'>
        ReservaFácil
      </header>
      <main className='sidebar-main'>
        <NavLink to='/' className='sidebar-link'>
          <House />
          Dashboard
        </NavLink>
        <NavLink to='/nova-reserva' className='sidebar-link'>
          <SquarePen />
          Recepção
        </NavLink>
        <NavLink to='/reservas' className='sidebar-link'>
          <CircleDollarSign />
          Reservas
        </NavLink>
      </main>
    </aside>
  )
}