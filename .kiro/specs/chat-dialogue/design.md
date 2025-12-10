# Design Document: Chat Dialogue

## Overview

The Chat Dialogue feature transforms the existing FAQ accordion into an iPhone Messages-style conversation interface. This creates a more engaging and natural way to present Q&A content on the portfolio website, replacing the traditional expand/collapse pattern with a flowing chat conversation that reveals messages sequentially with typing animations.

## Architecture

The feature follows a component-based architecture using React with Next.js:

```
┌─────────────────────────────────────────┐
│           ChatDialogue                   │
│  (Main container, animation orchestrator)│
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │      MessageBubble              │    │
│  │  (Question - right aligned)     │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │      TypingIndicator            │    │
│  │  (Animated dots)                │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │      MessageBubble              │    │
│  │  (Answer - left aligned)        │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │      ReplayButton               │    │
│  │  (Reset animation trigger)      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### ChatDialogue (Main Component)

```typescript
interface ChatDialogueProps {
  messages: ConversationMessage[];
  className?: string;
  autoPlay?: boolean;
  typingDelay?: number; // ms between messages, default 800
  typingDuration?: number; // ms for typing indicator, default 1000
}

interface ConversationMessage {
  id: string | number;
  type: 'question' | 'answer';
  content: string;
  icon?: React.ReactNode;
}
```

### MessageBubble (Sub-component)

```typescript
interface MessageBubbleProps {
  type: 'question' | 'answer';
  content: string;
  isVisible: boolean;
  animationDelay?: number;
}
```

### TypingIndicator (Sub-component)

```typescript
interface TypingIndicatorProps {
  isVisible: boolean;
}
```

### ReplayButton (Sub-component)

```typescript
interface ReplayButtonProps {
  onClick: () => void;
  isVisible: boolean;
}
```

## Data Models

### Message Data Structure

The component accepts an array of messages that alternate between questions and answers:

```typescript
const conversationData: ConversationMessage[] = [
  { id: 1, type: 'question', content: 'Who are you?' },
  { id: 2, type: 'answer', content: 'I am a software engineer...' },
  { id: 3, type: 'question', content: 'What do you do?' },
  { id: 4, type: 'answer', content: 'I build web applications...' },
];
```

### Animation State

```typescript
interface AnimationState {
  currentIndex: number; // Which message is currently being revealed
  isTyping: boolean; // Whether typing indicator is showing
  isComplete: boolean; // Whether all messages have been revealed
  hasStarted: boolean; // Whether animation has been triggered
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Question bubbles are right-aligned with user styling
*For any* question message in the conversation data, when rendered, the MessageBubble SHALL have right-alignment CSS classes (justify-end, ml-auto) and user-style colors (e.g., blue background).
**Validates: Requirements 1.1**

### Property 2: Answer bubbles are left-aligned with assistant styling
*For any* answer message in the conversation data, when rendered, the MessageBubble SHALL have left-alignment CSS classes (justify-start, mr-auto) and assistant-style colors (e.g., gray background).
**Validates: Requirements 1.2**

### Property 3: Messages maintain input order
*For any* array of ConversationMessage objects passed to ChatDialogue, the rendered messages SHALL appear in the same order as the input array.
**Validates: Requirements 1.3**

### Property 4: Message bubbles have constrained max-width
*For any* rendered MessageBubble, the element SHALL have a max-width constraint (e.g., max-w-[80%] or max-w-xs) to ensure readable line lengths.
**Validates: Requirements 3.2**

### Property 5: Replay button appears when animation completes
*For any* ChatDialogue where isComplete state is true, the ReplayButton component SHALL be rendered and visible.
**Validates: Requirements 4.1**

## Error Handling

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Empty messages array | Display placeholder text or hide component |
| Invalid message type | Default to 'answer' styling, log warning |
| Animation interrupted | Allow graceful completion or skip to end |
| Intersection Observer not supported | Fall back to immediate display (no animation) |

## Testing Strategy

### Unit Tests
- Test MessageBubble renders correct alignment based on type prop
- Test TypingIndicator animation states
- Test ReplayButton click handler triggers callback
- Test ChatDialogue renders correct number of messages

### Property-Based Tests

Using fast-check library for property-based testing:

1. **Property 1 & 2 Test**: Generate random arrays of messages, verify each message type renders with correct alignment classes
2. **Property 3 Test**: Generate random message arrays, verify DOM order matches input order
3. **Property 4 Test**: Generate messages with varying content lengths, verify max-width is always applied
4. **Property 5 Test**: Generate various animation states, verify replay button visibility matches isComplete state

Each property-based test will run minimum 100 iterations to ensure coverage across input space.

Test files will use the format:
```
// **Feature: chat-dialogue, Property {number}: {property_text}**
```
