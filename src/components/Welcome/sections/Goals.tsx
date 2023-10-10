export default function Goals() {
  return (
    <div className="mb-20 flex w-full max-w-3xl flex-row gap-12 max-lg:flex-col-reverse">
      <div className="mt-4 w-1/2 rounded-md bg-white bg-opacity-10 max-lg:mx-auto max-md:w-max">
        <ol className="mx-auto list-inside list-decimal p-8 text-left text-base">
          <li className="mb-1">Keep it simple</li>
          <li className="mb-1">Export as code or image</li>
          <li className="mb-1">Save backgrounds for later</li>
          <li className="mb-1">
            Use URL State:
            <ul className="mb-2 ml-8 list-disc text-sm">
              <li className="mb-1">Leverage browser history</li>
              <li className="mb-1">Sharing</li>
              <li className="mb-1">Persisting state</li>
            </ul>
          </li>
          <li className="mb-1">Learn new technologies</li>
          <li className="mb-1">Portfolio</li>
        </ol>
      </div>
      <div className="ml-4 w-auto max-lg:ml-0 max-lg:w-full">
        <h3 className="-translate-x-8 -skew-x-6 text-white text-opacity-40 max-md:-translate-x-0">
          Goals
        </h3>
        <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
          <p className="mb-4 ml-auto w-auto">
            When I set out to build BKGD.APP, I had a few goals in mind...
          </p>
        </div>
      </div>
    </div>
  )
}
