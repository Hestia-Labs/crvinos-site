import Image from 'next/image'
import Reveal from '@/components/Effects/reveal'

export default function ExperienceHeader({
  title,
  subtitle,
  image
}: {
  title: string
  subtitle: string
  image: string
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-br-3xl rounded-bl-3xl">
      <Reveal>
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 lg:p-20 bg-gradient-to-t from-black/70 via-black/50 to-transparent w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl italic text-white drop-shadow-md">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white mt-4 drop-shadow-md max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}