module.exports = async function formatter(results) {
  const mod = await import('./index.js')
  return mod.default(results)
}