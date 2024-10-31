import './new-reservation.css'
import { MainButton } from '../../components/main-button/main-button'
import { MainTable } from '../../components/main-table/main-table'
import { StatusField } from '../../components/status-field/status-field'

export function NewReservation() {
  return (
    <div className='new-reservation-container'>
      <h1>New Reservation</h1>
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
          <tr>
            <td className='reservations-table-strong-cell'>#010</td>
            <td>Duplo</td>
            <td>Ar condicionado, TV, frigobar, Wifi, Cofre</td>
            <td><StatusField className='status-confirmed'>Confirmado</StatusField></td>
            <td>
              <MainButton className='success-button'>Reservar agora</MainButton>
            </td>
          </tr>
        </tbody>
      </MainTable>
    </div>
  )
}