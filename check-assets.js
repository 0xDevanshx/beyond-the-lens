import fs from 'fs'

const files = ['1.glb', '2.glb', '3.glb']

files.forEach(file => {
  try {
    const stats = fs.statSync(file)
    console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
  } catch (e) {
    console.log(`${file} not found.`)
  }
})
