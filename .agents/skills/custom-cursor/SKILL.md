---
name: custom-cursor
description: Generates a highly unique, context-aware custom cursor driven by GSAP. Abandons static templates in favor of dynamically invented cursor morphology and physics based on the brand archetype.
---

# Custom Cursor Skill

You are a Creative Technologist. A custom cursor is a physical extension of the brand's digital environment — but it is **optional**. Only implement a custom cursor when explicitly requested by the user or when the design concept specifically calls for one. Most websites work perfectly without a custom cursor.

If a custom cursor IS needed, do not default to generic templates (like the standard "small dot with a lagging hollow circle"). Invent something unique.

## 1. Core Engineering Constraints (Non-Negotiable)
While the *design* must be fully creative, the *engineering* must be strict to ensure performance and accessibility:
- **Mobile/Touch:** Never render or calculate a custom cursor on touch devices. Wrap all cursor logic in `window.matchMedia("(pointer: fine)").matches`.
- **Hide Native Safely:** Only hide the native cursor when the custom cursor is active.
- **Performance:** Never use CSS `transition` for `x`/`y` tracking (it causes severe layout thrashing and lag). You must use GSAP `quickTo()` for rendering coordinates to the compositor thread.
- **Accessibility:** If the project is for a highly utilitarian, institutional, or accessibility-first industry (e.g., government, medical portals), do not use a custom cursor.

## 2. Inventing the Cursor Motif
Before writing code, analyze the brand's Industry and Archetype. Invent a cursor that physically represents that brand by defining three dimensions:

### A. Morphology (Shape & Visuals)
- **Do not default to a dot.** 
- What is the shape of the brand? 
  - Is it a typographic cursor that spells out the brand name or current action in a circular path?
  - Is it a dynamic SVG that changes shape (e.g., a liquid drop that stretches based on velocity)?
  - Is it a granular aura using `backdrop-filter: blur()` and CSS noise?
  - Is it a stark, brutalist geometric shape (triangle, brutalist cross) that uses `mix-blend-mode: exclusion`?

### B. Physics (Motion & Weight)
- **Do not default to basic linear easing.**
- How heavy is this brand? 
  - A luxury fashion brand might have a cursor with heavy mass, dragging slightly behind the physical mouse with a buttery `duration: 0.8` and `ease: "power3.out"`.
  - A high-tech developer tool might have a hyper-snappy, zero-latency cursor (`duration: 0.05`) that feels precise and rigid.
  - A playful brand might use elastic, spring-like physics (`ease: "elastic.out(1, 0.3)"`).

### C. Contextual Intelligence (Hover States)
- The cursor must react intelligently to the elements underneath it. Invent 2-3 custom hover states based on the UI:
  - **Magnetic Snapping:** Does the cursor morph into the exact shape of the button it hovers over, snapping to its borders?
  - **Media Spotlights:** When hovering over a muted image/video, does the cursor expand massively to reveal a "PLAY" or "DRAG" typographic label inside it?
  - **Text Reading:** When hovering over a paragraph, does the cursor flatten into a vertical text-insertion line, or highlight the text like a digital marker?
  - **Masking:** Does the cursor act as an SVG clip-path mask, revealing a colorful image underneath a monochrome website?

## Execution Command
1. **Check:** Was a custom cursor explicitly requested? Does the design concept call for one? If not, **skip this skill entirely.**
2. **Analyze:** Read the Archetype and Industry as inspiration. If it is a strict utility/institutional site, abort.
3. **Invent:** Define the Morphology, Physics, and Contextual states. 
3. **Execute:** 
   - Write the HTML/SVG for the cursor.
   - Write the CSS (using OKLCH, `mix-blend-mode`, and proper `z-index`).
   - Write the GSAP `quickTo()` logic, ensuring you add `mouseenter`/`mouseleave` event listeners to interactive DOM elements to trigger your invented Contextual Intelligence states.
