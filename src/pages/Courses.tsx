/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CoursesList } from "@/components/courses/CoursesList";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseType } from "@/components/courses/CourseCard";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const [allCourses, setAllCourses] = useState([]);
  const [sortOption, setSortOption] = useState<string>("popular");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("Courses");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        setAllCourses(response.content);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  const searchQuery = searchParams.get("search") || "";
  const [filteredCourses, setFilteredCourses] =
    useState<CourseType[]>(allCourses);

  const applyFilters = (
    category: string | null,
    level: string | null,
    priceRange: [number, number] | null
  ) => {
    let filtered = [...allCourses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category && category !== "all") {
      filtered = filtered.filter((course) => course.category === category);
    }

    // Apply level filter
    if (level && level !== "all") {
      filtered = filtered.filter((course) => course.level === level);
    }

    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter((course) => {
        const finalPrice = course.discount
          ? course.price - course.price * course.discount
          : course.price;
        return finalPrice >= min && finalPrice <= max;
      });
    }

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
    }
    setFilteredCourses(filtered);
  };

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
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
                    Showing results for:{" "}
                    <span className="font-semibold">"{searchQuery}"</span>
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

export default Courses;
