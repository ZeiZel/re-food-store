const fs = require('fs');
const path = require('path');

(function clearNodeModulesCache() {
	const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

	fs.readdir(nodeModulesPath, (err, files) => {
		if (err) {
			console.error('Ошибка чтения содержимого папки node_modules:', err);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(nodeModulesPath, file);
			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error('Ошибка получения информации о файле:', err);
					return;
				}

				if (stats.isDirectory()) {
					const cachePath = path.join(filePath, '.cache');
					fs.rm(cachePath, { recursive: true, force: true }, (err) => {
						if (err) {
							console.error('Ошибка удаления кэша:', err);
							return;
						}

						console.log(`Кэш в ${cachePath} успешно очищен.`);
					});
				}
			});
		});
	});
})();
