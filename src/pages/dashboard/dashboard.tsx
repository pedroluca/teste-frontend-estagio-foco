import { Calendar, MoreVerticalIcon } from 'lucide-react'
import { DashboardCard } from '../../components/dashboard-card/dashboard-card'
import { StatusField } from '../../components/status-field/status-field'
import './dashboard.css'
import { useEffect, useState } from 'react'
import { MainButton } from '../../components/main-button/main-button'
import { SecondButton } from '../../components/second-button/second-button'
import { Link } from 'react-router-dom'

interface Resume {
  reserves: number
  canceled: number
  paid: number
  available_rooms: number
  occupied_rooms: number
}

interface Accommodation {
  total: number
  reserved: number
}

interface Room {
  id: string
  name: string
  accommodations: Accommodation
  pricing: number
  offers: number
}

interface Status {
  total: number
  clean: number
  dirty: number
  inspected: number
}

interface RoomStatus {
  occupied_rooms: Status
  available_rooms: Status
}

interface OccupancyStatistics {
  date: string
  occupancy_rate: number
}

interface Review {
  name: string
  date: string
  rating: number
  comment: string
}

interface DashboardData {
  resume: Resume
  rooms: Room[]
  rooms_status: RoomStatus
  occupancy_rate: number
  occupancy_statistics: OccupancyStatistics[]
  reviews: Review[]
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./src/mock/dashboard.json')
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])

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
      <h1>
        <MainButton className='hidden-button'>Criar reserva</MainButton>
        {formattedDate}
        <MainButton>
          <Link to='/nova-reserva' className='new-reservation-button'>Criar reserva</Link>
        </MainButton>
      </h1>
      <main className='dashboard-body'>
        <section className='dashboard-row'>
          <DashboardCard title='Resumo'>
            <section className='resume-section'>
              <div>
                <h3>Reserva</h3>
                <p id='reservations-count'>{data?.resume.reserves}</p>
              </div>
              <div>
                <h3>Cancelamentos</h3>
                <p id='cancelled-reservations-count'>{data?.resume.canceled}</p>
              </div>
              <div>
                <h3>Pago</h3>
                <p id='paid-reservations-count'>R${data?.resume.paid}</p>
              </div>
              <div>
                <h3>Quartos livres</h3>
                <p id='free-rooms-count'>{data?.resume.available_rooms}</p>
              </div>
              <div>
                <h3>Quartos ocupados</h3>
                <p id='occupied-rooms-count'>{data?.resume.occupied_rooms}</p>
              </div>
            </section>
          </DashboardCard>
        </section>
        <section className='dashboard-row'>
          <DashboardCard title='Rooms'>
            <section className='room-information-container'>
              {data?.rooms.map(room => (
                <div className='rooms-information-card'>
                <div>
                  {room.offers > 0 && (<StatusField className='status-confirmed room-information-offert'>{room.offers} Ofertas</StatusField>)}
                  <MoreVerticalIcon size={20} />
                </div>
                <h2>Quarto {room.name}</h2>
                <p><span className='room-information-count'>{room.accommodations.reserved}</span>/{room.accommodations.total}</p>
                <p className='room-information-card-price'>R$ {room.pricing}<span>/ dia</span></p>
              </div>
              ))}
            </section>
          </DashboardCard>
        </section>
        <section className='dashboard-row'>
          <DashboardCard title='Status dos quartos'>
            <div className='status-rooms-container'>
              <section className='status-rooms'>
                <p>Quartos ocupados <span>{data?.rooms_status.occupied_rooms.total}</span></p>
                <p>Limpo <span>{data?.rooms_status.occupied_rooms.clean}</span></p>
                <p>Sujo <span>{data?.rooms_status.occupied_rooms.dirty}</span></p>
                <p>Inspecionado <span>{data?.rooms_status.occupied_rooms.inspected}</span></p>
              </section>
              <section className='status-rooms'>
                <p>Quartos disponíveis <span>{data?.rooms_status.available_rooms.total}</span></p>
                <p>Limpo <span>{data?.rooms_status.available_rooms.clean}</span></p>
                <p>Sujo <span>{data?.rooms_status.available_rooms.dirty}</span></p>
                <p>Inspecionado <span>{data?.rooms_status.available_rooms.inspected}</span></p>
              </section>
            </div>
          </DashboardCard>
          <DashboardCard title='Taxa de ocupação'>
            <p>.</p>
          </DashboardCard>
        </section>
        <section className='dashboard-row'>
          <DashboardCard title='Estatísticas de ocupação'>
            <section className='statistics-buttons-container'>
              <MainButton>
                <Calendar size={18} />
                Anual
              </MainButton>
              <SecondButton>
                <Calendar size={18} />
                Mensal
              </SecondButton>
            </section>
            <section className='statistics-graphic'>

            </section>
          </DashboardCard>
          <DashboardCard title='Avaliações'>
            <MoreVerticalIcon className='reviews-more-icon' />
            <section className='reviews-container'>
              {data?.reviews.map(review => (
                <div className='review-item'>
                  <div className='review-item-text'>
                    <p>{review.name}</p>
                    <p>{review.comment}</p>
                  </div>
                  <p>{review.rating} estrelas</p>
                </div>
              ))}
            </section>
          </DashboardCard>
        </section>
      </main>
    </div>
  )
}