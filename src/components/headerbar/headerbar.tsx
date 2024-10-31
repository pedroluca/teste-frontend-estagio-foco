import './headerbar.css'
import { Search, Bell, UserRound } from 'lucide-react'

export function Headerbar() {
  return (
    <header className="headerbar">
      <div className="headerbar-search">
        <Search />
        <input type="text" placeholder="Pesquise quartos e ofertas" />
      </div>
      <div className="headerbar-icons">
        <Bell />
        <UserRound />
      </div>
    </header>
  )
}