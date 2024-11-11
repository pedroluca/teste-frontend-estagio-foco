import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/dashboard'
import { NewReservation } from './pages/new-reservations/new-reservation'
import { Reservations } from './pages/reservations/reservations'
import { Sidebar } from './components/sidebar/sidebar'
import { NotFound } from './pages/not-found/not-found'
import { Headerbar } from './components/headerbar/headerbar'

function App() {

  return (
    <div className='page-holder'>
      <Router>
        <Sidebar />
        <main className='main-screen-template'>
          <Headerbar />
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/reservas" Component={Reservations} />
            <Route path="/nova-reserva" Component={NewReservation} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App