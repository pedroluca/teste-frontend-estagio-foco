import { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { MainButton } from '../../components/main-button/main-button'
import { RoundButton } from '../../components/round-button/round-button'
import { Minus, Plus, X } from 'lucide-react'
import { MainTable } from '../../components/main-table/main-table'
import { StatusField } from '../../components/status-field/status-field'
import './new-reservation.css'

interface Room {
  id: string
  name: string
  number: string
  facilities: string[]
  status: string
}

interface Responsible {
  name: string
  email: string
  phone: string
  document: string
  observation: string
  cep: string
  address: string
  neighborhood: string
  city: string
  state: string
  country: string
}

interface Reservation {
  id: string,
  responsible: Responsible,
  checkin_date: string,
  checkout_date: string,
  room: Room,
  status: string
}

enum RoomStatus {
  Confirmado = 'confirmed',
  AguardandoPagamento = 'pending',
  Cancelado = 'cancelled'
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Disponível':
      return RoomStatus.Confirmado
    case 'Indisponível':
      return RoomStatus.AguardandoPagamento
    case 'Reservado':
      return RoomStatus.Cancelado
    default:
      return ''
  }
}

export function NewReservation() {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [responsible, setResponsible] = useState<Responsible>({
    name: '',
    email: '',
    phone: '',
    document: '',
    observation: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil'
  })

  useEffect(() => {
    const loadInitialData = () => {
      const storedData = localStorage.getItem('available_rooms')
      if (!storedData) {
        const mockData: Room[] = [
          {
            id: '1',
            name: 'Duplo',
            number: '101',
            facilities: ['Ar condicionado', 'TV', 'Frigobar', 'Wi-Fi'],
            status: 'Disponível'
          },
          {
            id: '2',
            name: 'Triplo',
            number: '102',
            facilities: ['Ar condicionado', 'TV', 'Frigobar', 'Wi-Fi'],
            status: 'Disponível'
          },
          {
            id: '3',
            name: 'VIP',
            number: '103',
            facilities: ['Ar condicionado', 'TV', 'Frigobar', 'Wi-Fi', 'Jacuzzi'],
            status: 'Indisponível'
          },
          {
            id: '4',
            name: 'Presidencial',
            number: '104',
            facilities: ['Ar condicionado', 'TV', 'Frigobar', 'Wi-Fi', 'Jacuzzi', 'Vista privilegiada'],
            status: 'Reservado'
          }
        ]
        localStorage.setItem('available_rooms', JSON.stringify(mockData))
      }
    }

    loadInitialData()
  }, [])

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => () => setter(value + 1)
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, min: number) => () => setter(value > min ? value - 1 : min)

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setNoResults(false)

    const storedData = localStorage.getItem('available_rooms')
    if (storedData) {
      const rooms: Room[] = JSON.parse(storedData)
      const formData = new FormData(event.target as HTMLFormElement)
      const roomType = formData.get('room-type') as string

      const filteredRooms = rooms.filter(room =>
        roomType === 'Todos' || roomType === '' || room.name.includes(roomType)
      )

      if (filteredRooms.length > 0) {
        setAvailableRooms(filteredRooms)
      } else {
        setNoResults(true)
      }

      setIsLoading(false)
    }
  }

  const handleReserveClick = (room: Room) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedRoom(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setResponsible(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setResponsible(prevState => ({
      ...prevState,
      cep: value
    }))

    if (value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`)
        const data = await response.json()
        setResponsible(prevState => ({
          ...prevState,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }))
      } catch (error) {
        console.error('Error fetching address:', error)
      }
    }
  }

  const handleConfirmReservation = () => {
    if (selectedRoom) {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        responsible,
        checkin_date: new Date().toISOString().split('T')[0],
        checkout_date: new Date().toISOString().split('T')[0],
        room: selectedRoom,
        status: 'Confirmado'
      }

      const storedReservations = localStorage.getItem('reserve_list')
      const reservations = storedReservations ? JSON.parse(storedReservations) : []
      reservations.push(newReservation)
      localStorage.setItem('reserve_list', JSON.stringify(reservations))

      setIsModalOpen(false)
      setSelectedRoom(null)
    }
  }

  return (
    <div className='new-reservation-container'>
      <h1>Recepção</h1>
      <section>
        <form className='new-reservation-search-container' onSubmit={handleSearch}>
          <main>
            <div className='new-reservation-search-row'>
              <label className='custom-radio'>
                <input type='radio' name='room-type' value='Todos' defaultChecked />
                <span>Todos</span>
              </label>
              <label className='custom-radio'>
                <input type='radio' name='room-type' value='Duplo' />
                <span>Duplo</span>
              </label>
              <label className='custom-radio'>
                <input type='radio' name='room-type' value='Triplo' />
                <span>Triplo</span>
              </label>
              <label className='custom-radio'>
                <input type='radio' name='room-type' value='VIP' />
                <span>VIP</span>
              </label>
              <label className='custom-radio'>
                <input type='radio' name='room-type' value='Presidencial' />
                <span>Presidencial</span>
              </label>
            </div>
            <div className='new-reservation-search-row'>
              <div className='check-date-container'>
                <label className='new-reservation-label' htmlFor='check-in'>Check-in</label>
                <input type='date' id='check-in' name='check-in' />
              </div>
              <div className='check-date-container'>
                <label className='new-reservation-label' htmlFor='check-out'>Check-out</label>
                <input type='date' id='check-out' name='check-out' />
              </div>
            </div>
            <div className='new-reservation-search-row third-row'>
              <div className='adult-child-counter'>
                <div className='adult-child-counter-text-container'>
                  <label className='new-reservation-label'>Adultos</label>
                  <p>Acima de 12 anos</p>
                </div>
                <div className='adult-child-counter-buttons-container'>
                  <RoundButton onClick={decrement(setAdults, adults, 1)}>
                    <Minus />
                  </RoundButton>
                  <input type='number' value={adults} readOnly min={1} />
                  <RoundButton onClick={increment(setAdults, adults)}>
                    <Plus />
                  </RoundButton>
                </div>
              </div>
              <div className='adult-child-counter'>
                <div className='adult-child-counter-text-container'>
                  <label className='new-reservation-label'>Crianças</label>
                  <p>0 - 12 anos</p>
                </div>
                <div className='adult-child-counter-buttons-container'>
                  <RoundButton onClick={decrement(setChildren, children, 0)}>
                    <Minus />
                  </RoundButton>
                  <input type='number' value={children} readOnly min={0} />
                  <RoundButton onClick={increment(setChildren, children)}>
                    <Plus />
                  </RoundButton>
                </div>
              </div>
            </div>
          </main>
          <aside>
            <MainButton type='submit'>Verificar disponibilidade</MainButton>
          </aside>
        </form>
      </section>
      {isLoading && <p>Carregando...</p>}
      {noResults && <p>Nenhum quarto encontrado</p>}
      {!isLoading && !noResults && availableRooms.length > 0 && (
        <MainTable>
          <thead>
            <tr>
              <th>Número do quarto</th>
              <th>Nome</th>
              <th>Facilidades</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {availableRooms.map((room) => (
              <tr key={room.id}>
                <td className='reservations-table-strong-cell'>#{room.number}</td>
                <td>{room.name}</td>
                <td>{room.facilities.join(', ')}</td>
                <td><StatusField className={`status-${getStatusClass(room.status)}`}>{room.status}</StatusField></td>
                <td>
                  {room.status === 'Disponível' && (
                    <MainButton
                      className='success-button '
                      onClick={() => handleReserveClick(room)}
                      disabled={room.status !== 'Disponível'}
                    >
                      Reservar agora
                    </MainButton>  
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </MainTable>
      )}
      {isModalOpen && (
        <div className='modal-new-reservation'>
          <div className='modal-new-reservation-content'>
            <div className='modal-new-reservation-header'>
              <h2>Nova reserva</h2>
              <button className='close-button' onClick={handleModalClose}>
                <X />
              </button>
            </div>
            <div className='modal-new-reservation-body'>
              <section>
                <h3>Dados do responsável</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>
                          Nome completo:
                          <input type='text' name='name' value={responsible.name} onChange={handleInputChange} placeholder='João Silva' />
                        </label>
                      </td>
                      <td>
                        <label>
                          E-mail:
                          <input type='email' name='email' value={responsible.email} onChange={handleInputChange} placeholder='nome@email.com' />
                        </label>
                      </td>
                      <td>
                        <label>
                          Telefone:
                          <InputMask
                            mask="(99) 9 9999-9999"
                            maskChar={null}
                            type="tel"
                            name="phone"
                            placeholder="(00) 0 0000-0000"
                          />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          Documento:
                          <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            type="text"
                            name="document"
                            placeholder="000.000.000-00"
                          />
                        </label>
                      </td>
                      <td colSpan={2}>
                        <label>
                          Observação:
                          <input type='text' name='observation' value={responsible.observation} onChange={handleInputChange} placeholder='Digite aqui alguma observação' />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <h3>Endereço do responsável</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>
                          CEP:
                          <input type='text' name='cep' value={responsible.cep} onChange={handleCepChange} placeholder='01310-000' />
                        </label>
                      </td>
                      <td>
                        <label>
                          Endereço:
                          <input type='text' name='address' value={responsible.address} onChange={handleInputChange} placeholder='Av. Paulista, 9870' />
                        </label>
                      </td>
                      <td>
                        <label>
                          Bairro:
                          <input type='text' name='neighborhood' value={responsible.neighborhood} onChange={handleInputChange} placeholder='Boa Vista' />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          Cidade:
                          <input type='text' name='city' value={responsible.city} onChange={handleInputChange} placeholder='São Paulo' />
                        </label>
                      </td>
                      <td>
                        <label>
                          Estado:
                          <input type='text' name='state' value={responsible.state} onChange={handleInputChange} placeholder='SP' />
                        </label>
                      </td>
                      <td>
                        <label>
                          País:
                          <input type='text' name='country' value={responsible.country} onChange={handleInputChange} placeholder='Brasil' />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <MainButton className='success-button confirm-reservation-button' onClick={handleConfirmReservation}>Confirmar reserva</MainButton>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}