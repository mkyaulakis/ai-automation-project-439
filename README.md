# Автоматизация разбора файлов


[![hexlet-check](https://github.com/mkyaulakis/ai-automation-project-439/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mkyaulakis/ai-automation-project-439/actions)

Напишите консольную программу на JavaScript, которая разбирает папку с документами
компании: определяет тип каждого файла, находит дубликаты, отделяет полезные документы
от посторонних и собирает реестр. Отдельная команда сводит выгрузки контактов из разных
источников в одну таблицу — приводит колонки к единому виду, нормализует телефоны
и email, убирает повторы.

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-automation


## Стек

- JavaScript

## Установка

Нужны Node.js 20+ и Git.

```bash
git clone https://github.com/mkyaulakis/ai-automation-project-439.git
cd ai-automation-project-439
npm install
npm link
```

После `npm link` программа доступна в терминале под именем `file-automation`.

Набор тестовых данных (не хранится в репозитории):

```bash
git clone --depth 1 https://github.com/hexlet-components/data-company-files.git
mv data-company-files/company-files company-files
rm -rf data-company-files
```

## Использование

```bash
file-automation                                   # справка
file-automation files <папка> [--out <папка>]     # реестр документов
file-automation contacts <папка> [--out <папка>]  # чистая таблица контактов
```

Значение `--out` по умолчанию — `./out`. В папку компании программа ничего не пишет.

Что появляется в папке `--out`:

- `registry.csv` — реестр: по строке на каждый файл папки (путь, имя, тип, размер, хеш, статус, основная копия, число строк и колонки табличных документов);
- `contacts.csv` — чистая таблица контактов: имя, телефон, почта, источники;
- `report.txt` — отчёт для человека: что требует ручного разбора, что можно удалить, группы копий и контакты;
- `report.json` — тот же отчёт для других программ.

Пример:

```bash
$ file-automation files ./company-files --out ./out
Файлов найдено: 40
Табличных документов: 21, текстовых: 8, непарсимых: 11
Документов: 28, требуют ручного разбора: 7, посторонних: 5
Копий найдено: 5 в 3 группах
Реестр: out/registry.csv
Отчёт: out/report.txt
Отчёт для программ: out/report.json
```

Проверка кода линтером:

```bash
npm run lint
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
