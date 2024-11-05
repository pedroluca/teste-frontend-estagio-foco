import { useState, useEffect } from 'react'
import { MainButton } from '../../components/main-button/main-button'
import { SecondButton } from '../../components/second-button/second-button'
import { Filter } from 'lucide-react'
import { MainTable } from '../../components/main-table/main-table'
import { StatusField } from '../../components/status-field/status-field'
import MoreIcon from '../../assets/icons/more.svg'
import './reservations.css'
import { Link } from 'react-router-dom'

interface Responsible {
  name: string
  document: string
  email: string
  phone: string
}

interface Room {
  id: string
  name: string
  number: string
}

interface Reservation {
  id: string
  responsible: Responsible
  checkin_date: string
  checkout_date: string
  room: Room
  status: string
}

enum ReservationStatus {
  Confirmado = 'confirmed',
  AguardandoPagamento = 'pending',
  Cancelado = 'cancelled'
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Confirmado':
      return ReservationStatus.Confirmado
    case 'Aguardando pagamento':
      return ReservationStatus.AguardandoPagamento
    case 'Cancelado':
      return ReservationStatus.Cancelado
    default:
      return ''
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number, reservationId: string | null }>({ visible: false, x: 0, y: 0, reservationId: null })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({ status: '' })

  useEffect(() => {
    const loadInitialData = () => {
      const storedReservations = localStorage.getItem('reserve_list')
      if (!storedReservations) {
        const mockReservations: Reservation[] = [
          {
            id: 'f031297c-5316-4083-894e-534874568631',
            responsible: {
              name: 'João Silva',
              document: '12345678901',
              email: 'joao.silva@email.com',
              phone: '11999999999'
            },
            checkin_date: '2024-12-25',
            checkout_date: '2024-12-28',
            room: {
              id: 'e82dc4b8-e38e-4770-a0b7-8eda75e94b57',
              name: 'Duplo',
              number: '010'
            },
            status: 'Confirmado'
          },
          {
            id: 'f031297c-5316-4083-894e-534874568632',
            responsible: {
              name: 'Maria Oliveira',
              document: '98765432100',
              email: 'maria.oliveira@email.com',
              phone: '11988888888'
            },
            checkin_date: '2024-12-20',
            checkout_date: '2024-12-22',
            room: {
              id: 'e82dc4b8-e38e-4770-a0b7-8eda75e94b58',
              name: 'Triplo',
              number: '011'
            },
            status: 'Aguardando pagamento'
          }
        ]
        localStorage.setItem('reserve_list', JSON.stringify(mockReservations))
        setReservations(mockReservations)
      } else {
        setReservations(JSON.parse(storedReservations))
      }
    }

    loadInitialData()

    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0, reservationId: null })
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu.visible])

  const handleMoreClick = (event: React.MouseEvent, reservationId: string) => {
    event.preventDefault()
    event.stopPropagation()
    const { clientX: x, clientY: y } = event
    const menuWidth = 150
    const menuHeight = 100
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const adjustedX = x + menuWidth > viewportWidth ? viewportWidth - menuWidth : x
    const adjustedY = y + menuHeight > viewportHeight ? viewportHeight - menuHeight : y

    setContextMenu({
      visible: true,
      x: adjustedX,
      y: adjustedY,
      reservationId
    })
  }

  const handleContextMenuOption = (option: string) => {
    if (contextMenu.reservationId) {
      const updatedReservations = reservations.map(reservation =>
        reservation.id === contextMenu.reservationId
          ? { ...reservation, status: option }
          : reservation
      )
      setReservations(updatedReservations)
      localStorage.setItem('reserve_list', JSON.stringify(updatedReservations))
    }
    setContextMenu({ visible: false, x: 0, y: 0, reservationId: null })
  }

  const handleFilterClick = () => {
    console.log(isModalOpen)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const status = formData.get('status') as string
    setFilters({ status })
    setIsModalOpen(false)
  }

  const filteredReservations = reservations.filter(reservation =>
    filters.status === '' || reservation.status === filters.status
  )

  return (
    <div className='reservations-container'>
      <h1>Reservas</h1>
      <div className='reservations-buttons-holder'>
        <MainButton>
          <Link to='/nova-reserva' className='new-reservation-button'>Nova reserva</Link>
        </MainButton>
        <SecondButton onClick={handleFilterClick}>
          <Filter size={18} />
          Filtros
        </SecondButton>
      </div>
      <MainTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Responsável</th>
            <th>Check-in/out</th>
            <th>Quarto</th>
            <th>Valor</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className='reservations-table-strong-cell'>#{reservation.room.number}</td>
              <td>{reservation.responsible.name}</td>
              <td>{formatDate(reservation.checkin_date)} à {formatDate(reservation.checkout_date)}</td>
              <td>{reservation.room.name}</td>
              <td className='reservations-table-strong-cell'>R$</td>
              <td><StatusField className={`status-${getStatusClass(reservation.status)}`}>{reservation.status}</StatusField></td>
              <td className='reservations-table-last-cell'>
                <img
                  src={MoreIcon}
                  alt='Ícone com 3 pontos representando menu de ações para a reserva'
                  onClick={(event) => handleMoreClick(event, reservation.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </MainTable>
      {contextMenu.visible && (
        <div
          className='context-menu'
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={() => handleContextMenuOption('Confirmado')}>Confirmar</button>
          <button onClick={() => handleContextMenuOption('Cancelado')}>Cancelar</button>
          <button onClick={() => handleContextMenuOption('Aguardando pagamento')}>Pendente</button>
        </div>
      )}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Filtrar Reservas</h2>
            <form onSubmit={handleFilterSubmit}>
              <label>
                Status:
                <select name='status' className='modal-select'>
                  <option value=''>Todos</option>
                  <option value='Confirmado'>Confirmado</option>
                  <option value='Aguardando pagamento'>Aguardando pagamento</option>
                  <option value='Cancelado'>Cancelado</option>
                </select>
              </label>
              <div className='modal-buttons'>
                <SecondButton type='button' onClick={handleModalClose}>Cancelar</SecondButton>
                <MainButton type='submit'>Aplicar</MainButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}