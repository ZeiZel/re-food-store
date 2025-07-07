const { execSync } = require('child_process');

const mainBranches = ['main', 'master'];
const branch = execSync('git branch --show-current').toString().trim();

if (mainBranches.includes(branch)) {
	const tags = execSync('git tag --points-at HEAD').toString().trim();

	if (!tags) {
		console.error('Ошибка: Коммит должен быть тегирован перед мерджем в master!');
		console.error('Используйте команду: git tag -a <версия> -m "Сообщение"');
		console.error('А так же, чтобы запушить теги: git push --tags');
		process.exit(1);
	}
}

console.log('Тег присутствует, мердж разрешён.');
process.exit(0);
