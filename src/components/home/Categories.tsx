import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Paintbrush,
  LineChart,
  DollarSign,
  Camera,
  Music,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    id: "programming",
    title: "Programming",
    description:
      "Learn to code with popular languages like Python, JavaScript, and more",
    icon: Code,
    bgColor: "bg-blue-100",
    color: "text-blue-600",
    courses: 250,
  },
  {
    id: "design",
    title: "Design",
    description:
      "Master digital design with courses on UI/UX, graphic design, and illustration",
    icon: Paintbrush,
    bgColor: "bg-purple-100",
    color: "text-purple-600",
    courses: 183,
  },
  {
    id: "business",
    title: "Business",
    description:
      "Develop business skills in leadership, marketing, finance, and entrepreneurship",
    icon: LineChart,
    bgColor: "bg-green-100",
    color: "text-green-600",
    courses: 215,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Master digital marketing, SEO, social media, and content creation",
    icon: LineChart,
    bgColor: "bg-teal-100",
    color: "text-teal-600",
    courses: 178,
  },
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Learn data analysis, machine learning, and statistical methods",
    icon: BookOpen,
    bgColor: "bg-blue-100",
    color: "text-blue-700",
    courses: 145,
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Master financial concepts, investment strategies, and accounting",
    icon: DollarSign,
    bgColor: "bg-green-100",
    color: "text-green-700",
    courses: 112,
  },
];

export const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Explore Categories</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover a wide range of subjects to expand your knowledge and
            skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardHeader className="pb-2">
                <div
                  className={`w-12 h-12 rounded-lg ${category.bgColor} ${category.color} flex items-center justify-center mb-4`}
                >
                  <category.icon className="h-6 w-6" />
                </div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.courses} courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Explore Courses
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button onClick={() => navigate("/categories")}>
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};
