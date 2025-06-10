/* eslint-disable @typescript-eslint/no-explicit-any */ // remove unwanted code, progress and submit
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseCurriculum } from "@/components/courses/CourseCurriculum";
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Clock,
  User,
  BookOpen,
  Calendar,
  BarChart,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [allCourses, setallCourses] = useState([]);
  const [courseCurriculum, setCourseCurriculum] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFetching, setIsFetching] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(0);

  const catalyst = (window as any).catalyst;
  const datastore = catalyst.table;
  const table = datastore.tableId("EnrolledCourses");

  const curriculumTabRef = useRef<HTMLButtonElement>(null);

  const handleContinueLearning = () => {
    curriculumTabRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setActiveTab("curriculum");
    }, 500);
  };

  useEffect(() => {
    const datastore = catalyst.table;
    const table = datastore.tableId("Courses");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        const data = response.content;
        setallCourses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const zcql = catalyst.ZCatalystQL;
    const query =
      "SELECT CourseCurriculum.title, CourseCurriculum.id, CourseCurriculum.duration, Lessons.id, Lessons.title, Lessons.duration, Lessons.isCompleted, Lessons.type FROM CourseCurriculum JOIN Lessons ON CourseCurriculum.ROWID = Lessons.course_id";
    const zcqlPromise = zcql.executeQuery(query);
    zcqlPromise
      .then((response) => {
        const inputData = response.content;
        const grouped = {};

        inputData.forEach(({ CourseCurriculum, Lessons }) => {
          const { id, title, duration } = CourseCurriculum;

          if (!grouped[id]) {
            grouped[id] = {
              id: Number(id),
              title,
              duration,
              lessons: [],
            };
          }

          grouped[id].lessons.push({
            id: Number(Lessons.id),
            title: Lessons.title,
            duration: Lessons.duration,
            isCompleted: Lessons.isCompleted,
            type: Lessons.type,
          });
        });

        const transformed = Object.values(grouped);
        setCourseCurriculum(transformed);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("QuizQuestions");

    table
      .getPagedRows()
      .then((response) => {
        const modifiedQuestions = response.content.map((question: any) => ({
          ...question,
          options: JSON.parse(`[${question.options}]`),
        }));
        setQuestions(modifiedQuestions);
      })
      .catch((err) => {
        console.error("Error fetching quiz questions:", err);
      });
  }, []);

  const course = allCourses.find((c) => c.id === courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const userManagement = catalyst.userManagement;

    userManagement
      .getCurrentProjectUser()
      .then((response) => {
        const currentUserId = response.content.user_id;
        setUserId(currentUserId);

        const zcql = catalyst.ZCatalystQL;
        const query = `SELECT * FROM EnrolledCourses WHERE EnrolledCourses.user_id = '${currentUserId}' AND EnrolledCourses.course_id = '${courseId}'`;
        return zcql.executeQuery(query);
      })
      .then((response) => {
        if (response.content.length > 0) {
          setIsEnrolled(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!course) {
    return (
      <>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
                <p className="text-muted-foreground mb-6">
                  The course you are looking for does not exist or has been
                  removed.
                </p>
                <Button onClick={() => navigate("/courses")}>
                  Browse Courses
                </Button>
              </div>
            </main>
            <Footer />
          </div>
        )}
      </>
    );
  }

  const handleEnroll = () => {
    const details = [{ user_id: userId, course_id: courseId }];
    const insertPromise = table.addRow(details);
    insertPromise
      .then(() => {
        setIsEnrolled(true);
        toast({
          title: "Enrolled Successfully!",
          description: `You are now enrolled in ${course.title}`,
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CourseHero
          title={course.title}
          instructor={course.instructor}
          description={course.description}
          rating={course.rating}
          ratingCount={course.ratingCount}
          students={course.students}
          image={course.image}
          price={course.price}
          discount={course.discount}
          level={course.level}
          category={course.category}
          isEnrolled={isEnrolled}
          onEnroll={handleEnroll}
          onContinueLearning={handleContinueLearning}
        />

        <div className="container mx-auto px-4 py-8">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum" ref={curriculumTabRef}>
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="quiz">Quizzes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      About This Course
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {course.description} This comprehensive course is designed
                      to give you a deep understanding of the subject matter.
                      Whether you're a beginner or looking to advance your
                      skills, this course provides a structured learning path
                      with practical examples and hands-on exercises.
                    </p>
                    <p className="text-muted-foreground">
                      By the end of this course, you'll have gained practical
                      knowledge and skills that you can immediately apply in
                      real-world scenarios. Join thousands of students who have
                      already transformed their careers through this
                      highly-rated course.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Understand core principles and fundamentals",
                        "Apply advanced techniques and methodologies",
                        "Develop practical skills through hands-on projects",
                        "Analyze real-world case studies and examples",
                        "Implement best practices and industry standards",
                        "Build a portfolio of work to showcase your skills",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                    <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                      <li>Basic understanding of the subject matter</li>
                      <li>Access to a computer with internet connection</li>
                      <li>Willingness to learn and practice regularly</li>
                      <li>
                        No advanced knowledge required - suitable for beginners
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="border rounded-lg p-6 space-y-4 bg-card">
                    <h3 className="text-xl font-bold">Course Details</h3>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {course.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Instructor</p>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Lessons</p>
                        <p className="text-sm text-muted-foreground">
                          15 lessons
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          June 2023
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Level</p>
                        <p className="text-sm text-muted-foreground">
                          {course.level}
                        </p>
                      </div>
                    </div>

                    {isEnrolled ? (
                      <Button
                        className="w-full"
                        onClick={() => setActiveTab("curriculum")}
                      >
                        Continue Learning
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              {isEnrolled ? (
                <CourseCurriculum
                  sections={courseCurriculum}
                  isEnrolled={isEnrolled}
                  courseId={course.id}
                />
              ) : (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <p className="mb-4">
                    Enroll in this course to access all lessons and materials
                  </p>
                  <Button onClick={handleEnroll}>Enroll Now</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="quiz" className="mt-6">
              {isEnrolled ? (
                <QuizComponent courseId={courseId} questions={questions} />
              ) : (
                <div className="p-6 bg-muted/50 rounded-lg text-center">
                  <p className="mb-4">
                    Enroll in this course to access quizzes and assessments
                  </p>
                  <Button onClick={handleEnroll}>Enroll Now</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Student Reviews</h3>
                  {isEnrolled && (
                    <Button variant="outline">Write a Review</Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((review) => (
                    <div key={review} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Student {review}</p>
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={
                                    i < 4 || review % 2 === 0
                                      ? "currentColor"
                                      : "none"
                                  }
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="h-4 w-4"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          2 months ago
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {review % 2 === 0
                          ? "This course exceeded my expectations. The instructor explains complex topics clearly and provides practical examples."
                          : "Great course with lots of valuable information. I've learned a lot and can apply these skills in my work."}
                      </p>
                    </div>
                  ))}
                </div>

                {!isEnrolled && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                    <p className="mb-4">
                      Enroll in this course to write a review
                    </p>
                    <Button onClick={handleEnroll}>Enroll Now</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
