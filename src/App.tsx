import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'
import { Home } from './pages/home'
import { NewReservation } from './pages/new-reservation'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/nova-reserva" Component={NewReservation} />
        </Routes>
      </Router>
    </>
  )
}

export default App
