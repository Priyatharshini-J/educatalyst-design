import React from "react";
import { CourseCard, CourseType } from "./CourseCard";

type CoursesListProps = {
  courses: CourseType[];
};

export const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />
    </div>
  );
};
