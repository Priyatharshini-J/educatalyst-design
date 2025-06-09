/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CoursesList } from "../courses/CoursesList";
import LoadingSpinner from "../ui/loading-spinner";

export const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("Courses");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        setPopularCourses(response.content);
      })
      .catch((err) => {
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
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold">Popular Courses</h2>
                <p className="text-muted-foreground mt-2">
                  Learn from the most sought-after courses on our platform
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 md:mt-0"
                onClick={() => navigate("/courses")}
              >
                View All Courses
              </Button>
            </div>

            <CoursesList courses={popularCourses} />
          </div>
        </section>
      )}
    </>
  );
};
