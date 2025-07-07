const getArgs = (args) => {
	const res = { _: [] };
	const [executer, file, ...rest] = args;

	for (let i = 0; i < rest.length; i++) {
		const current = rest[i];

		if (current.includes('=')) {
			const [keyPart, ...valueParts] = current.split('=');
			const value = valueParts.join('=');

			if (keyPart.startsWith('-')) {
				const key = keyPart.replace(/^-+/, '');
				res[key] = value || true;
				continue;
			}
		}

		if (current.startsWith('-')) {
			const key = current.replace(/^-+/, '');

			if (i + 1 < rest.length && !rest[i + 1].startsWith('-')) {
				res[key] = rest[i + 1];
				i++;
			} else {
				res[key] = true;
			}
			continue;
		}

		res._.push(current);
	}

	return res;
};

module.exports = { getArgs };
