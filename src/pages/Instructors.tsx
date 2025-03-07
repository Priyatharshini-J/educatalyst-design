
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InstructorCard, InstructorType } from '@/components/instructors/InstructorCard';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const instructors: InstructorType[] = [
  {
    id: "ins-1",
    name: "Dr. Michael Johnson",
    title: "Software Engineering Professor",
    bio: "Dr. Johnson is a professor of Computer Science with over 15 years of industry experience. He specializes in software architecture, algorithms, and machine learning.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    courses: 12,
    students: 24580,
    rating: 4.8,
    specialties: ["Programming", "Software Engineering", "Algorithms", "Machine Learning"]
  },
  {
    id: "ins-2",
    name: "Sarah Williams",
    title: "UX/UI Design Expert",
    bio: "Sarah is a UX/UI design consultant who has worked with Fortune 500 companies. She brings her real-world design experience to help students create user-centered digital products.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    courses: 8,
    students: 18250,
    rating: 4.9,
    specialties: ["Design", "UX/UI", "User Research", "Prototyping"]
  },
  {
    id: "ins-3",
    name: "James Rodriguez",
    title: "Digital Marketing Strategist",
    bio: "James has helped over 100 businesses improve their online presence. His courses focus on practical digital marketing strategies that deliver measurable results.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    courses: 6,
    students: 15840,
    rating: 4.7,
    specialties: ["Marketing", "SEO", "Social Media", "Content Creation"]
  },
  {
    id: "ins-4",
    name: "Emily Chen",
    title: "Data Science Professional",
    bio: "Emily is a data scientist with a background in statistics and machine learning. She specializes in turning complex data concepts into clear, actionable insights.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    courses: 5,
    students: 12680,
    rating: 4.6,
    specialties: ["Data Science", "Statistics", "Python", "Data Visualization"]
  },
  {
    id: "ins-5",
    name: "Robert Taylor",
    title: "Business Coach & Entrepreneur",
    bio: "Robert has founded three successful startups and now shares his knowledge about business development, leadership, and entrepreneurship.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    courses: 9,
    students: 21450,
    rating: 4.8,
    specialties: ["Business", "Entrepreneurship", "Leadership", "Strategy"]
  },
  {
    id: "ins-6",
    name: "Lisa Kumar",
    title: "Photography Expert",
    bio: "Lisa is an award-winning photographer whose work has been featured in major publications. She teaches both technical and artistic aspects of photography.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    courses: 7,
    students: 9820,
    rating: 4.9,
    specialties: ["Photography", "Editing", "Composition", "Lighting"]
  }
];

const InstructorsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredInstructors, setFilteredInstructors] = React.useState(instructors);

  // Filter instructors based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredInstructors(instructors);
      return;
    }
    
    const filtered = instructors.filter(instructor => {
      const query = searchQuery.toLowerCase();
      return (
        instructor.name.toLowerCase().includes(query) ||
        instructor.title.toLowerCase().includes(query) ||
        instructor.bio.toLowerCase().includes(query) ||
        instructor.specialties.some(specialty => 
          specialty.toLowerCase().includes(query)
        )
      );
    });
    
    setFilteredInstructors(filtered);
  }, [searchQuery]);

  return (
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
              filteredInstructors.map(instructor => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No instructors found</h3>
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
  );
};

export default InstructorsPage;
