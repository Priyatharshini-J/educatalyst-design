
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Paintbrush, LineChart, Lightbulb, Camera, Music, BookOpen, DataIcon, DollarSign } from 'lucide-react';

const categories = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn to code with popular languages like Python, JavaScript, and more',
    icon: Code,
    bgColor: 'bg-blue-100',
    color: 'text-blue-600',
    courses: 250
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Master digital design with courses on UI/UX, graphic design, and illustration',
    icon: Paintbrush,
    bgColor: 'bg-purple-100',
    color: 'text-purple-600',
    courses: 183
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Develop business skills in leadership, marketing, finance, and entrepreneurship',
    icon: LineChart,
    bgColor: 'bg-green-100',
    color: 'text-green-600',
    courses: 215
  },
  {
    id: 'personal-development',
    title: 'Personal Development',
    description: 'Enhance your soft skills, productivity, and mental wellbeing',
    icon: Lightbulb,
    bgColor: 'bg-yellow-100',
    color: 'text-yellow-600',
    courses: 167
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Learn photography techniques from beginner to professional level',
    icon: Camera,
    bgColor: 'bg-red-100',
    color: 'text-red-600',
    courses: 132
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Learn instruments, music theory, production, and composition',
    icon: Music,
    bgColor: 'bg-indigo-100',
    color: 'text-indigo-600',
    courses: 94
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Master digital marketing, SEO, social media, and content creation',
    icon: LineChart,
    bgColor: 'bg-teal-100',
    color: 'text-teal-600',
    courses: 178
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Learn data analysis, machine learning, and statistical methods',
    icon: BookOpen,
    bgColor: 'bg-blue-100',
    color: 'text-blue-700',
    courses: 145
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Master financial concepts, investment strategies, and accounting',
    icon: DollarSign,
    bgColor: 'bg-green-100',
    color: 'text-green-700',
    courses: 112
  }
];

const CategoryPage = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/courses?category=${categoryId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">All Categories</h1>
            <p className="text-muted-foreground mb-6">
              Explore our wide range of categories and find the perfect course for you
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.courses} courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                  >
                    Explore {category.title}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
