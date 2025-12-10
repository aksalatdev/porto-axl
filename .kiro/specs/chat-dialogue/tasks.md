# Implementation Plan

- [x] 1. Create base ChatDialogue component structure



  - [x] 1.1 Create ChatDialogue component with TypeScript interfaces

    - Create `src/components/ui/chat-dialogue/index.tsx` with ChatDialogueProps and ConversationMessage interfaces
    - Set up basic container with className support
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Create MessageBubble sub-component

    - Create `src/components/ui/chat-dialogue/message-bubble.tsx`
    - Implement conditional styling for question (right-aligned, blue) vs answer (left-aligned, gray)
    - Add max-width constraint for readability
    - _Requirements: 1.1, 1.2, 3.2_
  - [ ]* 1.3 Write property tests for MessageBubble alignment
    - **Property 1: Question bubbles are right-aligned with user styling**
    - **Property 2: Answer bubbles are left-aligned with assistant styling**
    - **Validates: Requirements 1.1, 1.2**

- [x] 2. Implement message rendering and ordering


  - [x] 2.1 Implement message list rendering in ChatDialogue

    - Map through messages array and render MessageBubble for each
    - Ensure messages render in input array order
    - _Requirements: 1.3_
  - [ ]* 2.2 Write property test for message ordering
    - **Property 3: Messages maintain input order**
    - **Validates: Requirements 1.3**
  - [ ]* 2.3 Write property test for max-width constraint
    - **Property 4: Message bubbles have constrained max-width**
    - **Validates: Requirements 3.2**

- [x] 3. Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.



- [x] 4. Add animation system
  - [x] 4.1 Create TypingIndicator component
    - Create `src/components/ui/chat-dialogue/typing-indicator.tsx`
    - Implement animated dots using framer-motion
    - Add isVisible prop for conditional rendering
    - _Requirements: 2.3_
  - [x] 4.2 Implement sequential reveal animation
    - Add animation state management (currentIndex, isTyping, isComplete, hasStarted)
    - Use Intersection Observer to trigger animation on viewport entry
    - Implement timing logic for message reveals with typing indicator
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 4.3 Add slide-in animations to MessageBubble
    - Add framer-motion variants for slide-in from right (questions) and left (answers)
    - Connect animation to isVisible prop
    - _Requirements: 2.2, 2.4_

- [x] 5. Implement replay functionality


  - [x] 5.1 Create ReplayButton component

    - Create `src/components/ui/chat-dialogue/replay-button.tsx`
    - Style as subtle button that appears after animation completes
    - _Requirements: 4.1, 4.2_
  - [x] 5.2 Wire up replay functionality

    - Add onClick handler to reset animation state
    - Show ReplayButton when isComplete is true
    - _Requirements: 4.1, 4.2_
  - [ ]* 5.3 Write property test for replay button visibility
    - **Property 5: Replay button appears when animation completes**
    - **Validates: Requirements 4.1**

- [x] 6. Add responsive styling and accessibility


  - [x] 6.1 Implement responsive bubble widths


    - Add responsive classes for mobile vs desktop bubble sizing
    - Ensure text remains readable at all viewport sizes
    - _Requirements: 3.1, 3.2_

  - [ ] 6.2 Add keyboard navigation support
    - Add appropriate tabIndex to message content
    - Ensure focus states are visible
    - _Requirements: 3.3_

- [x] 7. Integrate with existing page



  - [x] 7.1 Update FAQ page to use ChatDialogue

    - Convert existing FAQ data to ConversationMessage format
    - Replace FaqAccordion with ChatDialogue component
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 7.2 Export component from barrel file
    - Create `src/components/ui/chat-dialogue/types.ts` for shared types
    - Create proper exports in index file
    - _Requirements: 1.1_

- [ ] 8. Final Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.
