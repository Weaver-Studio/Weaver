import { Button } from "@weaver/ui/components/ui/button";

interface WelcomeMessageProps {
  onPromptClick: (prompt: string) => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onPromptClick }) => {
  const prompts = [
    "What is the weather like today?",
    "Tell me a joke.",
    "Summarize the latest news.",
    "Help me write an email.",
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="mb-4 font-bold text-2xl">Hello there!</h1>
      <p className="mb-8 text-muted-foreground">How can I help you today?</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <Button
            className="h-auto whitespace-normal p-4 text-left"
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            variant="outline"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
