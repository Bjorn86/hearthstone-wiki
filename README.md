# Проект - Point of Games

![CI/CD workflow](https://github.com/Bjorn86/point-of-games/actions/workflows/ci-cd.yml/badge.svg?event=push)

Проект представляет из себя SPA, предоставляющие информацию о видеоиграх. Информация о картах предоставляется [RAWG Video Games Database API](https://rawg.io/apidocs).

## Оглавление

- [Обзор проекта](#обзор-проекта)
  - [Задачи проекта](#задачи-проекта)
    - [Требования к проекту](#требования-к-проекту)
  - [Функциональность проекта](#функциональность-проекта)
    - [Использование Console API](#использование-console-api)
    - [Feature flag](#feature-flag)
  - [Screenshot](#screenshot)
  - [Директории проекта](#директории-проекта)
  - [Запуск проекта](#запуск-проекта)
  - [Ссылки](#ссылки)
- [Ход выполнения проекта](#ход-выполнения-проекта)
  - [Используемые технологии и методологии](#используемые-технологии-и-методологии)
  - [Чему я научился работая над проектом](#чему-я-научился-работая-над-проектом)
- [Автор](#автор)

## Обзор проекта

### Задачи проекта

Предоставить пользователям возможность поиска и просмотра информацию о видеоиграх.

#### Требования к проекту

- 1 уровень (обязательный)
  - [x] Реализованы **Требования к функциональности**
  - React
    - [x] **Используются функциональные компоненты c хуками** в приоритете над классовыми ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/features/search/ui/search-form/search-form.jsx))
    - [x] Есть разделение на **умные и глупые компоненты** ([пример умного компонента](https://github.com/Bjorn86/point-of-games/blob/main/src/pages/details/details.jsx), [пример глупого компонента](https://github.com/Bjorn86/point-of-games/blob/main/src/shared/ui/score/score.jsx))
    - [x] Есть **рендеринг списков** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/features/cards/list/ui/cards-list.jsx))
    - [x] Реализована хотя бы одна **форма** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/shared/ui/form/form.jsx))
    - [x] Есть применение **Контекст API** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/app/contexts/current-user.js))
    - [x] Есть применение **предохранителя** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/pages/home/home.jsx))
    - [x] Есть хотя бы один **кастомный хук** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/features/favorites/lib/use-favorites.jsx))
    - [x] Хотя бы несколько компонентов используют **PropTypes** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/widgets/article/ui/article.jsx))
    - [x] Поиск не должен триггерить много запросов к серверу (используется **debounce**) ([пример использования](https://github.com/Bjorn86/point-of-games/blob/main/src/features/search/ui/search-form/search-form.jsx), [useDebounce](https://github.com/Bjorn86/point-of-games/blob/main/src/shared/lib/use-debounce.jsx))
    - [x] Есть применение **lazy + Suspense** ([пример lazy](https://github.com/Bjorn86/point-of-games/blob/main/src/pages/routing/routing.jsx), [пример Suspense](https://github.com/Bjorn86/point-of-games/blob/main/src/app/providers/router-provider.jsx))
  - Redux
    - [x] Используем **Modern Redux with Redux Toolkit**
    - [x] Используем **слайсы** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/entities/auth/model/slice.js))
    - [x] Есть хотя бы одна **кастомная мидлвара** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/app/store/modify-rawg-data.js))
    - [x] Используется **RTK Query** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/shared/api/rawg-api.js))
    - [x] Используется **Transforming Responses** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/shared/api/rawg-api.js))
- 2 уровень (необязательный)
  - [x] Использование **Firebase** для учетных записей пользователей и их Избранного и Истории поиска
  - [x] Настроен **CI/CD**
  - [x] Реализована **виртуализация списков** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/features/history/table/ui/history-table.jsx))
  - [x] Используются **мемоизированные селекторы** ([пример](https://github.com/Bjorn86/point-of-games/blob/main/src/entities/auth/model/slice.js))
  - [x] **Feature Flags.** Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом
  - [x] Связь UI и бизнес-логики построена не через команды, а через **события** ([пример нэйминга экшена](https://github.com/Bjorn86/point-of-games/tree/main/src/features/favorites/model/added-to-favorites.js), [пример использования события](https://github.com/Bjorn86/point-of-games/tree/main/src/features/favorites/lib/use-favorites.jsx))
  - [x] **Project Console API** ([фича](https://github.com/Bjorn86/point-of-games/tree/main/src/features/console))

### Функциональность проекта

В проекте имеется возможность авторизации и регистрации пользователя. Поиска игр по названию с показом саджестов. История поиска сохраняется, пользователь имеет возможность просмотреть её е перейти к ранее выпоенному запросу, либо удалить его. Сохранение понравившихся игр в избранное и просмотр списка избранных игр с возможностью их удаления из списка. По игре можно посмотреть детальную информацию.

#### Использование Console API

В проекте имеется возможность управлять приложением не используя UI. Откройте консоль браузера, вы увидите приветствие и пояснения как использовать Console API.
Список доступных команд:

```javascript
point('/help'); // показывает список доступных команд
point('/signin [email] [password]'); // авторизация пользователя
point('/signup [email] [password]'); // регистрация пользователя
point('/logout'); // выход из аккаунта
point('/search [query]'); // поиск игры по названию
point('/showHistory'); // показывает историю поиска
point('/showFavorites'); // показывает список избранных игр
point('/addFavorite [id]'); // добавляет игру в избранное по ID
point('/removeFavorite [id]'); // удаляет игру из избранного по ID
point('/getGame [id]'); // получает игру по ID
```

#### Feature flag

В корневой директории проекта есть директория `server`, в которой находится локальный API для проекта, который возвращает параметр открывающей в приложении возможность поделится ссылкой на страницу понравившейся игры в Telegram (на карточке игры и на странице детального просмотра появляется соответствующая кнопка).

Для того чтобы воспользоваться данной возможностью скопируйте репозиторий себе и установите необходимые зависимости. Затем перейдите в своей IDE в директорию `server` и установите зависимости для него. Вернитесь в корневую директорию проекта и запустите команду `npm start` для запуска проекта, а в другом терминале запустите команду `npm run server`. Теперь вам доступен этот функционал.

### Screenshot

![screenshot](/screenshots/pog-1.png)
![screenshot](/screenshots/pog-2.png)
![screenshot](/screenshots/pog-3.png)

### Директории проекта

- `src/app` — настройки, стили и провайдеры для всего приложения
- `src/entities` — бизнес-сущности
- `src/features` — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя
- `src/pages` — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов
- `src/shared` — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса
- `src/widgets` — композиционный слой для соединения сущностей и фич в самостоятельные блоки

### Запуск проекта

- `npm start` - режим разработки с запуском локального сервера
- `npm run build` - режим сборки проекта в продакшн
- `npm run server` - запуск локального сервера для Feature flag
- `npm run test` - запуск в режиме тестирования
- `npm run eject` - режим извлечения конфигов CRA
- `npm run lint` - запускает линтер
- `npm run lint:fix` - запускает линтер, в режиме устранения мелких замечаний
- `npm run format` - запуск форматера кода
- `npm run prepare` - подготавливает Husky к работе, запускается единожды при старте проекта
- `npm run commit` - запускает commitizen для коммита
- `npm run storybook` - запускает Storybook в режиме разработки
- `npm run build-storybook` - запускает Storybook в режиме продакшн

### Ссылки

- [Ссылка на репозиторий проекта](https://github.com/Bjorn86/point-of-games)
- [Ссылка на демо-страницу проекта](https://point-of-games.web.app/)

## Ход выполнения проекта

### Используемые технологии и методологии

- Технологии
  - HTML
  - SCSS
  - CSS Modules
  - JS
  - [React](https://react.dev/)
  - [React Router](https://reactrouter.com/en/main)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
  - [Firebase](https://firebase.google.com/)
  - [React Hook Form](https://react-hook-form.com/)
  - [React error boundary](https://www.npmjs.com/package/react-error-boundary)
  - [React virtualized](https://github.com/bvaughn/react-virtualized)
  - [Yup](https://www.npmjs.com/package/yup)
  - [Storybook](https://storybook.js.org/)
  - Семантическая вёрстка
- Методологии
  - [Feature-Sliced Design](https://feature-sliced.design/ru/)

## Автор

**Данила Легкобытов**

- e-mail: [legkobytov-danila@yandex.ru](mailto:legkobytov-danila@yandex.ru)
- LinkedIn: [in/danila-legkobytov](https://www.linkedin.com/in/danila-legkobytov/)
- Telegram: [@danila_legkobytov](https://t.me/danila_legkobytov)
- Frontend Mentor: [@danila_legkobytov](https://www.frontendmentor.io/profile/Bjorn86)
