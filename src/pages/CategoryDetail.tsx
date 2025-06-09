/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CoursesList } from "@/components/courses/CoursesList";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CourseType } from "@/components/courses/CourseCard";
import LoadingSpinner from "@/components/ui/loading-spinner";

const categories = {
  programming: {
    title: "Programming Courses",
    description: "Master coding with our comprehensive programming courses",
    color: "from-blue-500 to-indigo-600",
  },
  design: {
    title: "Design Courses",
    description: "Enhance your design skills with professional courses",
    color: "from-purple-500 to-pink-600",
  },
  business: {
    title: "Business Courses",
    description: "Develop business acumen with our expert-led courses",
    color: "from-green-500 to-emerald-600",
  },
  marketing: {
    title: "Marketing Courses",
    description:
      "Become a marketing professional with our comprehensive courses",
    color: "from-red-500 to-orange-600",
  },
  "data-science": {
    title: "Data Science Courses",
    description:
      "Analyze and interpret complex data with our specialized courses",
    color: "from-blue-400 to-cyan-600",
  },
  "personal-development": {
    title: "Personal Development Courses",
    description:
      "Grow personally and professionally with our transformative courses",
    color: "from-yellow-500 to-amber-600",
  },
};

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);
  const [sortOption, setSortOption] = useState<string>("popular");
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  const category =
    categoryId &&
    categories[categoryId.toLowerCase() as keyof typeof categories];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const catalyst = (window as any).catalyst;
        const datastore = catalyst.table;
        const table = datastore.tableId("Courses");
        const response = await table.getPagedRows();
        const all = response.content;
        setAllCourses(all);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  const applyFilters = (
    selectedCategoryId: string | null,
    level: string | null,
    priceRange: [number, number] | null
  ) => {
    let filtered = [...allCourses];

    if (selectedCategoryId && selectedCategoryId !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.category?.toLowerCase() === selectedCategoryId.toLowerCase()
      );
    }

    if (level && level !== "all") {
      filtered = filtered.filter((course) => course.level === level);
    }

    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter((course) => {
        const finalPrice = course.discount
          ? course.price - course.price * course.discount
          : course.price;
        return finalPrice >= min && finalPrice <= max;
      });
    }

    // 🔁 Apply sorting here too
    switch (sortOption) {
      case "popular":
        filtered.sort((a, b) => Number(b.students) - Number(a.students));
        break;
      case "rating":
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case "price-low":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  };

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
            <Button onClick={() => navigate("/categories")}>
              Back to Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <div
              className={`bg-gradient-to-r ${category.color} text-white py-16`}
            >
              <div className="container mx-auto px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-6 bg-white/20 hover:bg-white/30 border-white/40"
                  onClick={() => navigate("/categories")}
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
                  <CourseFilters
                    onApplyFilters={(...args) => {
                      applyFilters(...args);
                    }}
                  />
                </div>
                <div className="lg:col-span-3">
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {filteredCourses.length}
                      </span>{" "}
                      courses
                    </p>
                    <div className="flex items-center gap-2">
                      <label htmlFor="sort" className="text-sm">
                        Sort by:
                      </label>
                      <select
                        id="sort"
                        className="p-2 border rounded-md text-sm bg-background"
                        value={sortOption}
                        onChange={(e) => {
                          setSortOption(e.target.value);
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
                      <h3 className="text-xl font-semibold mb-2">
                        No courses found
                      </h3>
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
      )}
    </>
  );
};

export default CategoryDetail;
