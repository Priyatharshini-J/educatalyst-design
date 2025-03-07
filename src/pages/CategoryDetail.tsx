
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CoursesList } from '@/components/courses/CoursesList';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { CourseType } from '@/components/courses/CourseCard';
import { popularCourses } from '@/data/courses';

const categories = {
  'programming': {
    title: 'Programming Courses',
    description: 'Master coding with our comprehensive programming courses',
    color: 'from-blue-500 to-indigo-600'
  },
  'design': {
    title: 'Design Courses',
    description: 'Enhance your design skills with professional courses',
    color: 'from-purple-500 to-pink-600'
  },
  'business': {
    title: 'Business Courses',
    description: 'Develop business acumen with our expert-led courses',
    color: 'from-green-500 to-emerald-600'
  },
  'marketing': {
    title: 'Marketing Courses',
    description: 'Become a marketing professional with our comprehensive courses',
    color: 'from-red-500 to-orange-600'
  },
  'data-science': {
    title: 'Data Science Courses',
    description: 'Analyze and interpret complex data with our specialized courses',
    color: 'from-blue-400 to-cyan-600'
  },
  'finance': {
    title: 'Finance Courses',
    description: 'Master financial concepts with our expert-led courses',
    color: 'from-green-400 to-teal-600'
  },
  'photography': {
    title: 'Photography Courses',
    description: 'Capture stunning images with our photography courses',
    color: 'from-orange-500 to-red-600'
  },
  'music': {
    title: 'Music Courses',
    description: 'Enhance your musical abilities with our comprehensive courses',
    color: 'from-indigo-500 to-purple-600'
  },
  'personal-development': {
    title: 'Personal Development Courses',
    description: 'Grow personally and professionally with our transformative courses',
    color: 'from-yellow-500 to-amber-600'
  }
};

// Demo courses - normally would be fetched based on category
const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const [filteredCourses, setFilteredCourses] = React.useState<CourseType[]>(popularCourses);
  
  const category = categoryId && categories[categoryId as keyof typeof categories];
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Apply filters function
  const applyFilters = (
    categoryFilter: string | null, 
    level: string | null, 
    priceRange: [number, number] | null
  ) => {
    let filtered = [...popularCourses];
    
    // Apply level filter
    if (level && level !== 'all') {
      filtered = filtered.filter(course => course.level === level);
    }
    
    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter(course => {
        const finalPrice = course.discount 
          ? course.price - (course.price * course.discount) 
          : course.price;
        return finalPrice >= min && finalPrice <= max;
      });
    }
    
    setFilteredCourses(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className={`bg-gradient-to-r ${category.color} text-white py-16`}>
          <div className="container mx-auto px-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-6 bg-white/20 hover:bg-white/30 border-white/40"
              onClick={() => navigate('/categories')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Categories
            </Button>
            <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CourseFilters onApplyFilters={applyFilters} />
            </div>
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> courses
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm">Sort by:</label>
                  <select 
                    id="sort" 
                    className="p-2 border rounded-md text-sm bg-background"
                    onChange={(e) => {
                      const sortedCourses = [...filteredCourses];
                      switch (e.target.value) {
                        case 'popular':
                          sortedCourses.sort((a, b) => b.students - a.students);
                          break;
                        case 'rating':
                          sortedCourses.sort((a, b) => b.rating - a.rating);
                          break;
                        case 'price-low':
                          sortedCourses.sort((a, b) => a.price - b.price);
                          break;
                        case 'price-high':
                          sortedCourses.sort((a, b) => b.price - a.price);
                          break;
                        default:
                          break;
                      }
                      setFilteredCourses(sortedCourses);
                    }}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {filteredCourses.length > 0 ? (
                <CoursesList courses={filteredCourses} />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
