const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

const PACKAGES_TO_ENFORCE = ['react', 'react-dom', 'next'];

// Backup storage
const backups = new Map();

function executeCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: true },
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function getLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'registry.npmjs.org',
      path: `/${packageName}/latest`,
      method: 'GET',
      headers: { Accept: 'application/json' },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const version = JSON.parse(data).version;
          resolve(`^${version}`);
        } catch (error) {
          reject(new Error(`Failed to parse version for ${packageName}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Failed to fetch version for ${packageName}`));
    });

    req.end();
  });
}

async function getLatestVersions() {
  console.log(colors.blue('\nFetching latest versions from npm...'));
  const versions = {};

  try {
    await Promise.all(
      PACKAGES_TO_ENFORCE.map(async (pkg) => {
        versions[pkg] = await getLatestVersion(pkg);
        console.log(colors.green(`✓ ${pkg}@${versions[pkg]}`));
      }),
    );
    return versions;
  } catch (error) {
    throw new Error('Failed to fetch latest versions');
  }
}

function backupPackageJson(packagePath, content) {
  backups.set(packagePath, JSON.stringify(content));
}

function restoreBackups() {
  console.log(colors.yellow('\nRestoring package.json files to their original state...'));
  for (const [packagePath, content] of backups.entries()) {
    try {
      fs.writeFileSync(packagePath, content);
      console.log(colors.green(`✓ Restored ${packagePath}`));
    } catch (error) {
      console.error(colors.red(`Failed to restore ${packagePath}`));
    }
  }
}

function findPackageJsons(rootDir) {
  const results = {
    apps: [],
    packages: [],
  };

  // Check apps directory
  const appsDir = path.join(rootDir, 'apps');
  if (fs.existsSync(appsDir)) {
    fs.readdirSync(appsDir).forEach((app) => {
      const appDir = path.join(appsDir, app);
      if (!fs.statSync(appDir).isDirectory()) return;

      const packageJsonPath = path.join(appDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          const hasEnforcedPackage = PACKAGES_TO_ENFORCE.some(
            (pkg) =>
              (content.dependencies && pkg in content.dependencies) ||
              (content.devDependencies && pkg in content.devDependencies),
          );
          if (hasEnforcedPackage) {
            results.apps.push({
              name: app,
              path: packageJsonPath,
              content,
              directory: appDir,
            });
          }
        } catch (error) {
          console.error(colors.red(`Error reading ${packageJsonPath}`));
        }
      }
    });
  }

  // Check packages directory
  const packagesDir = path.join(rootDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    fs.readdirSync(packagesDir).forEach((pkg) => {
      const pkgDir = path.join(packagesDir, pkg);
      if (!fs.statSync(pkgDir).isDirectory()) return;

      const packageJsonPath = path.join(pkgDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          const hasEnforcedPackage = PACKAGES_TO_ENFORCE.some(
            (pkg) =>
              (content.dependencies && pkg in content.dependencies) ||
              (content.devDependencies && pkg in content.devDependencies),
          );
          if (hasEnforcedPackage) {
            results.packages.push({
              name: pkg,
              path: packageJsonPath,
              content,
              directory: pkgDir,
            });
          }
        } catch (error) {
          console.error(colors.red(`Error reading ${packageJsonPath}`));
        }
      }
    });
  }

  return results;
}

function updatePackageVersion(content, packageName, targetVersion) {
  let updated = false;
  ['dependencies', 'devDependencies'].forEach((depsType) => {
    if (content[depsType]?.[packageName] && !content[depsType][packageName].startsWith('workspace:')) {
      content[depsType][packageName] = targetVersion;
      updated = true;
    }
  });
  return updated;
}

async function main() {
  try {
    // Step 1: Get latest versions
    const latestVersions = await getLatestVersions();

    // Step 2: Find and update package.json files
    const { apps, packages } = findPackageJsons(process.cwd());
    console.log(colors.blue(`\nFound ${apps.length} apps and ${packages.length} packages to update`));

    // Create backups before making any changes
    [...apps, ...packages].forEach(({ path, content }) => backupPackageJson(path, content));

    // Update versions
    let updatedCount = 0;
    [...apps, ...packages].forEach(({ path, content }) => {
      let updated = false;
      Object.entries(latestVersions).forEach(([pkg, version]) => {
        if (updatePackageVersion(content, pkg, version)) {
          updated = true;
        }
      });
      if (updated) {
        fs.writeFileSync(path, JSON.stringify(content, null, 2) + '\n');
        updatedCount++;
      }
    });

    if (updatedCount === 0) {
      console.log(colors.green('\nAll packages are already up to date!'));
      return;
    }

    // Step 3: Run npm install at root
    console.log(colors.blue('\nRunning npm install at root...'));
    if (!executeCommand('npm install')) {
      throw new Error('Root npm install failed');
    }

    // Step 4: Run npm install for each app using workspace flag
    if (apps.length > 0) {
      console.log(colors.blue('\nUpdating apps...'));
      for (const app of apps) {
        console.log(colors.blue(`\nUpdating ${app.name}...`));
        if (!executeCommand(`npm install --workspace=${app.name}`)) {
          throw new Error(`npm install failed for app ${app.name}`);
        }
      }
    }

    // Step 5: Run npm install for each package using workspace flag
    if (packages.length > 0) {
      console.log(colors.blue('\nUpdating packages...'));
      for (const pkg of packages) {
        console.log(colors.blue(`\nUpdating ${pkg.name}...`));
        if (!executeCommand(`npm install --workspace=packages/${pkg.name}`)) {
          throw new Error(`npm install failed for package ${pkg.name}`);
        }
      }
    }

    // Step 6: Run builds
    console.log(colors.blue('\nRunning builds...'));

    // Build apps
    for (const app of apps) {
      console.log(colors.blue(`\nBuilding ${app.name}...`));
      if (!executeCommand(`npm run build --workspace=${app.name}`)) {
        throw new Error(`Build failed for app ${app.name}`);
      }
    }

    // Build packages
    for (const pkg of packages) {
      const pkgJson = JSON.parse(fs.readFileSync(pkg.path));
      if (pkgJson.scripts?.build) {
        console.log(colors.blue(`\nBuilding ${pkg.name}...`));
        if (!executeCommand(`npm run build --workspace=packages/${pkg.name}`)) {
          throw new Error(`Build failed for package ${pkg.name}`);
        }
      }
    }

    console.log(colors.green('\n✓ All updates completed successfully!'));
  } catch (error) {
    console.error(colors.red(`\n❌ Error: ${error.message}`));
    restoreBackups();
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(colors.red(`\n❌ Fatal error: ${error.message}`));
  restoreBackups();
  process.exit(1);
});
