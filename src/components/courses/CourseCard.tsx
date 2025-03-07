
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export type CourseType = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  discount?: number;
  rating: number;
  ratingCount: number;
  students: number;
  duration: string;
  image: string;
  progress?: number;
};

type CourseCardProps = {
  course: CourseType;
  showProgress?: boolean;
};

export const CourseCard = ({ course, showProgress = false }: CourseCardProps) => {
  const navigate = useNavigate();
  
  const discountedPrice = course.discount 
    ? course.price - (course.price * course.discount) 
    : null;
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="course-card-image" 
        />
        <Badge 
          className={`absolute top-3 right-3 ${getLevelColor(course.level)}`}
        >
          {course.level}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {course.category}
          </Badge>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 stroke-amber-500 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({course.ratingCount})</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        <CardDescription className="text-sm">
          By {course.instructor}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 opacity-70" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 opacity-70" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>
        
        {showProgress && course.progress !== undefined && (
          <div className="mb-2">
            <div className="flex justify-between mb-1 text-xs">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-value" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center gap-2">
          {discountedPrice ? (
            <>
              <span className="font-bold text-primary">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm line-through text-muted-foreground">${course.price.toFixed(2)}</span>
              <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30">
                {Math.round(course.discount * 100)}% OFF
              </Badge>
            </>
          ) : (
            <span className="font-bold">${course.price.toFixed(2)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
