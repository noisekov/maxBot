<img width="786" height="342" alt="образец" src="https://github.com/user-attachments/assets/42df1884-e172-47b6-98c7-4bf57f41da04" />
# telegramBot

[Deploy](https://noisekov.github.io/telegramBot/)

## Описание

Тестовое приложение для отправки и получения сообщений через [Green API](https://green-api.com/).

## Установка

Склонируйте репозиторий:

```bash
git clone https://github.com/noisekov/telegramBot.git
```



Перейдите в папку проекта:

```bash
cd telegramBot
```

## Настройка API

Перед запуском проекта создайте файл `.env` в корне проекта:

```env
VITE_API_URL= "https://9999.api.green-api.com"
```

Вместо `https://9999.api.green-api.com` укажите ваш `apiUrl` из Green API.

## Запуск проекта

Установите зависимости:

```bash
npm install
```

Запустите проект в режиме разработки:

```bash
npm run dev
```

После запуска откройте приложение в браузере по адресу [http://localhost:5173/](http://localhost:5173/).

## Авторизация

На странице входа необходимо указать данные вашей учётной записи Green API:

- **idInstance** — идентификатор инстанса;
- **apiTokenInstance** — токен API.

Эти данные можно найти в личном кабинете Green API.

После ввода корректных данных можно использовать приложение для работы с чатами и отправки сообщений.
