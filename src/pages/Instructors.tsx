/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InstructorCard } from "@/components/instructors/InstructorCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

const InstructorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const datastore = catalyst.table;
    const table = datastore.tableId("Instructors");
    const rowPromise = table.getPagedRows();
    rowPromise
      .then((response) => {
        const processedInstructors = response.content.map(
          (instructor: any) => ({
            ...instructor,
            specialties: JSON.parse(instructor.specialties), // <- key line
          })
        );
        setInstructors(processedInstructors);
        setFilteredInstructors(processedInstructors);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredInstructors(instructors);
      return;
    }

    const filtered = instructors.filter((instructor) => {
      const query = searchQuery.toLowerCase();
      return (
        instructor.name.toLowerCase().includes(query) ||
        instructor.title.toLowerCase().includes(query) ||
        instructor.bio.toLowerCase().includes(query) ||
        instructor.specialties.some((specialty) =>
          specialty.toLowerCase().includes(query)
        )
      );
    });

    setFilteredInstructors(filtered);
  }, [searchQuery]);

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
                <h1 className="text-4xl font-bold mb-2">Our Instructors</h1>
                <p className="text-muted-foreground mb-6">
                  Learn from industry experts and seasoned professionals
                </p>

                <div className="max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search instructors by name, specialty, etc."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInstructors.length > 0 ? (
                  filteredInstructors.map((instructor) => (
                    <InstructorCard
                      key={instructor.id}
                      instructor={instructor}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No instructors found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default InstructorsPage;
