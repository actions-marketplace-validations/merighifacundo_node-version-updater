const semver = require('semver')

const validateAndUpdate = (newVersion, package, packageLock) => {
  const releaseBumps = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];
  if (releaseBumps.includes(newVersion)) {
    newVersion = semver.inc(package.version, newVersion);
  }
  if (semver.valid(newVersion) === null) {
    throw new Error("Invalid Version");
  }
  if (package) {
    package.version = newVersion;
  }
  if (packageLock) {
    packageLock.version = newVersion;
  }
  return {package, packageLock};
}

module.exports = validateAndUpdate;