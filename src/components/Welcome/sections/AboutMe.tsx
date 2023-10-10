import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

export default function AboutMe() {
  return (
    <div className="mx-auto mb-20 max-w-3xl">
      <h3 className="w-auto -translate-x-8 -skew-x-6 text-white text-opacity-40 max-md:-translate-x-0">
        About Me
      </h3>
      <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
        <p className="mb-4">Hi I'm Damien.</p>
        <p className="mb-4">
          I work as a Senior Software Engineer, and while I have been in web
          development for going on a decade now. I actually spent the majority
          of my life creating some form of art. Whether that was illustration,
          painting, game design, sound engineering, music production,
          cinematography, or writing.
        </p>
        <p className="mb-4">
          When I was 25 I sort of fell into web development, and while it
          started as just a job, I eventually realized how to much art and
          creativity there was in software development. Once that clicked for
          me, I really started to enjoy my work on a much deeper level, and
          really focus on improving my craft.
        </p>
        <p className="mb-4">
          Presentation is part of design, and I wanted to create a tool that
          would help me create better designs, faster. I hope you enjoy using
          BKGD.APP as much as I enjoyed building it.
        </p>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <a
          href="https://www.instagram.com/damienbullis/"
          className="cursor-pointer p-2 text-4xl transition-colors hover:text-pink-500 active:text-pink-300"
        >
          <InstagramLogo weight="duotone" />
        </a>
        <a
          href="https://www.linkedin.com/in/damienbullis/"
          className="cursor-pointer p-2 text-4xl transition-colors hover:text-pink-500 active:text-pink-300"
        >
          <LinkedinLogo weight="duotone" />
        </a>
      </div>
    </div>
  )
}
