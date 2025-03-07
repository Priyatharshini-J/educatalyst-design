
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export type InstructorType = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  courses: number;
  students: number;
  rating: number;
  specialties: string[];
};

type InstructorCardProps = {
  instructor: InstructorType;
};

export const InstructorCard = ({ instructor }: InstructorCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={instructor.avatar} alt={instructor.name} />
          <AvatarFallback>{instructor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{instructor.name}</CardTitle>
          <CardDescription>{instructor.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {instructor.bio}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {instructor.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="font-normal">
              {specialty}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="font-semibold">{instructor.courses}</p>
            <p className="text-muted-foreground">Courses</p>
          </div>
          <div>
            <p className="font-semibold">{instructor.students.toLocaleString()}</p>
            <p className="text-muted-foreground">Students</p>
          </div>
          <div>
            <p className="font-semibold">{instructor.rating.toFixed(1)}</p>
            <p className="text-muted-foreground">Rating</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/instructors/${instructor.id}`)}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
