/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Instructors from "./pages/Instructors";
import InstructorDetail from "./pages/InstructorDetail";
import LoadingSpinner from "./components/ui/loading-spinner";

const queryClient = new QueryClient();

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const Zcatalyst = (window as any).catalyst;
    Zcatalyst.auth
      .isUserAuthenticated()
      .then(() => {
        setIsUserAuthenticated(true);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : isUserAuthenticated ? (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/app" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/:categoryId"
                  element={<CategoryDetail />}
                />
                <Route path="/instructors" element={<Instructors />} />
                <Route
                  path="/instructors/:instructorId"
                  element={<InstructorDetail />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      ) : (
        (window.location.href = "/__catalyst/auth/login")
      )}
    </>
  );
}

export default App;
