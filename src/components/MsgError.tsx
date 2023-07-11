export default function MsgError({ text = '' }) {
  return (
    <p className="text-center">
      <span className="text-xl">{text}</span>
      <br />
      <a href="/" className="underline text-sm">Reload page</a>
    </p>
  )
}
