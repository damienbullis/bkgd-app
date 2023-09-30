export default function Caveats() {
  return (
    <div className="mx-auto mt-20 max-w-xl text-white text-opacity-80">
      <h4 className="mb-2">Caveats</h4>
      <p className="mb-4 font-light">
        BKGD.APP is still in development, and there are a few things to be aware
        of...
      </p>
      <ul className="mx-auto max-w-md list-inside list-disc text-sm">
        <li>Designed for Chrome</li>
        <li>Designed for Desktop</li>
        <li>Image export process is pretty jank, and very manual.</li>
      </ul>
    </div>
  )
}
