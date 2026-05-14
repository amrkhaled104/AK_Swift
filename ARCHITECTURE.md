# Architecture Guide - AK-Swift Typing App

## Component Hierarchy

```
App (State Management)
├── Header (Container)
│   ├── Navbar (Component)
│   │   ├── Logo (Component)
│   │   └── ScoreStats (Component)
├── TestStats (Container)
│   ├── Score (Component)
│   ├── Accuracy (Component)
│   ├── Time (Component)
│   ├── Difficulty (Component)
│   └── Mode (Component)
└── TestArea (Container)
    ├── Text (Component)
    └── Reload (Component)
```

## State Flow

### App-Level State (Lifted)

```
App.jsx manages:
├── Test Configuration
│   ├── activeDiff (Easy/Medium/Hard)
│   └── activeMode (Timed/Passage)
├── Test Execution
│   ├── isStarted
│   └── isFinished
├── Typing Metrics
│   ├── userInput
│   ├── totalTyped
│   └── totalErrors
├── Timing
│   └── time
└── Scoring
    └── newRecord (Personal Best)
```

### Prop Drilling Reduction

- **Before**: Props passed through 3+ component levels
- **After**: Props passed directly to containers, which compose their children

## Component Responsibilities

### Presentational Components (components/)

- **Render UI based on props**
- **No side effects**
- **Pure function components**

Examples:

- `Score.jsx` - Displays WPM
- `Accuracy.jsx` - Displays accuracy %
- `Logo.jsx` - Displays logo and title

### Container Components (containers/)

- **Manage prop distribution**
- **Compose related presentational components**
- **Handle local UI state (if needed)**

Examples:

- `Header.jsx` - Composes Navbar, Logo, ScoreStats
- `TestStats.jsx` - Composes Score, Accuracy, Time, Difficulty, Mode
- `TestArea.jsx` - Composes Text, Reload

### App Component (App.jsx)

- **Top-level state management**
- **Personal best tracking**
- **Orchestrates containers**

## CSS Architecture

### CSS File Organization

```
Component/Container → Has dedicated CSS file
Each CSS file contains only relevant styles

Score.jsx → Score.css
  Styles: .score, .value-wpm, etc.

Header.jsx → Header.css
  Styles: .header, etc.
```

### CSS Variables (in index.css)

All color/spacing variables in `:root`:

```css
--neutral-900: hsl(0, 0%, 7%);
--blue-400: hsl(210, 100%, 65%);
--red-500: hsl(354, 63%, 57%);
--yellow-400: hsl(49, 85%, 70%);
```

## Adding New Features

### Example: Add a Statistics Panel

1. **Create Component** (if UI only):

   ```
   components/StatsPanel.jsx
   components/StatsPanel.css
   ```

2. **Create Container** (if composing multiple components):

   ```
   containers/StatsPanel.jsx
   containers/StatsPanel.css
   ```

3. **Add State to App.jsx** (if needs coordination):

   ```javascript
   const [stats, setStats] = useState({...});
   ```

4. **Import in App.jsx**:

   ```javascript
   import StatsPanel from "./containers/StatsPanel";
   ```

5. **Add to JSX**:
   ```javascript
   <StatsPanel stats={stats} />
   ```

## Data Flow

### User Types Text

```
Text.jsx input → setUserInput() → App state updates
     ↓
Accuracy & Score recalculate → components re-render
     ↓
Score displays new WPM, Accuracy displays new %
```

### Timer Ticks

```
Time.jsx useEffect → setTime() every 1 second
     ↓
App state updates with new time
     ↓
Time component re-renders with new value
     ↓
Score recalculates WPM based on new time
```

### Test Completion

```
Time reaches 0 (Timed mode) OR Text completed (Passage mode)
     ↓
setIsFinished(true) called
     ↓
Timer stops, input disabled
     ↓
Personal best comparison
     ↓
localStorage updated if new record
```

## Best Practices

1. **Keep components small** - If a component > 100 lines, consider splitting
2. **Use containers** - Compose multiple related components in containers
3. **Styles in CSS files** - Don't use inline styles except for dynamic values
4. **One component per file** - Makes finding code easier
5. **Meaningful component names** - Should clearly indicate purpose

## Performance Optimization

### Current Optimizations

- useEffect dependencies are carefully tuned
- No unnecessary re-renders
- CSS modules prevent style conflicts

### Future Optimizations

- Consider `useMemo` for complex calculations if performance issues appear
- Consider `useCallback` for event handlers if child components bloat
- Code-split containers for lazy loading

## Testing Strategy

### Unit Tests

Test individual components in isolation:

```
Score.jsx - Test WPM calculation
Accuracy.jsx - Test accuracy calculation
Time.jsx - Test timer countdown
```

### Integration Tests

Test containers with their child components:

```
TestStats.jsx - Test interaction between Score, Accuracy, Time
TestArea.jsx - Test Text input and Reload button
```

### E2E Tests

Test complete user flows:

- Select difficulty → Select mode → Start test → Complete test
- Verify WPM, Accuracy, Personal Best updating

## Troubleshooting

### Issue: States not updating

- Check useEffect dependencies
- Verify state setters are being called
- Check React DevTools for state changes

### Issue: Styles not applying

- Verify CSS file is imported in component
- Check CSS class names match
- Use DevTools to inspect computed styles

### Issue: Prop drilling still visible

- Check if props can be grouped into containers
- Consider moving state to a custom hook

---

**Last Updated**: May 14, 2026
**Maintained By**: Development Team
