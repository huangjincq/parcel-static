const execSync = require('child_process').execSync

execSync(`parcel -p 1239 --open`, { stdio: 'inherit' })
