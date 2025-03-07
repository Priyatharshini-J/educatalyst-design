
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseType } from '@/components/courses/CourseCard';
import { DashboardCourseCard } from '@/components/dashboard/DashboardCourseCard';
import { StudentStats } from '@/components/dashboard/StudentStats';
import { popularCourses } from '@/data/courses';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, Calendar } from 'lucide-react';

// Function to get enrolled courses from localStorage
const getEnrolledCourses = () => {
  const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const allCourses = [...popularCourses];
  
  // Filter courses by enrolled IDs and add progress data
  return allCourses
    .filter(course => enrolledIds.includes(course.id))
    .map(course => ({
      ...course,
      progress: parseInt(localStorage.getItem(`progress_${course.id}`) || '0')
    }));
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<CourseType[]>([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursLearned: 0,
    averageProgress: 0
  });
  
  useEffect(() => {
    // Get enrolled courses
    const courses = getEnrolledCourses();
    setEnrolledCourses(courses);
    
    // Calculate stats
    const completed = courses.filter(course => course.progress === 100).length;
    const inProgress = courses.filter(course => course.progress > 0 && course.progress < 100).length;
    
    // Calculate total hours (assuming format like "10 hours")
    const totalHours = courses.reduce((total, course) => {
      const hours = parseInt(course.duration.split(' ')[0]) || 0;
      return total + (hours * course.progress / 100);
    }, 0);
    
    // Calculate average progress
    const avgProgress = courses.length 
      ? courses.reduce((sum, course) => sum + course.progress, 0) / courses.length 
      : 0;
    
    setStats({
      coursesCompleted: completed,
      coursesInProgress: inProgress,
      totalHoursLearned: parseFloat(totalHours.toFixed(1)),
      averageProgress: Math.round(avgProgress)
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Track your progress and manage your learning journey
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold">{stats.totalHoursLearned}</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">{stats.averageProgress}%</p>
              </div>
            </div>
          </div>
          
          <StudentStats 
            coursesCompleted={stats.coursesCompleted}
            coursesInProgress={stats.coursesInProgress}
            totalCourses={enrolledCourses.length}
            averageProgress={stats.averageProgress}
          />
          
          <Tabs defaultValue="in-progress" className="mt-10">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="in-progress" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Continue Learning</h3>
                
                {enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses
                      .filter(course => course.progress > 0 && course.progress < 100)
                      .map(course => (
                        <DashboardCourseCard 
                          key={course.id} 
                          course={course} 
                          onContinue={() => navigate(`/courses/${course.id}`)}
                        />
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">No courses in progress</h3>
                    <p className="text-muted-foreground mb-4">
                      Start learning by exploring our course catalog
                    </p>
                    <Button onClick={() => navigate('/courses')}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Completed Courses</h3>
                
                {enrolledCourses.filter(course => course.progress === 100).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses
                      .filter(course => course.progress === 100)
                      .map(course => (
                        <DashboardCourseCard 
                          key={course.id} 
                          course={course} 
                          onContinue={() => navigate(`/courses/${course.id}`)}
                        />
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">No completed courses yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Keep learning to complete your enrolled courses
                    </p>
                    <Button onClick={() => navigate('/courses')}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">All Enrolled Courses</h3>
                
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses.map(course => (
                      <DashboardCourseCard 
                        key={course.id} 
                        course={course} 
                        onContinue={() => navigate(`/courses/${course.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Button onClick={() => navigate('/courses')}>
                      Browse Courses
                    </Button>
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

export default Dashboard;
