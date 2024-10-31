import './status-field.css'

interface StatusFieldProps extends React.ComponentProps<'span'> {
  children: React.ReactNode,
}

export function StatusField(props: StatusFieldProps) {
  return (
    <span className={'status-field ' + props.className}>
      {props.children}
    </span>
  )
}