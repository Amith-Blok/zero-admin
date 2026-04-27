'use client'

import Image from 'next/image'

type Item = { name: string; src: string; href?: string }

export function LogoTicker({
  items,
  speed = 35, // seconds per loop
  height = 40,
  ariaLabel,
}: {
  items: Item[]
  speed?: number
  height?: number
  ariaLabel: string
}) {
  // Duplicate for seamless loop
  const content = [...items, ...items]
  return (
    <div
      className="relative w-full overflow-hidden"
      role="region"
      aria-label={ariaLabel}
    >
      {/* edge fades - hidden on mobile to show full logo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0 bg-gradient-to-r from-background to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-0 bg-gradient-to-l from-background to-transparent sm:w-12" />

      {/* Container that limits visible area */}
      <div className="mx-auto max-w-[120px] sm:mx-0 sm:max-w-none">
        <ul
          className="ticker flex min-w-max items-center gap-8 motion-reduce:animate-none sm:gap-6 md:gap-10"
          style={{ ['--ticker-duration' as any]: `${speed}s` }}
        >
          {content.map((it, idx) => (
            <li
              key={`${it.name}-${idx}`}
              className="flex flex-shrink-0 items-center"
            >
              <a
                href={it.href || '#'}
                aria-label={it.name}
                className="inline-flex items-center"
              >
                <Image
                  src={it.src || '/placeholder.svg'}
                  alt={it.name}
                  width={120}
                  height={height}
                  className="h-14 opacity-80 transition-opacity hover:opacity-100 md:h-20"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .ticker {
          animation: ticker var(--ticker-duration) linear infinite;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-reduce\\:animate-none {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
