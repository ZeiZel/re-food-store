const fs = require('fs');
const path = require('path');

(function clearNodeModulesCache() {
	const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

	fs.readdir(nodeModulesPath, (err, files) => {
		if (err) {
			console.error('Reading error of reading node_modules:', err);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(nodeModulesPath, file);
			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error('Error of getting data about file:', err);
					return;
				}

				if (stats.isDirectory()) {
					const cachePath = path.join(filePath, '.cache');
					fs.rm(cachePath, { recursive: true, force: true }, (err) => {
						if (err) {
							console.error('Cache deleting error:', err);
							return;
						}

						console.log(`Cache in ${cachePath} succesfully cleared.`);
					});
				}
			});
		});
	});
})();
