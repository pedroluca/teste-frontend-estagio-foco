import './dashboard-card.css'

interface DashboardCardProps {
  title: string,
  children: React.ReactNode
}

export function DashboardCard(props: DashboardCardProps) {
  return (
    <div className='dashboard-card'>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  )
}