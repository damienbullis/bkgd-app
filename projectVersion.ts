const pkg = await Bun.file('package.json').json()

if (pkg.version) {
  const v = `VITE_BKGD_VERSION="${pkg.version}"`
  await Bun.write('.env', v)
}
