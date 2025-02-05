type Props = {
  text: string
  className? : string
}

export default function Title({ text , className }: Props) {
  return (
    <h1
      className={
        "text-[2.5rem] leading-[2.75rem] text-green-green font-medium" + className
      }
    >
      {text}
    </h1>
  )
}
