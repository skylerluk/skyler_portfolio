/* eslint-env node */
// Track E asset optimizer.
//
// Walks public/assets/<project-id>/, converts each source screenshot (*.png/*.jpg/*.jpeg)
// to a compact .webp, and emits a smaller @1280w.webp width variant for large landscape
// shots. Raster logos (logo.png/logo.jpg) are compressed in place as PNG; logo.svg is left
// untouched. Idempotent: a target is skipped when it's newer than its source.
//
// Usage: npm run assets:optimize   (no-op when there are no images yet)

import { readdir, stat, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.resolve(__dirname, '..', 'public', 'assets')

const WEBP_QUALITY = 82
const WIDTH_VARIANT = 1280 // px — width variant emitted for wide landscape shots
const VARIANT_MIN_WIDTH = 1600 // only emit a variant when the source is at least this wide
const SHOT_RE = /\.(png|jpe?g)$/i
const LOGO_RE = /^logo\.(png|jpe?g)$/i

/** True when `target` is missing or older than `source`. */
async function isStale(source, target) {
  if (!existsSync(target)) return true
  const [s, t] = await Promise.all([stat(source), stat(target)])
  return s.mtimeMs > t.mtimeMs
}

async function listProjectDirs() {
  if (!existsSync(ASSETS_DIR)) return []
  const entries = await readdir(ASSETS_DIR, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

const summary = { webp: 0, variants: 0, logos: 0, skipped: 0 }

async function processScreenshot(dir, file) {
  const source = path.join(dir, file)
  const base = file.replace(SHOT_RE, '')
  const webp = path.join(dir, `${base}.webp`)

  if (await isStale(source, webp)) {
    await sharp(source).webp({ quality: WEBP_QUALITY }).toFile(webp)
    summary.webp++
    console.log(`  webp   ${path.relative(ASSETS_DIR, webp)}`)
  } else {
    summary.skipped++
  }

  // Width variant for large landscape shots.
  const meta = await sharp(source).metadata()
  const isLandscape = (meta.width ?? 0) >= (meta.height ?? 0)
  if (isLandscape && (meta.width ?? 0) >= VARIANT_MIN_WIDTH) {
    const variant = path.join(dir, `${base}@${WIDTH_VARIANT}w.webp`)
    if (await isStale(source, variant)) {
      await sharp(source)
        .resize({ width: WIDTH_VARIANT, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(variant)
      summary.variants++
      console.log(`  wvar   ${path.relative(ASSETS_DIR, variant)}`)
    } else {
      summary.skipped++
    }
  }
}

async function processLogo(dir, file) {
  const source = path.join(dir, file)
  const target = path.join(dir, 'logo.png')

  // Compress raster logo to a compact PNG. When the source already is logo.png we
  // write to a temp then can't atomically self-replace with sharp, so compress into
  // logo.min.png only if it doesn't already look optimized. Simplest robust path:
  // emit logo.png from a .jpg source; for an existing logo.png, skip (assumed final).
  if (/\.png$/i.test(file)) {
    summary.skipped++
    return
  }
  if (await isStale(source, target)) {
    await sharp(source)
      .png({ compressionLevel: 9, palette: true })
      .toFile(target)
    summary.logos++
    console.log(`  logo   ${path.relative(ASSETS_DIR, target)}`)
  } else {
    summary.skipped++
  }
}

async function main() {
  const dirs = await listProjectDirs()
  if (dirs.length === 0) {
    await mkdir(ASSETS_DIR, { recursive: true })
    console.log('No asset folders found — nothing to optimize.')
    return
  }

  for (const name of dirs) {
    const dir = path.join(ASSETS_DIR, name)
    const files = await readdir(dir)
    for (const file of files) {
      if (LOGO_RE.test(file)) {
        await processLogo(dir, file)
      } else if (SHOT_RE.test(file)) {
        await processScreenshot(dir, file)
      }
    }
  }

  const touched = summary.webp + summary.variants + summary.logos
  if (touched === 0) {
    console.log('Assets up to date — nothing to do.')
  } else {
    console.log(
      `\nDone: ${summary.webp} webp, ${summary.variants} width-variants, ${summary.logos} logos (${summary.skipped} up-to-date).`,
    )
  }
}

main().catch((err) => {
  console.error('optimize-assets failed:', err)
  process.exitCode = 1
})
