# Contributing to Evox Ventures

Thank you for investing your time in contributing to Evox Ventures! The following is a set of guidelines for contributing to this repository.

## 🚀 How to Contribute

### 1. Fork & Clone
Start by forking the repository to your own GitHub account. Clone it locally:
```bash
git clone https://github.com/YOUR_USERNAME/evox-ventures.git
```

### 2. Branch Naming Conventions
Create a dedicated branch representing your feature or fix. Use clear prefixes:
- `feat/premium-navbar` for new features
- `fix/scroll-lag` for bug fixes
- `refactor/button-styles` for codebase improvements

### 3. Coding Standards
This project follows a high-end luxury visual standard. When contributing UI/UX additions:
- **Animations:** All transitions strictly use `framer-motion` for physics-based fluidity. Make sure animations do not cause layout jumping.
- **Styling:** Adhere strictly to TailwindCSS variables defined natively (`client/tailwind.config.js`). Avoid custom inline styles unless completely necessary for hardware-accelerated animations.
- **Components:** Favor modularization. If a button configuration exceeds 15 lines, export it out as an independent function.

### 4. Create a Pull Request (PR)
When your branch is ready:
1. Push to your forked repository.
2. Open a Pull Request targeting the `main` branch of this repository.
3. Provide a detailed summary and video/screenshot recordings of the visual updates.

## 🐛 Report a Bug
If you spot an issue, please open an Issue on GitHub detailing exactly how to reconstruct the bug, alongside the respective browser environments.

Let's engineer the unforgettable, together.
