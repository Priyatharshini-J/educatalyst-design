
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularCourses } from '@/components/home/PopularCourses';
import { Categories } from '@/components/home/Categories';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PopularCourses />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
