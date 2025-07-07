const { readdir, writeFile } = require('fs');
const { join: joinPath, relative } = require('path');
const { promisify } = require('util');

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

/** путь до локи скришотов */
const lokiDir = joinPath(__dirname, '..', '.loki');
/** текущие скришоты */
const actualDir = joinPath(lokiDir, 'current');
/** референсы скришотов */
const expectedDir = joinPath(lokiDir, 'reference');
/** отличия между скриншотами */
const diffDir = joinPath(lokiDir, 'difference');

(async function main() {
	const diffs = await asyncReaddir(diffDir);

	await writeFileAsync(
		joinPath(lokiDir, 'report.json'),
		JSON.stringify({
			newItems: [],
			deletedItems: [],
			passedItems: [],
			failedItems: diffs,
			expectedItems: diffs,
			actualItems: diffs,
			diffItems: diffs,
			actualDir: relative(lokiDir, actualDir),
			expectedDir: relative(lokiDir, expectedDir),
			diffDir: relative(lokiDir, diffDir),
		}),
	);
})();
