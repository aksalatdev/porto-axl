export interface ConversationMessage {
  id: string | number;
  type: 'question' | 'answer';
  content: string;
  icon?: React.ReactNode;
}

export interface ChatDialogueProps {
  messages: ConversationMessage[];
  className?: string;
  autoPlay?: boolean;
  typingDelay?: number;
  typingDuration?: number;
}

export interface MessageBubbleProps {
  type: 'question' | 'answer';
  content: string;
  isVisible: boolean;
  animationDelay?: number;
}

export interface TypingIndicatorProps {
  isVisible: boolean;
  position?: 'left' | 'right';
}

export interface ReplayButtonProps {
  onClick: () => void;
  isVisible: boolean;
}
