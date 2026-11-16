# Первичная загрузка полного проекта в GitHub

Репозиторий: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon

Интеграция GitHub установлена для аккаунта lenconcoira2007-spec; права чтения и записи подтверждены. Markdown-документация и текстовые исходники уже добавлены напрямую.

## Один ручной шаг для переноса всех бинарных файлов

1. Скачайте архив ASIDE_PRO_Tattoo_Salon_Project.zip из этого чата.
2. Откройте репозиторий по ссылке выше.
3. Нажмите Add file → Upload files.
4. Перетащите ZIP-архив в корень репозитория. Не распаковывайте архив в браузере.
5. Внизу страницы оставьте commit в ветку main и нажмите Commit changes.
6. Откройте вкладку Actions и проверьте workflow Import ASIDE PRO bundle and deploy GitHub Pages.

Workflow распакует ZIP, добавит папки и файлы в репозиторий, удалит временный ZIP, создаст отдельный коммит от github-actions[bot] и опубликует сайт. Workflow использует permissions contents: write, pages: write и id-token: write.

## После импорта

- Проверьте, что появились index.html, css/, JS/, images/, database/, docs/, tests/ и screenshots/.
- Проверьте, что в docs/ есть ТЗ и документация в DOCX и Markdown.
- Убедитесь, что GitHub Pages использует GitHub Actions как источник публикации.
- Откройте URL Pages, выведенный в Actions.

Не отправляйте пароли, токены или recovery codes в чат и не добавляйте секреты в репозиторий.