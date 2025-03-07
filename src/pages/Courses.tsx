
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CoursesList } from '@/components/courses/CoursesList';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CourseType } from '@/components/courses/CourseCard';
import { useSearchParams } from 'react-router-dom';
import { popularCourses } from '@/data/courses';

// Combine with popular courses to create a larger dataset
const allCourses: CourseType[] = [
  ...popularCourses,
  // Adding more courses for variety
  {
    id: "7ujm9ik8",
    title: "Introduction to Data Science",
    instructor: "Sarah Johnson",
    description: "Learn the fundamentals of data science and analytics",
    category: "Data Science",
    level: "Beginner",
    price: 79.99,
    discount: 0.15,
    rating: 4.7,
    ratingCount: 842,
    students: 6218,
    duration: "12 hours",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    progress: 0
  },
  {
    id: "3edc4rfv",
    title: "Advanced Mobile App Development",
    instructor: "Michael Chen",
    description: "Master advanced concepts in mobile app development",
    category: "Programming",
    level: "Advanced",
    price: 89.99,
    rating: 4.8,
    ratingCount: 512,
    students: 3841,
    duration: "15 hours",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    progress: 0
  },
  {
    id: "2wsx3edc",
    title: "Digital Marketing Masterclass",
    instructor: "Emily Parker",
    description: "Comprehensive guide to digital marketing strategies",
    category: "Business",
    level: "Intermediate",
    price: 69.99,
    discount: 0.2,
    rating: 4.6,
    ratingCount: 728,
    students: 5129,
    duration: "10 hours",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031&auto=format&fit=crop",
    progress: 0
  }
];

const Courses = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(allCourses);
  
  // Apply filters function
  const applyFilters = (
    category: string | null, 
    level: string | null, 
    priceRange: [number, number] | null
  ) => {
    let filtered = [...allCourses];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(course => course.category === category);
    }
    
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
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
            <p className="text-muted-foreground mb-6">
              Discover top-quality courses taught by industry experts
            </p>
            
            {searchQuery && (
              <p className="mb-4">
                Showing results for: <span className="font-semibold">"{searchQuery}"</span>
              </p>
            )}
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

export default Courses;
