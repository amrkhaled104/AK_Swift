# AK-Swift - Typing Speed Test

## Project Purpose
AK-Swift is a personal project born out of a desire to improve typing speed and accuracy. While learning to type faster, I decided to build a custom tool that aligns with my specific learning needs. This project serves as both a practical utility for training and a hands-on application of modern **React.js** development patterns, such as state management, hooks, and performance optimization.

## Core Features

### 1. Multi-Mode Typing Experience
The application offers two distinct ways to practice, catering to different training goals:
*   **Timed Mode (60s):** A high-pressure mode where the user races against a 60-second countdown to complete as much text as possible.
*   **Passage Mode (Count-up):** A focus-oriented mode with no time limit. The timer starts with the first keystroke and counts up, measuring exactly how long it takes to finish a specific text.

### 2. Difficulty Scaling
To ensure a progressive learning curve, the project utilizes a structured data model:
*   **Dynamic Content:** Passages are categorized into **Easy**, **Medium**, and **Hard** levels.
*   **Randomized Selection:** Uses a memoized selection logic to provide a fresh text from the local `data.json` every time a test is reset.

### 3. Real-time Analytics
Data-driven feedback is crucial for improvement:
*   **Live Stats:** Calculation of Words Per Minute (WPM) and Accuracy percentage happens in real-time as the user types.
*   **Visual Feedback:** An immediate color-coded system highlights correct characters in green and errors in red, allowing for instant correction.

### 4. Persistence
*   **High Score Tracking:** Personal bests are stored using `localStorage`, allowing users to track their progress across different browser sessions.

## Technical Implementation

*   **React Hooks:** Extensive use of `useState`, `useEffect`, and `useMemo` to handle timers and prevent unnecessary re-renders.
*   **Decoupled Components:** Logic is separated between the Timer, Text Display, and Control components for better maintainability.
*   **Ref Management:** Using `useRef` for seamless input focusing and interaction.

## Future Roadmap
The project is continuously evolving. Planned features include:
*   **Targeted Practice:** An analytical engine that identifies specific keys or character combinations where the user struggles most.
*   **Custom Drills:** Automatically generated exercises based on the user's weakest letters.
*   **Advanced Statistics:** Detailed graphs showing speed fluctuations throughout a single test.

## How to Run
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.
