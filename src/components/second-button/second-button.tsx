import './second-button.css'

interface SecondButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode,
}

export function SecondButton(props: SecondButtonProps) {
  return (
    <button className='second-button'>
      {props.children}
    </button>
  )
}