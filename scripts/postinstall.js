const fs = require('fs');
const path = require('path');
const { getArgs } = require('./helpers/args');

const TRUE = 'true';

const {
	copy,
	c,
	symlink = true,
	s,
	'ignore-configs': ignoreConfigs = false,
	'clear-cache': clearCache,
} = getArgs(process.argv);

const isSymlink = String(symlink) === TRUE || String(s) === TRUE;
const isCopy = String(copy) === TRUE || String(c) === TRUE;
const isClearCache = String(clearCache) === TRUE;
const isIgnoreConfigs = String(ignoreConfigs) === TRUE;

function clearNodeModulesCache() {
	const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

	fs.readdir(nodeModulesPath, (err, files) => {
		if (err) {
			console.error('Error while reading node_modules:', err);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(nodeModulesPath, file);
			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error('Error while getting info about file:', err);
					return;
				}

				if (stats.isDirectory()) {
					const cachePath = path.join(filePath, '.cache');
					fs.rm(cachePath, { recursive: true, force: true }, (err) => {
						if (err) {
							console.error('Error while cleaning cache:', err);
							return;
						}

						console.log(`Cache in ${cachePath} successfully cleared.`);
					});
				}
			});
		});
	});
}

function transportConfigs() {
	const source = path.resolve(__dirname, '../configs');
	const appsDir = path.resolve(__dirname, '../apps');

	if (!fs.existsSync(appsDir)) {
		console.error('Folder apps not found:', appsDir);
		return;
	}

	const projects = fs
		.readdirSync(appsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	projects.forEach((project) => {
		const destination = path.resolve(appsDir, project, 'configs');

		if (fs.existsSync(destination)) {
			try {
				const stat = fs.lstatSync(destination);

				if (stat.isSymbolicLink()) {
					fs.unlinkSync(destination);
					console.log(`Deleted symlink of folder configs in: ${destination}`);
				} else if (stat.isDirectory()) {
					fs.rmSync(destination, { recursive: true, force: true });
					console.log(`Deleted directory by path: ${destination}`);
				}
			} catch (err) {
				console.error(`Error while clear folder for ${project}:`, err);
				return;
			}
		}

		try {
			if (isCopy) {
				fs.cpSync(source, destination, { recursive: true });
				console.log(`Folder configs copied into: ${destination}`);
				return;
			}

			if (isSymlink) {
				fs.symlinkSync(source, destination, 'dir');
				console.log(`Created symlink of folder configs in: ${destination}`);
				return;
			}

			throw new Error('No one of mods are not activated');
		} catch (err) {
			console.error(`Error while copying folder "configs" for project ${project}:`, err);
		}
	});
}

if (isClearCache) {
	clearNodeModulesCache();
}

if (!isIgnoreConfigs) {
	transportConfigs();
}
