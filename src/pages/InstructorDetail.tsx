/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CoursesList } from "@/components/courses/CoursesList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseType } from "@/components/courses/CourseCard";
import LoadingSpinner from "@/components/ui/loading-spinner";

const InstructorDetail = () => {
  const { instructorId } = useParams<{ instructorId: string }>();
  const [instructors, setInstructors] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("Instructors");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        const processedInstructors = response.content.map(
          (instructor: any) => ({
            ...instructor,
            specialties: JSON.parse(instructor.specialties), // <- key line
          })
        );
        setInstructors(processedInstructors);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  // Find the instructor by ID
  const instructor = instructors.find((i) => i.id === instructorId);
  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("Courses");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        setPopularCourses(response.content);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  const instructorCourses: CourseType[] = popularCourses
    .slice(0, 3)
    .map((course) => ({
      ...course,
      instructor: instructor?.name || course.instructor,
    }));

  if (!instructor) {
    return (
      <>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                  Instructor Not Found
                </h1>
                <p className="text-muted-foreground mb-6">
                  The instructor you're looking for doesn't exist or has been
                  removed.
                </p>
                <Button onClick={() => navigate("/instructors")}>
                  Back to Instructors
                </Button>
              </div>
            </main>
            <Footer />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Instructor Profile Header */}
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback>
                  {instructor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {instructor.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {instructor.title}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-6 text-sm mb-4">
                  <div>
                    <span className="font-semibold">{instructor.courses}</span>{" "}
                    courses
                  </div>
                  <div>
                    <span className="font-semibold">
                      {instructor.students.toLocaleString()}
                    </span>{" "}
                    students
                  </div>
                  <div>
                    <span className="font-semibold">
                      {instructor.rating.toFixed(1)}
                    </span>{" "}
                    rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="about">
            <TabsList className="mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {instructor.bio}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Teaching Experience
                </h2>
                <p className="text-muted-foreground">
                  With {instructor.courses} published courses and over{" "}
                  {instructor.students.toLocaleString()} students,
                  {instructor.name} is one of our most experienced instructors.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <h2 className="text-2xl font-semibold mb-6">
                Courses by {instructor.name}
              </h2>
              <CoursesList courses={instructorCourses} />
            </TabsContent>

            <TabsContent value="reviews">
              <h2 className="text-2xl font-semibold mb-6">Student Reviews</h2>
              <p className="text-muted-foreground">
                Coming soon - student reviews for {instructor.name}.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorDetail;
