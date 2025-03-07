
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
  stats: {
    coursesEnrolled: number;
    coursesCompleted: number;
    hoursLearned: number;
    quizzesTaken: number;
    streak: number;
  };
};

export const StudentStats = ({ stats }: StudentStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Enrolled Courses</CardDescription>
          <CardTitle className="text-2xl">{stats.coursesEnrolled}</CardTitle>
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
          <CardTitle className="text-2xl">{stats.coursesCompleted}</CardTitle>
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
          <CardTitle className="text-2xl">{stats.hoursLearned}</CardTitle>
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
          <CardTitle className="text-2xl">{stats.quizzesTaken}</CardTitle>
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
          <CardTitle className="text-2xl">{stats.streak}</CardTitle>
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
