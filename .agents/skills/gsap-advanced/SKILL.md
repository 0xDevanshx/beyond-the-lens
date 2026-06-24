---
name: gsap-advanced
description: >
  Advanced GSAP patterns: Timeline sequencing, ScrollTrigger scroll-driven animations, plugins (Flip, Draggable, MotionPath, SplitText), performance optimization, and utility methods.
  Trigger: When creating timelines, scroll animations, using GSAP plugins, or optimizing GSAP performance.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  merged_from: ["gsap-timeline", "gsap-scrolltrigger", "gsap-plugins", "gsap-performance", "gsap-utils"]
---

# GSAP Advanced

Merged skill combining timeline sequencing, scroll-driven animations, plugins, performance, and utilities.



## TIMELINE

## When to Use

- Sequencing multiple animations
- Choreographed animation sequences
- Controlling playback (play, pause, reverse, restart)
- Adding labels for navigation
- Nested timelines

## Critical Patterns

### Create Timeline

```typescript
import { gsap } from "gsap";

const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2" } });

tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "<")      // Start at same time as previous
  .to(".c", { opacity: 0 }, "+=0.2")  // 0.2s after previous ends
  .to(".d", { scale: 1.5 }, "-=0.1"); // Overlap 0.1s with previous
```

### Position Parameters

| Parameter | Meaning |
|-----------|---------|
| `"<"` | Start at same time as previous tween starts |
| `"<0.2"` | Start 0.2s before previous tween starts |
| `">"` | Start when previous tween ends |
| `">0.2"` | Start 0.2s after previous tween ends |
| `"+=0.2"` | Start 0.2s after previous tween ends |
| `"-=0.2"` | Start 0.2s before previous tween ends |
| `"label"` | Start at timeline label |
| `0.5` | Absolute time in seconds |

### Labeling

```typescript
const tl = gsap.timeline();

tl.to(".a", { x: 100 })
  .addLabel("step1")              // Label at current time
  .to(".b", { y: 50 })
  .to(".c", { opacity: 0 });

// Jump to label
tl.tweenTo("step1");

// Or use label for positioning
tl.to(".d", { x: 200 }, "step1");
```

## Playback Control

```typescript
const tl = gsap.timeline();

// Playback
tl.play();
tl.pause();
tl.restart();
tl.reverse();
tl.seek(1.5);           // Jump to 1.5 seconds
tl.progress(0.5);       // Set progress to 50%
tl.timeScale(2);        // Speed up 2x
tl.timeScale(0.5);      // Slow down 0.5x
tl.kill();             // Stop and clear

// Event callbacks
tl.eventCallback("onComplete", () => console.log("Done!"));
tl.eventCallback("onUpdate", () => updateProgress());
```

## Nested Timelines

```typescript
const mainTl = gsap.timeline();

// Create separate timeline and add it
const subTl = gsap.timeline();
subTl.to(".box1", { rotation: 360 });
subTl.to(".box2", { x: 100 });

mainTl.add(subTl);           // Add at end
mainTl.add(subTl, "<");     // Add at start
mainTl.add(subTl, 2);       // Add at 2 seconds
```

## Defaults

```typescript
// Timeline defaults apply to ALL nested tweens
const tl = gsap.timeline({
  defaults: {
    duration: 0.6,
    ease: "power2.out",
  },
  repeat: -1,        // Infinite repeat
  yoyo: true,        // Reverse on repeat
  repeatDelay: 0.5   // Delay between repeats
});
```

## Modifying Animations

```typescript
const tl = gsap.timeline();

// Get all tweens in timeline
const tweens = tl.getChildren();

// Change duration of specific tween
tl.getChildren()[0].duration(0.3);

// Add tween to existing timeline
tl.to(".new", { x: 100 }, 1);

// Remove tweens
tl.getChildren().forEach(t => t.kill());
tl.clear();
```

## Commands

```bash
npm install gsap
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]

## SCROLLTRIGGER

## When to Use

- Scroll-driven animations
- Parallax effects
- Pinning elements during scroll
- Horizontal scroll sections
- Scroll-based reveal animations

## Critical Patterns

### Setup

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### Basic Scroll Animation

```typescript
// Simple scroll-triggered animation
gsap.to(".element", {
  x: 200,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",    // When element top hits 80% of viewport
    end: "top 20%",      // When element top hits 20% of viewport
    scrub: 1,            // Smooth scrubbing (1s lag)
    // or toggleActions for simple triggers
    toggleActions: "play reverse play reverse"
  }
});
```

### Start/End Positions

Common start/end values:

| Value | Meaning |
|-------|---------|
| `"top top"` | Trigger top = viewport top |
| `"center center"` | Trigger center = viewport center |
| `"bottom bottom"` | Trigger bottom = viewport bottom |
| `"top 80%"` | Trigger top at 80% of viewport |
| `"+=100"` | 100px after trigger position |

### Pinning

```typescript
// Pin element during scroll
gsap.to(".pinned-section", {
  scrollTrigger: {
    trigger: ".pinned-section",
    start: "top top",
    end: "+=500",         // Pin for 500px of scroll
    pin: true,            // Enable pinning
    pinSpacing: false    // No spacer element
  }
});

// Pin with pinSpacing (default)
gsap.to(".pin-wrap", {
  scrollTrigger: {
    trigger: ".pin-wrap",
    start: "top top",
    end: "+=1000",
    pin: ".inner-element" // Pin specific element
  }
});
```

### Scrub

```typescript
// Smooth scrub with delay
gsap.to(".parallax", {
  y: -100,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5           // 0.5s lag for smoothness
  }
});

// True scrub (links to scroll position exactly)
gsap.to(".exact", {
  rotation: 360,
  scrollTrigger: {
    trigger: ".exact",
    scrub: true          // Direct link to scroll
  }
});
```

### Toggle Actions

| Trigger | Action |
|---------|--------|
| `"play"` | Play animation |
| `"pause"` | Pause animation |
| `"resume"` | Resume animation |
| `"reverse"` | Play in reverse |
| `"restart"` | Restart from beginning |
| `"complete"` | Jump to end |
| `"none"` | No action |

```typescript
// Common patterns
toggleActions: "play none none none"    // Play on enter
toggleActions: "play reverse play reverse"  // Play/reverse on enter/leave
toggleActions: "restart pause restart"   // Restart on enter, pause on leave
```

### Callbacks

```typescript
ScrollTrigger.create({
  trigger: ".element",
  start: "top center",
  onEnter: () => console.log("Entered"),
  onLeave: () => console.log("Left"),
  onEnterBack: () => console.log("Entered from below"),
  onLeaveBack: () => console.log("Left going up"),
  onUpdate: (self) => console.log(self.progress),
  onRefresh: () => console.log("Refreshed after layout change")
});
```

## Horizontal Scroll

```typescript
// Horizontal scroll section
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: "+=3000"        // Scroll distance
  }
});
```

### Refresh Required

Call `ScrollTrigger.refresh()` AFTER DOM changes:

```typescript
// After adding/removing elements
document.body.appendChild(newElement);
ScrollTrigger.refresh();

// After resizing or dynamic content
window.addEventListener("resize", () => ScrollTrigger.refresh());
```

## Cleanup

```typescript
// Clean up ScrollTriggers
function cleanup() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  ScrollTrigger.refresh();
}

// In React (use useGSAP hook - see gsap-react skill)
```

## Commands

```bash
npm install gsap ScrollTrigger
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]

## PLUGINS

## When to Use

- Smooth scrolling to elements
- Drag interactions
- Flip animations (state changes)
- Motion along paths
- Text animations
- SVG animations

## Critical Patterns

### ScrollToPlugin

```typescript
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Smooth scroll to element
gsap.to(window, {
  duration: 1,
  scrollTo: "#target-element",
  ease: "power2.inOut"
});

// Scroll to position
gsap.to(window, {
  duration: 1,
  scrollTo: { y: 500, autoKill: false }
});

// Scroll with offset
gsap.to(window, {
  duration: 1,
  scrollTo: { y: "#target", offsetY: 100 }
});
```

### Flip Plugin

```typescript
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

// Record state before change
const state = Flip.getState(".card");

// Make the change (add class, resize, etc.)
element.classList.add("expanded");

// Animate from recorded state to new state
Flip.from(state, {
  duration: 0.7,
  ease: "power2.inOut",
  targets: ".card",
  absolute: true,  // Handle layout changes
  onComplete: () => console.log("Done!")
});

// Preserve inline styles after
Flip.fit(element, state, { absolute: true });
```

### Draggable

```typescript
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Basic drag
Draggable.create(".handle", {
  type: "x,y",           // "x", "y", "rotation", "scale"
  bounds: ".container",
  inertia: true,         // Physics-based throw
  onDrag: () => update(),
  onThrowUpdate: () => update(),  // While inertia active
  onDragEnd: () => savePosition()
});

// Draggable with bounds object
Draggable.create(".box", {
  bounds: { minX: 0, maxX: 300, minY: 0, maxY: 500 }
});
```

### MotionPath

```typescript
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Animate along SVG path
gsap.to(".ball", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  },
  duration: 2,
  ease: "none"
});

// Curved path with control points
gsap.to(".ball", {
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 100, y: 200, curviness: 1.5 },
      { x: 200, y: 100 }
    ],
    curviness: 1.5
  },
  duration: 1.5
});
```

### SplitText (Premium)

```typescript
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Split text into lines, words, chars
const split = new SplitText(".hero-title", {
  type: "chars,words,lines",
  charsClass: "char",
  wordsClass: "word",
  linesClass: "line"
});

// Animate each category
gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.05,
  duration: 0.8,
  ease: "back.out(1.7)"
});

// Cleanup
split.revert();
```

### Observer (Touch/Mouse Events)

```typescript
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

Observer.create({
  target: window,
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onUp: () => goUp(),
  onDown: () => goDown(),
  onRight: () => nextSlide(),
  onLeft: () => prevSlide()
});
```

## Commands

```bash
# Core + common plugins
npm install gsap

# Premium plugins (license required)
# https://gsap.com/pricing/
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]

## PERFORMANCE

## When to Use

- Performance-critical animations
- Mobile optimization
- Large numbers of animated elements
- Complex ScrollTrigger setups
- 60fps requirements

## Critical Patterns

### USE TRANSFORMS (NOT layout properties)

```typescript
// ✅ DO THIS - GPU accelerated
gsap.to(element, {
  x: 100,        // transform: translateX(100px)
  y: 50,         // transform: translateY(50px)
  scale: 1.5,    // transform: scale(1.5)
  rotation: 360,  // transform: rotate(360deg)
  duration: 0.5
});

// ❌ NOT THIS - triggers layout/reflow
gsap.to(element, {
  left: 100,     // Triggers layout!
  top: 50,       // Triggers layout!
  margin: 20,    // Triggers layout!
  width: 200     // Triggers layout!
});
```

### will-change

```typescript
// Add to element BEFORE animation starts
element.style.willChange = "transform";

// Remove after animation completes
gsap.to(element, {
  x: 100,
  onComplete: () => {
    element.style.willChange = "auto";
  }
});

// For ScrollTrigger with pinning
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    willChangeTransform: true  // Enables will-change automatically
  }
});
```

### autoAlpha for Visibility

```typescript
// Use autoAlpha instead of opacity for hidden elements
gsap.to(hiddenElement, {
  autoAlpha: 0,    // Sets opacity: 0 AND visibility: hidden
  duration: 0.3
});

gsap.to(visibleElement, {
  autoAlpha: 1,     // Sets opacity: 1 AND visibility: visible
  duration: 0.3
});
```

### Batch Animations

```typescript
import { gsap } from "gsap";

const boxes = gsap.utils.toArray(".box");

// Group animation with batch
gsap.to(boxes, {
  x: 100,
  duration: 0.5,
  stagger: {
    each: 0.1,
    from: "start",
    grid: "auto"
  }
});

// Batch with onComplete
gsap.to(boxes, {
  x: 100,
  stagger: 0.1,
  onComplete: () => console.log("All done")
});
```

### QuickSetter (Performance-critical)

```typescript
// For frequent updates (like scroll callbacks)
const quickSetter = gsap.quickSetter(element, "x", "px");

// Much faster than gsap.to() in tight loops
function onScroll() {
  quickSetter(scrollY * 0.5);
}
```

### gsap.ticker for RAF

```typescript
// Use gsap's ticker instead of requestAnimationFrame
gsap.ticker.add(myUpdateFunction);

// For performance: remove when not needed
gsap.ticker.remove(myUpdateFunction);

// Adjust lag smoothing
gsap.ticker.lagSmoothing(0);
gsap.ticker.frameRate(60);
```

### ScrollTrigger Optimization

```typescript
// Pin optimization
ScrollTrigger.config({
  ignoreMobileResize: true  // Better mobile handling
});

// Debounced refresh
let refreshTimeout;
window.addEventListener("resize", () => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});

// Use markers only in dev
scrollTrigger: {
  trigger: ".element",
  start: "top center",
  end: "bottom center",
  // markers: true  // REMOVE IN PRODUCTION
}
```

### GPU Layer Promotion

```typescript
// Force GPU layer
gsap.set(element, {
  force3D: true,  // Enables transform: translateZ(0)
  transformOrigin: "50% 50%"
});

// For fixed position elements
element.style.backfaceVisibility = "hidden";
element.style.perspective = "1000px";
```

### Memory Management

```typescript
// Kill unused tweens/timelines
tl.kill();           // Kill specific timeline
gsap.killTweensOf(target);  // Kill all tweens on element

// Clear all ScrollTriggers on unmount
ScrollTrigger.getAll().forEach(t => t.kill());

// Use context for cleanup (see gsap-react)
const ctx = gsap.context(() => {
  // animations
}, scopeRef);
return () => ctx.revert();
```

## Commands

```bash
npm install gsap

# For development only
npm install gsap-dev  # Adds performance warnings
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]

## UTILS

## When to Use

- Value conversion and mapping
- Random generation
- Array manipulation
- Clamping and snapping
- Selector handling

## Critical Patterns

### Import

```typescript
import { gsap } from "gsap";
// All utils available via gsap.utils
const { clamp, random, mapRange, toArray } = gsap.utils;
```

### clamp

```typescript
// Clamp value between min and max
const result = clamp(0, 100, 150);  // Returns 100
const result2 = clamp(0, 100, -50); // Returns 0
const result3 = clamp(0, 100, 50); // Returns 50

// Function version for reuse
const clamp01 = clamp(0, 1);
const normalized = clamp01(1.5); // Returns 1
```

### mapRange

```typescript
// Map value from one range to another
const result = mapRange(0, 100, 0, 1, 50);  // Returns 0.5

// With inRange check
const result2 = mapRange(0, 100, 0, 1, 150, false); // Returns 1 (not clamped)

// Clamped version
const result3 = mapRange(0, 100, 0, 1, -50); // Returns 0 (clamped)
```

### normalize

```typescript
// Normalize value to 0-1 range
const result = normalize(50, 0, 100); // Returns 0.5
const result2 = normalize(0, 0, 100);  // Returns 0
const result3 = normalize(100, 0, 100); // Returns 1
```

### interpolate

```typescript
// Interpolate between two values
const result = interpolate(0, 100, 0.5);    // Returns 50
const result2 = interpolate(0, 100, 0);     // Returns 0
const result3 = interpolate(0, 100, 1);     // Returns 100

// With custom interpolator (e.g., color)
const interpolateColor = interpolate("red", "blue");
const color = interpolateColor(0.5); // Purple-ish

// Array interpolation
const interpolateArrays = interpolate([0, 0], [100, 100]);
const [x, y] = interpolateArrays(0.5); // [50, 50]
```

### random

```typescript
// Random number
random(0, 100);       // 0 to 100 (inclusive)
random(0, 100, true); // Float

// Random from array
random(["a", "b", "c"]); // "a" or "b" or "c"

// Random with step
random(0, 10, 2);     // 0, 2, 4, 6, 8, or 10
```

### snap

```typescript
// Snap to nearest value
snap(0.7, 0.1);  // 0.7
snap(0.73, 0.1); // 0.7

// Snap to array of values
snap(5, [0, 5, 10, 15]); // 5
snap(7, [0, 5, 10, 15]); // 5 (nearest)

// Snap to increment
snap(3.7, 0.5); // 3.5
```

### toArray

```typescript
// Convert any value to array
const arr = toArray(".box");     // All .box elements
const arr2 = toArray(document.querySelectorAll(".item"));
const arr3 = toArray("div");     // All divs
const arr4 = toArray(ref.current); // Single element wrapped
```

### selector

```typescript
// Create scoped selector function
const s = gsap.utils.selector(containerRef);

s(".item");      // containerRef.querySelectorAll(".item")
s(".item", 0);   // containerRef.querySelector(".item")

// Useful inside contexts
const ctx = gsap.context(() => {
  const s = gsap.utils.selector(scopeRef);
  gsap.to(s(".box"), { x: 100 });
}, scopeRef);
```

### wrap

```typescript
// Wrap value within range (loops)
wrap(0, 10, 5);  // 5
wrap(0, 10, 11); // 1 (wraps around)
wrap(0, 10, -1); // 9

// Wrap with unit
wrap(0, 360, 370); // 10 degrees
```

### wrapYoyo

```typescript
// Wrap with yoyo (bounces at edges)
wrapYoyo(0, 10, 5);   // 5
wrapYoyo(0, 10, 11);  // 9
wrapYoyo(0, 10, -1);  // 1
```

### distribute

```typescript
// Distribute values evenly in a range
const values = distribute(0, 100, 5);
// [0, 25, 50, 75, 100]

// Center-aligned
const centered = distribute(0, 100, 3, "center");
// [16.67, 50, 83.33]
```

### shuffle

```typescript
// Shuffle array in place
const arr = [1, 2, 3, 4, 5];
shuffle(arr);
// arr is now randomly ordered
```

## Commands

```bash
npm install gsap
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]