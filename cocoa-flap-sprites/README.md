# Cocoa Flap — sprite assets

Transparent PNG pixel-art sprites for an HTML/CSS/JS Flappy Bird clone.

## Files
| Sprite | Native grid | Files |
|--------|-------------|-------|
| Marshmallow bird | 20×20 | `marshmallow_bird.png`, `_2x`, `_4x` |
| Bottom mug (rising pipe) | 21×27 | `mug_bottom.png`, `_2x`, `_4x` |
| Top mug (hanging pipe) | 21×19 | `mug_top.png`, `_2x`, `_4x` |

Use the `_2x` / `_4x` versions if you want pre-scaled assets, or use the
1× files and scale on the canvas (see below).

## Keeping pixels crisp
In CSS, disable smoothing on the canvas:
```css
canvas { image-rendering: pixelated; }
```
In JS, disable image smoothing on the context:
```js
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
```

## Loading & drawing
```js
function load(src){ return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; }); }

const [bird, mugTop, mugBottom] = await Promise.all([
  load('marshmallow_bird.png'),
  load('mug_top.png'),
  load('mug_bottom.png'),
]);

const SCALE = 3;                       // draw at 3x native size
ctx.drawImage(bird, birdX, birdY, 20*SCALE, 20*SCALE);

// A pipe pair: top mug hangs from the ceiling, bottom mug rises from the floor,
// leaving a gap the marshmallow flaps through.
function drawPipePair(x, gapTop, gapHeight){
  const w = 21*SCALE;
  // top mug: stretch the body upward so it always reaches the ceiling
  ctx.drawImage(mugTop, x, gapTop - 19*SCALE, w, 19*SCALE);
  // bottom mug below the gap
  ctx.drawImage(mugBottom, x, gapTop + gapHeight, w, 27*SCALE);
}
```

Tip: for very tall gaps you can tile/stretch a 1px-wide slice of the mug body
to fill the space so the rim + cocoa always sit at the gap edge.
