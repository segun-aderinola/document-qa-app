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