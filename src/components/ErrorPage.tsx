export default function ErrorPages({ e }: { e: Error }) {
  return (
    <>
      <h1>{e.message}</h1>
    </>
  )
}
