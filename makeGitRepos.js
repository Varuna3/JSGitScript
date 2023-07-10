/*
************ READ ME ***************

Script assumes you have already made the appropriate github repos,
but that the repos are empty.

I honestly have absolutely no idea what happens if you try to push
to a repo that doesn't exist. My guess is that the script will error,
and I honestly can't be bothered to handle the error. Make the repo.

*/

const c = require('child_process').execSync

const ex = command => {
  return c(`${command}`, { encoding: 'utf-8' })
}

let dirs = ex('cd src/ && ls')
dirs = dirs.split('\n')
dirs.pop()

// update script repo -- has to be first so we don't push BEFORE updating files
ex(`cp ./makeGitRepos.js src/JSGitScript/ && cp ./update.js src/JSGitScript/`)

dirs.forEach((e, i, a) => {
  let tmp = ex(`cd src/${e} && ls -a`).split('\n')
  if (tmp.indexOf('.git') < 0) {
    // console.log(i)
    console.log(
      ex(
        `cd src/${e} && git init && git add -A && git commit -m "im scripting this, teehee" && git remote add origin git@github.com:Varuna3/${e}.git && git branch -M main && git push -u origin main`
      )
    )
  } else if (
    ex(`cd src/${e} && git status`) !== ex(`cd src/wb-learn-git && git status`)
  ) {
    console.log('aaa')
    ex(
      `cd src/${e} && git add -A && git commit -m "im scripting this, teehee" && git push`
    )
  }
})
