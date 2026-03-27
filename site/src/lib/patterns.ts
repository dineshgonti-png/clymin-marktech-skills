/**
 * SVG Hero Pattern Generator
 * Generates unique abstract backgrounds for each page,
 * seeded from the page slug so patterns are deterministic.
 * Colors are loaded from brand.yaml via brand.ts.
 */

import { brand } from './brand';

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Pattern 1: Floating circles
function circles(rand: () => number, colors: string[], w: number, h: number): string {
  let svg = '';
  const count = 15 + Math.floor(rand() * 15);
  for (let i = 0; i < count; i++) {
    const cx = rand() * w;
    const cy = rand() * h;
    const r = 8 + rand() * 50;
    const color = colors[Math.floor(rand() * colors.length)];
    const opacity = 0.04 + rand() * 0.1;
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
  }
  return svg;
}

// Pattern 2: Flowing wave paths
function waves(rand: () => number, colors: string[], w: number, h: number): string {
  let svg = '';
  const lineCount = 4 + Math.floor(rand() * 4);
  for (let i = 0; i < lineCount; i++) {
    const yBase = (h / (lineCount + 1)) * (i + 1) + (rand() - 0.5) * 40;
    const amplitude = 20 + rand() * 40;
    const freq = 0.003 + rand() * 0.005;
    const phase = rand() * Math.PI * 2;
    let d = `M 0 ${yBase}`;
    for (let x = 0; x <= w; x += 20) {
      const y = yBase + Math.sin(x * freq + phase) * amplitude;
      d += ` L ${x} ${y}`;
    }
    const color = colors[Math.floor(rand() * colors.length)];
    const opacity = 0.06 + rand() * 0.08;
    const strokeWidth = 1 + rand() * 2;
    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
  }
  return svg;
}

// Pattern 3: Dot matrix with random gaps
function dots(rand: () => number, colors: string[], w: number, h: number): string {
  let svg = '';
  const spacing = 30 + Math.floor(rand() * 20);
  const dotR = 1.5 + rand() * 2;
  const color = colors[0];
  for (let x = spacing; x < w; x += spacing) {
    for (let y = spacing; y < h; y += spacing) {
      if (rand() > 0.4) {
        const opacity = 0.06 + rand() * 0.12;
        const r = dotR + rand() * 1.5;
        svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
      }
    }
  }
  return svg;
}

// Pattern 4: Connected network nodes
function network(rand: () => number, colors: string[], w: number, h: number): string {
  let svg = '';
  const nodeCount = 12 + Math.floor(rand() * 10);
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ x: rand() * w, y: rand() * h });
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250) {
        const opacity = 0.03 + (1 - dist / 250) * 0.06;
        svg += `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[j].x}" y2="${nodes[j].y}" stroke="${colors[0]}" stroke-width="1" opacity="${opacity}"/>`;
      }
    }
  }
  for (const node of nodes) {
    const opacity = 0.08 + rand() * 0.12;
    const r = 3 + rand() * 5;
    svg += `<circle cx="${node.x}" cy="${node.y}" r="${r}" fill="${colors[Math.floor(rand() * colors.length)]}" opacity="${opacity}"/>`;
  }
  return svg;
}

// Pattern 5: Angular geometric shapes
function angular(rand: () => number, colors: string[], w: number, h: number): string {
  let svg = '';
  const shapeCount = 6 + Math.floor(rand() * 8);
  for (let i = 0; i < shapeCount; i++) {
    const cx = rand() * w;
    const cy = rand() * h;
    const size = 30 + rand() * 80;
    const sides = 3 + Math.floor(rand() * 4);
    const rotation = rand() * 360;
    const color = colors[Math.floor(rand() * colors.length)];
    const opacity = 0.04 + rand() * 0.08;
    let points = '';
    for (let s = 0; s < sides; s++) {
      const angle = (Math.PI * 2 * s) / sides + (rotation * Math.PI) / 180;
      const px = cx + Math.cos(angle) * size;
      const py = cy + Math.sin(angle) * size;
      points += `${px},${py} `;
    }
    svg += `<polygon points="${points.trim()}" fill="${color}" opacity="${opacity}"/>`;
  }
  return svg;
}

const generators = [circles, waves, dots, network, angular];

export function generateHeroPattern(slug: string, segment: string): string {
  const segmentColors = brand.design.segment_colors;
  const defaultColors = segmentColors['_default'] || ['#ebeb41', '#ffc091'];

  const h = hash(slug);
  const rand = seededRandom(h);
  const patternIndex = h % generators.length;
  const colors = segmentColors[segment] || defaultColors;
  const w = 1200, ht = 400;
  const elements = generators[patternIndex](rand, colors, w, ht);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${ht}" preserveAspectRatio="xMidYMid slice">${elements}</svg>`;
}
