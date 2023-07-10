const c = require('child_process').execSync

const ex = command => {
  return c(`${command}`, { encoding: 'utf-8' })
}

//todo
