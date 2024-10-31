import './main-button.css'

interface MainButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode,
}

export function MainButton(props: MainButtonProps) {
  return (
    <button className={'main-button ' + props.className}>
      {props.children}
    </button>
  )
}