const  validateAndUpdate  = require("./lib/updater");
const core = require('@actions/core');
const fs = require('fs');

try {
    let newVersion = core.getInput('new-version');
    const packageRaw = fs.readFileSync('package.json');
    const packageLockRaw = fs.readFileSync('package-lock.json');
    console.log(packageLockRaw);
    let packageLockInformation = JSON.parse(packageLockRaw);
    let packageInformation = JSON.parse(packageRaw);
    const oldVersion = packageInformation.version;
    const {package, packageLock} = validateAndUpdate(newVersion, packageInformation, packageLockInformation);
    fs.writeFileSync('package.json',JSON.stringify(package, null, 2));
    fs.writeFileSync('package-lock.json',JSON.stringify(packageLock, null, 2));
    console.log(`New version to get updated ${package.version} from ${oldVersion}`);
    core.setOutput('old-version', oldVersion);
    core.setOutput('new-version', package.version);
} catch (error) {
    console.error(error);
    core.setFailed(error.message);
}
