export default function ErrorPage({ e }: { e: Error }) {
  return (
    <div className="grid h-screen w-screen place-content-center place-items-center">
      <h3>{e.message}</h3>
      {/* <div className="max-w-lg rounded-lg bg-slate-800 p-8 text-sm">
        {e.stack?.split('\n').map((s, i) => <p key={i}>{s}</p>)}
      </div> */}
    </div>
  )
}
