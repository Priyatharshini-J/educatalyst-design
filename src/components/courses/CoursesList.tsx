
import React from 'react';
import { CourseCard, CourseType } from './CourseCard';

type CoursesListProps = {
  courses: CourseType[];
  showProgress?: boolean;
};

export const CoursesList = ({ courses, showProgress = false }: CoursesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} showProgress={showProgress} />
      ))}
      
      <style jsx global>{`
        .course-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        
        .progress-bar {
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-value {
          height: 100%;
          background-color: hsl(var(--primary));
          border-radius: 3px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
};
