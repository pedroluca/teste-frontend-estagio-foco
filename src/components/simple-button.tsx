interface ButtonProps extends React.ComponentProps<'button'> {
  content: string,
}

export function Button(props: ButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      {props.content}
    </button>
  )
}