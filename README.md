
# Smart Stream TV

A responsive Smart Stream TV web application built with **Vanilla JavaScript (ES6 modules)** and **Tailwind CSS**. Users can browse a channel catalogue, select channels to update the preview, search channels instantly, manage favorites, and add or delete channels through API integration.

🔗 **Live demo:** [https://smart-stream-tv-azure.vercel.app/](https://smart-stream-tv-azure.vercel.app/)\
📦 **Repository:** [https://github.com/jamal7-codes/smart-stream-tv](https://github.com/jamal7-codes/smart-stream-tv)

---

## Features

### Channel Catalogue

- **Responsive layout** (mobile-first): channel list on the left and preview on the right on desktop, stacked on mobile.
- **Dynamic channel list** generated from API data.
- **Channel details** displayed in each row: channel number, logo, and name.
- **Interactive selection:** clicking a channel highlights it and updates the preview image and title.

### Search

- **Live search** by channel name or channel number.
- Case-insensitive filtering without page reload.
- Empty state message when no channel matches the search.

### API Integration (V2)

- **MockAPI integration** to manage channel data remotely.
- **GET:** Fetch channels from the API.
- **POST:** Add new channels.
- **DELETE:** Remove channels from the catalogue.
- API requests separated into a dedicated `api.js` module.

### Favorites & LocalStorage (V2)

- Add or remove channels from favorites.
- Display favorite channels.
- Save favorite channels in LocalStorage.
- Restore favorites after refreshing the page.

---

## Tech Stack

| Technology        | Usage                                                   |
| ----------------- | ------------------------------------------------------- |
| HTML5             | Semantic page structure                                 |
| Tailwind CSS      | Utility-first, mobile-first, responsive styling         |
| JavaScript (ES6+) | Application logic and DOM manipulation                  |
| ES6 Modules       | Separate responsibilities using `import` / `export`     |
| Fetch API         | Communicate with MockAPI                                |
| MockAPI           | Remote channel data management                          |
| LocalStorage      | Persist favorite channels                               |
| Git / GitHub      | Version control with feature branches and Pull Requests |
| Vercel            | Application deployment                                  |

---

## Project Structure

```
smart-stream-tv/
│
├── index.html
│
├── data/
│   └── data.js
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── ui.js
│   ├── search.js
│   └── favorites.js
│
└── README.md
```

---

## How It Works

1. `data/data.js` contains the initial channel data (if used as a fallback).
2. `js/api.js` handles communication with MockAPI:
   - `getChannels()` retrieves channels.
   - `addChannel()` creates a new channel.
   - `deleteChannel()` removes a channel.
3. `js/app.js` initializes the application and coordinates the different modules.
4. `js/ui.js` renders channel rows, handles channel selection, and updates the preview.
5. `js/search.js` handles live search and filters channels.
6. `js/favorites.js` manages favorite channels and stores them in LocalStorage.

---

## Git Workflow

```
main
  └── develop
        ├── feature/ui-layout
        ├── feature/channel-data
        ├── feature/channel-preview
        ├── feature/channel-search
        ├── feature/api-integration
        ├── feature/channel-crud
        └── feature/favorites
```

- Each feature is developed on its own branch.
- Features are merged into `develop` through Pull Requests.
- After final validation, `develop` is merged into `main`.
- Commit messages follow a simple convention: `feat:`, `fix:`, `docs:`.

---

## What I Learned

- Structuring applications with ES6 modules.
- Working with arrays of objects and array methods: `forEach`, `map`, `filter`, `find`, and `some`.
- Creating and updating the DOM with `createElement`, `appendChild`, and `classList`.
- Handling events: `click`, `input`, and form submission.
- Working with Fetch API and HTTP methods (GET, POST, DELETE).
- Managing asynchronous operations with Promises and `async/await`.
- Persisting application data using LocalStorage.
- Implementing CRUD operations with an external API.
- Building responsive interfaces with Tailwind CSS.
- Using Git branches, Pull Requests, and Vercel deployment.

---

## Possible Improvements

- Filter channels by category.
- Edit existing channels (PUT/PATCH).
- Keyboard navigation in the channel list.
- Add loading indicators and API error messages.
- Improve favorite channel management.

 
 

GitHub: [@jamal7-codes](https://github.com/jamal7-codes)
 
