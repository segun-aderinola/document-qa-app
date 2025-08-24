# Document Q&A Suite

A modern, responsive React application that allows users to upload documents and ask intelligent questions about them. Built with TypeScript, Tailwind CSS, and a beautiful design system featuring gradient icons and smooth animations.

## ✨ Features

### Core Functionality
- **Smart Document Upload**: Drag-and-drop or click to upload PDF, DOC, DOCX, TXT, and MD files
- **Simulated Upload Progress**: Realistic progress bars with occasional failure simulation (5% chance)
- **Per-Document Q&A**: Ask questions about specific documents and receive detailed, markdown-formatted answers
- **Global Search**: Search across all questions and answers with real-time debounced results
- **Data Persistence**: All data persists in localStorage across browser sessions
- **JSON Export**: Export Q&A history for any document

### UX & Design
- **Responsive Dashboard**: Clean sidebar + main content layout that adapts to all screen sizes
- **Dark/Light/System Theme**: Toggle between themes with persistent preference
- **UI Scale Control**: Zoom interface between 80%-100% (default 90%)
- **Gradient Design System**: Beautiful brand gradient (#6A11CB → #2575FC) applied to icons and buttons
- **Smooth Animations**: Framer Motion micro-interactions throughout
- **Keyboard Shortcuts**: Power user shortcuts for all major actions

### Technical Excellence
- **TypeScript**: Fully typed with strict mode enabled
- **Modern React Patterns**: Hooks, Context API, Error Boundaries
- **Performance**: Debounced search, optimized re-renders, efficient state management
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Error Handling**: Graceful error boundaries with recovery options

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo-url>
   cd doc-qa-suite-cra
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design System

### Colors
- **Background Colors**: 
  - Light: `#FFFFFF`, `#F9FAFB`, `#F3F4F6`
  - Dark: `#030508`, `#111827`, `#080C13`
- **Brand Gradient**: `linear-gradient(270deg, #6A11CB 0%, #2575FC 100%)`
- **Text**: Dynamic based on theme with proper contrast ratios

### Typography
- **Font Family**: Montserrat (Google Fonts)
- **Sizes**: Responsive scaling from mobile to desktop
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Buttons**: Gradient backgrounds with hover/active states
- **Cards**: Subtle shadows with rounded corners
- **Icons**: Lucide React icons with gradient treatments
- **Animations**: Spring-based transitions via Framer Motion

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|---------|
| `/` | Focus search bar |
| `N` | Focus question input (when viewing document) |
| `D` | Toggle theme (Light → Dark → System) |
| `Shift + ?` | Show shortcuts modal |
| `Esc` | Clear search or close modals |
| `Cmd/Ctrl + Enter` | Submit question (when typing) |

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Dropzone.tsx
│   │   ├── GradientIcon.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── docs/            # Document-specific components
│   │   ├── DocCard.tsx
│   │   ├── DocView.tsx
│   │   ├── QAForm.tsx
│   │   └── ...
│   ├── layout/          # Layout components
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/              # shadcn UI components
├── context/
│   └── AppContext.tsx   # Global state management
├── hooks/               # Custom React hooks
├── mocks/               # Mock data generators
├── routes/              # Page components
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## 🧪 Testing

The project includes comprehensive tests using Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode during development
npm test -- --watch
```

### Test Coverage
- **Unit Tests**: Custom hooks (upload simulation, Q&A, debounced search)
- **Integration Tests**: Component interactions and user workflows
- **Error Boundary Tests**: Error handling and recovery

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |

## 🌟 Advanced Features

### Mock Answer Generation
The app generates intelligent mock answers based on question analysis:
- Extracts keywords from questions
- Uses different response templates based on question type (how, what, why)
- Returns properly formatted Markdown with headers, lists, and sections
- Simulates realistic API response times (800-1500ms)

### Upload Simulation
Realistic file upload simulation includes:
- Progressive percentage updates with natural jitter
- Random speed variations to simulate network conditions
- 5% chance of failure for testing error handling
- File metadata extraction and storage

### Search Implementation
Advanced search features:
- **Debounced input** (300ms) to prevent excessive filtering
- **Case-insensitive matching** across questions and answers
- **Result highlighting** with matched terms emphasized
- **Grouped results** by document for better organization

## 🚀 Deployment

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### Manual Deployment
The `build/` folder contains all static files ready for deployment to any web server.

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_OPENAI_API_KEY` | OpenAI API key for live responses (optional) | Not set |

*Note: When the API key is not provided, the app falls back to mock responses.*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode requirements
- Maintain test coverage above 80%
- Use conventional commits for clear history
- Ensure all linting passes before committing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Lucide** for the icon system
- **React Router** for navigation
- **Tailwind CSS** for styling system

---

**Built with ❤️ using Create React App, TypeScript, and modern React patterns.**