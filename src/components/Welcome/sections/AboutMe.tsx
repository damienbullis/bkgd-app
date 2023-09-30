import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

export default function AboutMe() {
  return (
    <div className="mx-auto mb-20 max-w-3xl">
      <h3 className="w-auto -translate-x-8 -skew-x-6 text-white text-opacity-40">
        About Me
      </h3>
      <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
        <p className="mb-4">Hi I'm Damien.</p>
        <p className="mb-4">
          I work as a Senior Software Engineer, and I have been in web
          development for going on a decade now.
        </p>
        <p className="mb-4">
          I believe presentation is part of design, and for me that takes the
          form of making things look & feel right on the frontend.
        </p>
        <p className="mb-4">
          I really enjoyed using this project as an opportunity to learn, level
          up some of my weaker skills, and to work on something more artist &
          creative in nature.
        </p>
        <p className="mb-4">...As opposed to my day job...</p>
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
