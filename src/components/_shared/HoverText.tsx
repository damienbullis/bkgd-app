const HoverText = ({ children }: { children: string }) => {
  return (
    <p
      className="pointer-events-none absolute left-1/2 top-full z-50
      mt-2 -translate-x-1/2 -translate-y-full scale-50 select-none 
      whitespace-nowrap rounded-lg bg-black bg-opacity-80 px-3 py-1 text-center text-xs 
      font-semibold uppercase text-white opacity-0 transition-all
      group-hover:z-20 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-300"
    >
      {children}
    </p>
  )
}

export default HoverText
