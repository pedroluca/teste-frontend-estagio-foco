import { DashboardCard } from '../../components/dashboard-card/dashboard-card'
import './dashboard.css'
import { useEffect, useState } from 'react'

export function Dashboard() {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const formatDate = (date: Date) => {
      const daysOfWeek = [
        'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
      ]
      const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ]

      const dayOfWeek = daysOfWeek[date.getDay()]
      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()

      return `${dayOfWeek}, ${day} de ${month} de ${year}`
    }

    const currentDate = new Date()
    setFormattedDate(formatDate(currentDate))
  }, [])

  return (
    <div className='dashboard-container'>
      <h1>{formattedDate}</h1>
      <main className='dashboard-body'>
        <section className='dashboard-row'>
          <DashboardCard title='Resumo'>
            <section className='resume-section'>
              <div>
                <h3>Reserva</h3>
                <p id='reservations-count'>23</p>
              </div>
              <div>
                <h3>Cancelamentos</h3>
                <p id='cancelled-reservations-count'>1</p>
              </div>
              <div>
                <h3>Pago</h3>
                <p id='paid-reservations-count'>R$12.500</p>
              </div>
              <div>
                <h3>Quartos livres</h3>
                <p id='free-rooms-count'>20</p>
              </div>
              <div>
                <h3>Quartos ocupados</h3>
                <p id='occupied-rooms-count'>80</p>
              </div>
            </section>
          </DashboardCard>
        </section>
        <section className='dashboard-row'>
          <DashboardCard title='Rooms'>
            <section>
              <div className='rooms-information-card'></div>
              <div className='rooms-information-card'></div>
              <div className='rooms-information-card'></div>
              <div className='rooms-information-card'></div>
            </section>
          </DashboardCard>
        </section>
        <section className='dashboard-row'>

          <p>olá</p>
        </section>
        <section className='dashboard-row'>

          <p>olá</p>
        </section>
      </main>
    </div>
  )
}