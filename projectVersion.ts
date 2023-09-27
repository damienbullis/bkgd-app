import { readFileSync } from 'fs'
import { exec } from 'child_process'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
const version = packageJson.version

exec(`echo ${version}`, (error, stdout) => {
  if (error) {
    console.error(`Error executing command: ${error}`)
    return
  }
  console.log(stdout)
})
