
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseType } from '../courses/CourseCard';

type DashboardCourseCardProps = {
  course: CourseType & { 
    progress: number;
    lastAccessedLesson?: {
      id: string;
      title: string;
      sectionTitle: string;
    }
  };
};

export const DashboardCourseCard = ({ course }: DashboardCourseCardProps) => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (course.lastAccessedLesson) {
      navigate(`/courses/${course.id}/learn/${course.lastAccessedLesson.id}`);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-32 object-cover" 
        />
        <Badge 
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/70 text-white"
        >
          {course.progress}% complete
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">{course.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="progress-bar">
            <div 
              className="progress-value" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
          
          {course.lastAccessedLesson && (
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">Last accessed:</p>
              <p className="font-medium line-clamp-2">
                {course.lastAccessedLesson.sectionTitle}: {course.lastAccessedLesson.title}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleContinue}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Continue Learning
        </Button>
      </CardFooter>
    </Card>
  );
};
