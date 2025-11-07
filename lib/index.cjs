module.exports = async function formatter(results, data) {
  const mod = await import('./index.js')
  return mod.default(results, data)
}