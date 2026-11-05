# [Fallout Minesweeper](https://fallout-minesweeper.netlify.app/)

A Minesweeper game with a visual style inspired by Fallout.

## Features

- Choose an easy, medium, or hard field.
- Set a custom number of mines within the limits for the selected difficulty.
- The first opened cell is always safe.
- Resume saved game progress in the same browser.
- View the top three local records for each difficulty.

## Controls

- Left-click a cell to open it.
- Right-click a closed cell to mark it with a question mark; right-click again to remove it.

## Tech stack

- React and TypeScript, built with Vite
- Redux Toolkit, React Redux, and Redux Persist
- React Router
- styled-components
- React Hook Form
- Font Awesome

## Development tools

- ESLint and Stylelint
- Prettier
- Husky and lint-staged

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/SavitskayaKseniya22/minesweeper.git
```

2. Go to the project directory:

```bash
cd minesweeper
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Useful commands

```bash
npm run build        # Type-check and create a production build
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint and Stylelint
npm run format       # Format files and order CSS properties
npm run format:check # Check Prettier formatting and CSS property order
```

The game progress and records are stored locally in the browser. A shared leaderboard is not implemented yet.

## Screenshots

![Main menu](https://github.com/SavitskayaKseniya22/minesweeper/assets/77901301/89a4f244-c45d-4135-85b4-5ea481c11673)
![Game board](https://github.com/SavitskayaKseniya22/minesweeper/assets/77901301/a2793c08-082e-49fd-8a5e-0e41faae51aa)
