import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export type QuizQuestionType = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizComponentProps = {
  courseId: string;
  questions?: QuizQuestionType[];
  onComplete?: (score: number) => void;
};

export const QuizComponent = ({
  courseId,
  questions,
  onComplete,
}: QuizComponentProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    // Check if this quiz was already completed (in a real app, this would be from the server)
    const quizStatus = localStorage.getItem(`quiz_${courseId}_completed`);
    if (quizStatus === "true") {
      setQuizCompleted(true);
    }
  }, [courseId]);

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
      [currentQuestion.id]: selectedOption,
    });

    if (Number(selectedOption) === Number(currentQuestion.correctAnswer)) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);

    if (isLastQuestion) {
      const finalScore =
        correctAnswers +
        (Number(selectedOption) === Number(currentQuestion.correctAnswer)
          ? 1
          : 0);
      const scorePercentage = Math.round((finalScore / questions.length) * 100);

      // Store quiz completion status
      localStorage.setItem(`quiz_${courseId}_completed`, "true");
      localStorage.setItem(
        `quiz_${courseId}_score`,
        scorePercentage.toString()
      );

      setQuizCompleted(true);

      toast({
        title: "Quiz Completed!",
        description: `You scored ${scorePercentage}% (${finalScore}/${questions.length} correct)`,
      });

      if (onComplete) {
        onComplete(finalScore);
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (quizCompleted) {
    const savedScore = localStorage.getItem(`quiz_${courseId}_score`) || "0";
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Completed</CardTitle>
          <CardDescription>You've already completed this quiz</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="text-4xl font-bold mb-2">{savedScore}%</div>
          <p className="text-muted-foreground">Your score</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem(`quiz_${courseId}_completed`);
              localStorage.removeItem(`quiz_${courseId}_score`);
              setQuizCompleted(false);
              setCurrentQuestionIndex(0);
              setCorrectAnswers(0);
              setUserAnswers({});
            }}
          >
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Time!</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardDescription>
        <Progress
          value={(currentQuestionIndex / questions.length) * 100}
          className="h-2 mt-2"
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-xl font-medium">{currentQuestion.question}</div>

        <RadioGroup className="gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = Number(selectedOption) === Number(index);
            const isCorrect =
              Number(currentQuestion.correctAnswer) === Number(index);

            let className =
              "flex items-center border rounded-lg p-3 cursor-pointer";
            if (isAnswerChecked) {
              if (isSelected && isCorrect) {
                className += " bg-green-50 border-green-200";
              } else if (isSelected && !isCorrect) {
                className += " bg-red-50 border-red-200";
              } else if (isCorrect) {
                className += " bg-green-50 border-green-200";
              }
            } else if (isSelected) {
              className += " border-primary bg-primary/5";
            } else {
              className += " hover:border-muted-foreground/20";
            }

            return (
              <div
                key={index}
                className={className}
                onClick={() => handleOptionSelect(index.toString())}
              >
                <div className="h-5 w-5 rounded-full border mr-3 flex items-center justify-center flex-shrink-0">
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
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </Button>
        )}

        {isAnswerChecked && (
          <div className="flex items-center gap-2">
            {Number(selectedOption) ===
            Number(currentQuestion.correctAnswer) ? (
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
