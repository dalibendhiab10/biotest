type Props = {
  text: string
  clickFn: React.MouseEventHandler<HTMLButtonElement>
}

export default function PrimaryBtn({ text, clickFn }: Props) {
  return (
    <button
      className="bg-green-green bg-opacity-90 rounded-md px-20 py-2 text-white-shade text-2xl font-semibold hover:bg-opacity-100"
      onClick={clickFn}
    >
      {text}
    </button>
  )
}
