---
name: Dragos Sorescu Research Profile
description: A quiet, modern academic profile built around concise evidence and monochrome restraint.
colors:
  canvas: "oklch(1 0 0)"
  surface: "oklch(0.97558 0.00264 106.45)"
  ink: "oklch(0.17764 0 0)"
  graphite: "oklch(0.40912 0 0)"
  hairline: "oklch(0.8811 0.00542 106.51)"
typography:
  family: "Overused Grotesk"
  weights: "Book 400, Medium 500"
  display: "clamp(2.75rem, 6vw, 4rem)"
  subheading: "1.5rem"
  lead: "1.25rem"
  body: "1rem"
  caption: "0.875rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
  4xl: "6rem"
z-index:
  skip-link: 10
---

# Design System

## Direction

The site modernizes the compact academic-homepage structure of the reference repository. A centered reading column, one square color image, text-only links, thin rules, unboxed project rows, and a simple hobbies photo slot let the research content lead. Section headings sit above their content. About pairs the prose with a toolkit grid of devicon icons on the right; Experience lays its numbered highlights out two per row, with a small monochrome Durham College AI Hub mark between the role and the highlights.

## Rules

- Use only the five monochrome palette roles above. Photos and toolkit icons keep their own colours.
- Use Overused Grotesk for every text role; hierarchy comes from size, weight, and spacing.
- Keep body copy between 45 and 65 characters per line where practical.
- Use dividers and whitespace instead of cards, shadows, gradients, or decorative containers. The one exception is the toolkit grid's hairline border.
- The AI Hub mark is inline SVG filled with `currentColor` so it always matches the ink role.
- Interactive targets must be at least 44px tall and have visible keyboard focus.
- Reflow the page into one column on compact screens without hiding content.
- Motion is limited to one intro page-load sequence (text rises in, the profile photo settles), the AI Hub mark assembling as it scrolls into view, and short link feedback. All of it must respect reduced-motion preferences.
