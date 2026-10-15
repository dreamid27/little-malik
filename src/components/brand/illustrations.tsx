/**
 * Brand illustrations. All are decorative (aria-hidden) and drawn with the
 * logo's flat shapes + hard ink offset shadow. Colours come from tokens.
 */
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type IllustrationProps = Omit<ComponentProps<"svg">, "children">

const base = {
  "aria-hidden": true,
  focusable: "false",
} as const

/** The smiling sun from the logo. */
export function SunMascot({ className, ...props }: IllustrationProps) {
  const rays = Array.from({ length: 10 }, (_, i) => i * 36)
  return (
    <svg
      viewBox="0 0 120 120"
      {...base}
      className={cn("text-sun", className)}
      {...props}
    >
      <g fill="currentColor">
        {rays.map((deg) => (
          <rect
            key={deg}
            x="56"
            y="2"
            width="8"
            height="17"
            rx="4"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
        <circle cx="60" cy="60" r="34" />
      </g>
      <g fill="var(--lm-ink)">
        <ellipse cx="48" cy="57" rx="3" ry="4.2" />
        <ellipse cx="72" cy="57" rx="3" ry="4.2" />
      </g>
      <path
        d="M52 66 Q60 75 68 66"
        fill="none"
        stroke="var(--lm-ink)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Cloud({ className, ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 160 80"
      {...base}
      className={cn("text-paper", className)}
      {...props}
    >
      <g fill="currentColor">
        <circle cx="40" cy="48" r="26" />
        <circle cx="78" cy="36" r="34" />
        <circle cx="120" cy="50" r="24" />
        <rect x="40" y="48" width="80" height="26" rx="13" />
      </g>
    </svg>
  )
}

export function Sparkle({ className, ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...base}
      className={cn("text-marigold", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 1c.8 5.6 2.9 8 9.5 11-6.6 3-8.7 5.4-9.5 11-.8-5.6-2.9-8-9.5-11C9.1 9 11.2 6.6 12 1Z"
      />
    </svg>
  )
}

/** Straw bucket hat, echoing the logo. */
export function StrawHat({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 120" {...base} className={className} {...props}>
      <path
        d="M60 64 Q64 18 104 16 Q140 18 146 64 Z"
        fill="var(--lm-ink)"
        transform="translate(5 5)"
      />
      <path
        d="M16 96 L60 62 L150 62 L190 92 Z"
        fill="var(--lm-ink)"
        transform="translate(5 5)"
      />
      <path d="M60 64 Q64 18 104 16 Q140 18 146 64 Z" fill="var(--lm-straw)" />
      <path
        d="M78 26 L120 60 M96 18 L140 54 M64 44 L92 64 M124 20 L82 60 M140 30 L104 62 M104 18 L68 52"
        stroke="var(--lm-sun)"
        strokeWidth="3"
      />
      <path d="M60 54 L146 50 L148 64 L58 66 Z" fill="var(--lm-poppy)" />
      <path d="M16 96 L60 62 L150 62 L190 92 Z" fill="#f5ae22" />
      <path d="M16 96 L190 92 L186 98 L22 102 Z" fill="var(--lm-marigold)" />
    </svg>
  )
}

/** Empty laundry basket — for empty search results. */
export function EmptyBasket({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 160" {...base} className={className} {...props}>
      <ellipse cx="110" cy="146" rx="84" ry="8" fill="var(--lm-sand)" />
      <path
        d="M38 62 H182 L166 140 H54 Z"
        fill="var(--lm-ink)"
        transform="translate(6 6)"
      />
      <path d="M38 62 H182 L166 140 H54 Z" fill="var(--lm-sun)" />
      <g stroke="var(--lm-marigold-deep)" strokeWidth="4" strokeLinecap="round">
        <path d="M62 80 L70 124" />
        <path d="M90 80 L94 124" />
        <path d="M120 80 L118 124" />
        <path d="M150 80 L142 124" />
      </g>
      <rect
        x="30"
        y="52"
        width="160"
        height="16"
        rx="8"
        fill="var(--lm-marigold)"
      />
      <path
        d="M96 30 Q110 14 124 30"
        fill="none"
        stroke="var(--lm-ink)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <path
        fill="var(--lm-marigold)"
        d="M178 10c.6 4 2 5.6 6.8 7.8-4.8 2.2-6.2 3.8-6.8 7.8-.6-4-2-5.6-6.8-7.8 4.8-2.2 6.2-3.8 6.8-7.8Z"
      />
      <path
        fill="var(--lm-sun)"
        d="M40 18c.5 3.2 1.6 4.5 5.4 6.2-3.8 1.7-4.9 3-5.4 6.2-.5-3.2-1.6-4.5-5.4-6.2 3.8-1.7 4.9-3 5.4-6.2Z"
      />
    </svg>
  )
}

/** One lonely sock on the line — the 404 illustration. */
export function LostSock({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 220" {...base} className={className} {...props}>
      <path
        d="M0 40 Q160 92 320 36"
        fill="none"
        stroke="var(--lm-ink)"
        strokeOpacity=".55"
        strokeWidth="3"
      />
      <g className="origin-[150px_62px] animate-sway">
        <path
          d="M130 62 H178 V150 Q178 160 188 166 L214 182 Q232 194 220 210 Q210 222 192 212 L142 182 Q130 174 130 160 Z"
          fill="var(--lm-ink)"
          transform="translate(7 7)"
        />
        <path
          d="M130 62 H178 V150 Q178 160 188 166 L214 182 Q232 194 220 210 Q210 222 192 212 L142 182 Q130 174 130 160 Z"
          fill="var(--lm-sky)"
        />
        <path d="M130 62 H178 V84 H130 Z" fill="var(--lm-lagoon)" />
        <path d="M130 108 H178 V122 H130 Z" fill="var(--lm-paper)" />
        <path
          d="M200 176 Q226 186 222 206 Q210 222 192 212 L180 205 Q196 190 200 176 Z"
          fill="var(--lm-marigold)"
        />
        <rect x="147" y="38" width="14" height="40" rx="5" fill="#C98A4B" />
        <rect
          x="152"
          y="52"
          width="4"
          height="10"
          rx="2"
          fill="var(--lm-ink)"
          opacity=".35"
        />
      </g>
    </svg>
  )
}

/** Wavy scalloped edge used to transition between coloured bands. */
export function ScallopEdge({ className, ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      {...base}
      className={cn("block h-4 w-full sm:h-6", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 24V12 Q25 0 50 12 T100 12 T150 12 T200 12 T250 12 T300 12 T350 12 T400 12 T450 12 T500 12 T550 12 T600 12 T650 12 T700 12 T750 12 T800 12 T850 12 T900 12 T950 12 T1000 12 T1050 12 T1100 12 T1150 12 T1200 12 V24 Z"
      />
    </svg>
  )
}
