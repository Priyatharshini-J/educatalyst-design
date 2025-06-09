import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
      <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-700">
            Unlock Your Potential with Online Learning
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-10">
            Join thousands of students learning from expert instructors.
            Discover courses in programming, design, business, and more. Start
            your learning journey today!!
          </p>

          <form onSubmit={handleSearch} className="flex gap-1 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 py-6 rounded-r-none rounded-l-lg"
                placeholder="Search for any course..."
              />
            </div>
            <Button type="submit" size="lg" className="rounded-l-none">
              Search
            </Button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/courses")}
            >
              Browse All Courses
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/categories")}
            >
              Explore Categories
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm leading-6 text-gray-600">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5 text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5 text-primary"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5 text-primary"
              >
                <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 4 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0" />
                <path d="M15 11v-1h1a1 1 0 0 1 1 1v1c0 1-2 2-2 3" />
                <path d="M4 15h1" />
                <path d="M9 15h6" />
              </svg>
              <span>Certificates</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5 text-primary"
              >
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
