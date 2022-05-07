const execSync = require('child_process').execSync

const deploy = () => {
  execSync(`parcel build --no-optimize`, { stdio: 'inherit' })

  execSync(`cd dist`)

  execSync(`git init`)
  execSync(`git add -A`)
  execSync(`git commit -m 'deploy'`)
  execSync(`git push -f git@github.com:huangjincq/parcel-static.git master:gh-pages`)

  execSync(`-`)
}

deploy()
