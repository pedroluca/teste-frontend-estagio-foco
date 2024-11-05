import './round-button.css'

interface RoundButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode
}

export function RoundButton(props: RoundButtonProps) {
  return (
    <button type='button' className='round-button' onClick={props.onClick}>
      {props.children}
    </button>
  )
}