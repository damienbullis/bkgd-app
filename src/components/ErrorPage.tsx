export default function ErrorPage({ e }: { e: Error }) {
  return (
    <>
      <h1>{e.message}</h1>
    </>
  )
}
