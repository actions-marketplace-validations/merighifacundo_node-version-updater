const  validateAndUpdate  = require("./lib/updater");
const core = require('@actions/core');
const fs = require('fs');

try {
    let newVersion = 'minor';//core.getInput('new-version');
    const packageRaw = fs.readFileSync('package.json');
    const packageLockRaw = fs.readFileSync('package-lock.json');
    let packageLockInformation = JSON.parse(packageLockRaw);
    let packageInformation = JSON.parse(packageRaw);
    const {package, packageLock} = validateAndUpdate(newVersion, packageInformation, packageLockInformation);
    fs.writeFileSync('package.json',JSON.stringify(package, null, 4));
    fs.writeFileSync('package-lock.json',JSON.stringify(packageLock, null, 4));
    console.log(`New version to get updated ${package.version}`);
} catch (error) {
    core.setFailed(error.message);
}