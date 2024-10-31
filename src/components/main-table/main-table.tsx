import './main-table.css'

interface MainTableProps extends React.ComponentProps<'table'> {
  children: React.ReactNode,
}

export function MainTable(props: MainTableProps) {
  return (
    <div className='reservations-table-container'>
      <table className='reservations-table'>
        {props.children}
      </table>
    </div>
  )
}