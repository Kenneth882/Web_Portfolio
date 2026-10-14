---
name: Kenneth Romero Linares Portfolio
description: A tactile Pokémon object world on pale cool paper.
colors:
  paper: "#f2f3ed"
  ink: "#282d29"
  muted: "#656b61"
  red: "#c83c43"
  line: "#d3d6cc"
  focus-blue: "#2554a4"
  lcd: "#bacb9c"
  lcd-ink: "#304331"
  entry-art: "#e1e7d7"
  poke-red: "#df4346"
  great-blue: "#3473be"
  ultra-yellow: "#e7ba43"
  master-purple: "#8460a3"
typography:
  display:
    fontFamily: "Departure Mono, monospace"
    fontSize: "clamp(88px, 12.4vw, 190px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Departure Mono, monospace"
    fontSize: "33px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Departure Mono, monospace"
    fontSize: "22px"
    fontWeight: 400
  body:
    fontFamily: "Departure Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Departure Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
  metadata:
    fontFamily: "Departure Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
rounded:
  control: "3px"
  inset: "4px"
  dialog: "12px"
  circular: "50%"
spacing:
  compact: "8px"
  small: "16px"
  medium: "20px"
  inset: "24px"
components:
  navigation-button:
    textColor: "{colors.ink}"
    typography: "{typography.metadata}"
    padding: "10px 0"
  navigation-button-hover:
    textColor: "{colors.red}"
  outlined-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 17px"
  outlined-button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  close-button:
    size: "34px"
    padding: "7px"
  close-button-hover:
    backgroundColor: "#e0e3d8"
    rounded: "{rounded.circular}"
  entry-dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    width: "min(650px, calc(100% - 32px))"
  entry-art:
    backgroundColor: "{colors.entry-art}"
    rounded: "{rounded.inset}"
    padding: "24px"
---

# Design System: Kenneth Romero Linares Portfolio

## Overview

**Creative North Star: "A trainer's belongings"**

A pale cool field gives geometric Pokémon objects room to carry the personality. Departure Mono supplies a consistent pixel voice, while a hanging red Pokédex and four colored Poké Balls supply the physical material and interaction. This documents the implemented world; the home composition belongs to `.impeccable/surfaces/index-html.md`.

The interface is sparse around the objects and more readable inside the entry dialog. Objects are made with HTML, CSS gradients, and SVG geometry. They have highlights, seams, and soft cast shadows; surrounding navigation remains quiet.

**Key Characteristics:**
- Pale cool paper and charcoal pixel typography.
- Colored physical objects serve as navigation.
- CSS and SVG geometry supplies the imagery.
- A calm reading panel follows the playful scene.

## Colors

The neutral field supports saturated object colors and a muted green LCD.

### Primary
- **Pokédex Red** (`red`): navigation hover and selection accent; the Pokédex shell uses a related red gradient.

### Secondary
- **LCD Green** (`lcd`, `lcd-ink`): screen surface and its dark text.
- **Entry Art Green** (`entry-art`): quiet inset surface in project and profile entries.
- **Poké Red, Great Blue, Ultra Yellow, Master Purple** (`poke-red`, `great-blue`, `ultra-yellow`, `master-purple`): identify the ball variants. These are object materials, not general purpose status colors.
- **Focus Blue** (`focus-blue`): keyboard focus outlines.

### Neutral
- **Cool Paper** (`paper`): page and dialog canvas.
- **Charcoal Ink** (`ink`): primary type and outlined controls.
- **Muted Olive Gray** (`muted`): captions, hints, and secondary information.
- **Paper Divider** (`line`): footer and dialog separators.

**The Object Color Rule.** Keep the saturated variant palette attached to the objects; use the paper and ink pair for surrounding reading surfaces.

## Typography

**Display, body, and label font:** Departure Mono, with monospace fallback. The local WOFF2 is loaded at regular weight with `font-display: swap`; the implementation disables synthetic font styles.

The type is deliberately pixel-like, with scale and spacing supplying hierarchy. The implementation does not use bold display text or a second font family.

### Hierarchy
- **Display:** the decorative name marquee uses the display token; mobile reduces it to 77px. It is hidden from assistive technology.
- **Headline:** dialog titles use the headline token, reducing to 27px at the mobile breakpoint.
- **Title:** the introduction uses the title token, reducing to 18px, 16px, and 14px across the observed narrow breakpoints.
- **Body:** dialog descriptions and the profile note use the body token. The late stylesheet override keeps descriptions at 14px on mobile as well.
- **Label:** project titles and dialog chrome use the 12px label role at every breakpoint. Navigation and the wordmark use the 11px metadata role at every breakpoint.
- **Metadata:** ball identifiers, scene notes, footer text, motion controls, drag hints, and entry-art sublabels use the 11px metadata role at every breakpoint. Dialog metadata labels are 11px and values are 12px. The LCD header and OPEN PROFILE instruction also use 11px source type; the device scene scales responsively as a unit.

**The One Font Rule.** Use Departure Mono throughout this world; preserve the regular weight and let scale create hierarchy.

## Layout

The page container is centered and capped at 2200px. Desktop header and footer use 4.2% horizontal insets. The header is 100px tall; the scene is `calc(100svh - 160px)`, constrained between 650px and 1000px. Objects are absolutely positioned within an isolated, clipped scene. The central lanyard canvas is 600px wide; this is a scene composition, not a reusable card grid.

At 1500px and above, the Pokédex scene scales to 1.1 and the balls enlarge. When that wide viewport is also 850px tall or shorter, the lower ball pair moves to 42% from the scene top to keep captions above the marquee. At 1000px and below, the scene scales to 0.9 and side spacing contracts. The tablet range is 651–1000px. At 650px and below, the header becomes 76px with 22px side padding, the scene becomes 850px tall, and the Pokédex scales to 0.79. Balls arrange into two pairs below it. At 360px and below, header and intro insets contract to 16px.

The dialog is capped at 650px with 16px minimum side clearance and a maximum height of `calc(100svh - 48px)`. Its interior scrolls. Body padding changes from 32px 36px to 26px 24px on mobile; metadata remains a two-column grid. Spacing is component-specific; the frontmatter records recurring values rather than imposing an unimplemented global scale.

## Elevation & Depth

Depth belongs to physical objects and the modal layer. The Pokédex combines inset highlights, a dark lower edge, and two soft cast shadows. Balls combine radial highlights, shaded lower shells, and a cast shadow that moves on hover. The paper interface uses thin dividers without card shadows. Full material and modal shadows are recorded in the sidecar.

**The Material Depth Rule.** Apply layered shadows to the modeled objects and modal, keeping ordinary text navigation flat.

## Shapes

The signature silhouettes are spherical balls, a softly asymmetric red device, and a curved lanyard. The Pokédex shell is 246px by 346px with corners of 17px 15px 19px 20px. The dialog uses the dialog radius; inset art panels use the inset radius; the outlined action uses the control radius. Circular details recur in lenses, ball buttons, status dots, and the close button's hover background. Preserve these shape roles rather than giving every surface the same rounding.

## Components

### Navigation and outlined action

Text navigation is flat with a red hover state. The profile's project action is a thin charcoal outlined button, filled with ink and reversed paper text on hover. The small wordmark combines text with a geometric miniature ball.

### Close control

A compact square hit area holds an inline SVG cross. Hover adds a circular muted paper background. Keyboard focus uses the shared outline.

### Project ball

Each ball and its caption form one native button. The four variants share a lower shell, dark band, and circular button; their upper-shell colors and markings differ. Hover or keyboard focus lifts the orb by 12px and adds 12 degrees to its resting rotation over 0.5 seconds. Captions remain outside the orb for legibility. Desktop sizes vary from 86px to 106px; responsive rules enlarge or shrink them by scene role.

### Pokédex

The device is one native button. Clicking or keyboard activation opens the profile; pointer dragging beyond six scene pixels changes its position. Release applies a damped spring toward its resting tilt of -8 degrees. The lanyard SVG tracks the drag. The screen header and OPEN PROFILE instruction use 11px source type, with a 32px pixel avatar. The external hint reads “Drag to swing.” and “Click to open.” Decorative hardware labels remain miniature detail rather than a scale for reading content.

### Entry dialog

A native modal dialog contains a header, readable content, inset object art, metadata, and previous/next project navigation. The backdrop is dimmed and blurred. Opening focuses the close control; closing restores the original trigger. Previous/next wraps through four entries. A click outside the panel closes it, and the native dialog supports Escape. Background scrolling is locked while open.

### Focus and motion

Buttons and links receive a 2px focus-blue outline with a 7px offset; the Pokédex increases the offset to 12px. A keyboard-visible skip link precedes the page. The marquee runs for 55 seconds per cycle. The footer pause control pauses it and stops the release spring. Reduced-motion preference initially enables that paused state and disables CSS animation and transitions. Direct dragging remains available; release resets immediately while paused. The user can explicitly resume the spring, while the CSS reduced-motion rule continues to suppress CSS animation.

## Do's and Don'ts

### Do:
- Do use Departure Mono at regular weight throughout the interface.
- Do keep object imagery geometric in HTML, CSS, and SVG.
- Do keep reading surfaces pale and quiet around the colored objects.
- Do preserve native buttons, visible keyboard focus, modal focus restoration, and motion controls.

### Don't:
- Don't replace the user-pinned object world with raster approximations.
- Don't transfer the miniature device-label sizes to essential reading content.
- Don't infer real project accomplishments from the illustrative project entries.

Not canonized: existing text arrow glyphs used as navigation accents are recorded as implementation drift rather than promoted into an icon system. The desktop drag-hint placement is a surface-specific correction, not a reusable layout token. Audit exceptions are scoped to the user-pinned marquee, physical Pokédex seam and play triangle, and decorative hardware text; functional undersized text has no suppression.
