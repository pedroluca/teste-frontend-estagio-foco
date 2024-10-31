import './reservations.css'
import { MainButton } from '../../components/main-button/main-button'
import { SecondButton } from '../../components/second-button/second-button'
import MoreIcon from '../../assets/icons/more.svg'
import { Filter } from 'lucide-react'
import { MainTable } from '../../components/main-table/main-table'
import { StatusField } from '../../components/status-field/status-field'

export function Reservations() {
  return (
    <div className='reservations-container'>
      <h1>Reservas</h1>
      <div className='reservations-buttons-holder'>
        <MainButton>
          Nova reserva
        </MainButton>
        <SecondButton>
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
          <tr>
            <td className='reservations-table-strong-cell'>#4826</td>
            <td>João Silva</td>
            <td>02/11/2024 à 05/11/2024</td>
            <td>Duplo</td>
            <td className='reservations-table-strong-cell'>R$ 360,00</td>
            <td><StatusField className='status-canceled'>Cancelado</StatusField></td>
            <td className='reservations-table-last-cell'>
              <img src={MoreIcon} alt='Ícone com 3 pontos representando menu de ações para a reserva' />
            </td>
          </tr>
          <tr>
            <td className='reservations-table-strong-cell'>#4826</td>
            <td>João Silva</td>
            <td>02/11/2024 à 05/11/2024</td>
            <td>Duplo</td>
            <td className='reservations-table-strong-cell'>R$ 360,00</td>
            <td><StatusField className='status-confirmed'>Confirmado</StatusField></td>
            <td className='reservations-table-last-cell'>
              <img src={MoreIcon} alt='Ícone com 3 pontos representando menu de ações para a reserva' />
            </td>
          </tr>
        </tbody>
      </MainTable>
    </div>
  )
}