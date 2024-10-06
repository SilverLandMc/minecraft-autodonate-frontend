const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Шаг 1: Получить текущий core.hooksPath
const currentHooksPath = execSync('git config core.hooksPath || echo ""').toString().trim();

// Шаг 1.1 Получить путь до .gitHooks
const hooksPath = path.join(process.cwd(), '.gitHooks');

// Шаг 1.2: Проверить существование hooksPath
if (!fs.existsSync(hooksPath)) {
    console.error(`Ошибка: Директория ${hooksPath} не существует. Убедитесь, что путь к хукам правильный.`);
    process.exit(1);
}

// Шаг 2: Если значение совпадает с тем, который мы хотим установить, то завершаем выполнение
if (currentHooksPath === hooksPath) {
    console.log(`core.hooksPath уже настроен на этот путь (${hooksPath})`);
    process.exit(0);
}

// Шаг 3: Устанавливаем core.hooksPath
const command = `git config core.hooksPath ${hooksPath}`;
console.log(`Устанавливаем core.hooksPath на: "${hooksPath}"`);
execSync(command);

// Шаг 4: Выводим вычисленный текущий core.hooksPath
const newHooksPath = execSync('git config core.hooksPath').toString().trim();
console.log(`Готово! Новый core.hooksPath: "${newHooksPath}"`);
