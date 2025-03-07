
import React from 'react';
import { 
  Award, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Calendar
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

type StudentStatsProps = {
  coursesCompleted: number;
  coursesInProgress: number;
  totalCourses: number;
  averageProgress: number;
};

export const StudentStats = ({ coursesCompleted, coursesInProgress, totalCourses, averageProgress }: StudentStatsProps) => {
  // For example purposes, let's simulate hours learned and quizzes taken
  const hoursLearned = Math.round(coursesCompleted * 10 + coursesInProgress * 5);
  const quizzesTaken = Math.round(coursesCompleted * 3 + coursesInProgress * 1);
  const streak = Math.floor(Math.random() * 10) + 1; // Random streak between 1-10 days
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Enrolled Courses</CardDescription>
          <CardTitle className="text-2xl">{totalCourses}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <BookOpen className="h-8 w-8 text-primary opacity-80" />
            <span className="text-xs text-muted-foreground">Total courses</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Completed</CardDescription>
          <CardTitle className="text-2xl">{coursesCompleted}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <GraduationCap className="h-8 w-8 text-green-500 opacity-80" />
            <span className="text-xs text-muted-foreground">Finished courses</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Hours Learned</CardDescription>
          <CardTitle className="text-2xl">{hoursLearned}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Clock className="h-8 w-8 text-blue-500 opacity-80" />
            <span className="text-xs text-muted-foreground">Total hours</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Quizzes Taken</CardDescription>
          <CardTitle className="text-2xl">{quizzesTaken}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Award className="h-8 w-8 text-amber-500 opacity-80" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Day Streak</CardDescription>
          <CardTitle className="text-2xl">{streak}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Calendar className="h-8 w-8 text-red-500 opacity-80" />
            <span className="text-xs text-muted-foreground">Keep it up!</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
