import Banner from './Banner'
import {
  AboutMe,
  Caveats,
  GetStartedButton,
  Goals,
  Highlights,
  Motivation,
  SpecialThanks,
} from './sections'

const smoothScroll = () => {
  const target = document.querySelector('#about-bkgd')
  if (target) {
    const currentPos = window.scrollY
    const dist = target.getBoundingClientRect().top - currentPos
    window.scrollTo({
      top: dist,
      behavior: 'smooth',
    })
  }
}

export default function WelcomePage() {
  return (
    <>
      {/* Header */}
      <div className="absolute left-0 top-0 z-10 inline-flex w-full items-center justify-center p-4">
        <button
          onClick={smoothScroll}
          className="font-light underline decoration-transparent decoration-dashed decoration-1 underline-offset-4 transition hover:decoration-white active:scale-95"
        >
          What is BKGD.APP?
        </button>
      </div>
      <Banner />

      {/* Content */}
      <div className="flex w-full flex-col items-center">
        {/* Start Button */}
        <GetStartedButton />

        {/* Highlights & Features */}
        <Highlights />

        <div className="flex w-full justify-center overflow-hidden bg-gray-950 pb-12 ">
          <div className="flex w-3/4 flex-col items-center max-sm:w-4/5">
            <Motivation />

            <Goals />

            <AboutMe />

            <SpecialThanks />

            <br />
            <p className="inline-flex gap-20">
              <span>*</span>
              <span>*</span>
              <span>*</span>
            </p>
            <br />

            <Caveats />
          </div>
        </div>
      </div>
    </>
  )
}
