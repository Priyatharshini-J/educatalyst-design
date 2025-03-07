
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";

export type QuizQuestionType = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizComponentProps = {
  questions: QuizQuestionType[];
  onComplete: (score: number) => void;
};

export const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<string, number>>({});
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleOptionSelect = (value: string) => {
    if (!isAnswerChecked) {
      setSelectedOption(parseInt(value, 10));
    }
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: selectedOption
    });
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    
    if (isLastQuestion) {
      onComplete(correctAnswers + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Time!</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardDescription>
        <Progress 
          value={((currentQuestionIndex) / questions.length) * 100} 
          className="h-2 mt-2"
        />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-xl font-medium">{currentQuestion.question}</div>
        
        <RadioGroup className="gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = currentQuestion.correctAnswer === index;
            
            let className = "quiz-option";
            if (isAnswerChecked) {
              if (isSelected && isCorrect) {
                className += " correct";
              } else if (isSelected && !isCorrect) {
                className += " incorrect";
              } else if (isCorrect) {
                className += " correct";
              }
            } else if (isSelected) {
              className += " selected";
            }
            
            return (
              <div 
                key={index}
                className={className}
                onClick={() => handleOptionSelect(index.toString())}
              >
                <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                  {isAnswerChecked && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  {!isAnswerChecked && isSelected && (
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex-1">{option}</div>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!isAnswerChecked ? (
          <Button 
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
        
        {isAnswerChecked && (
          <div className="flex items-center gap-2">
            {selectedOption === currentQuestion.correctAnswer ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-green-500">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-500">Incorrect</span>
              </>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
