
import { CourseType } from "@/components/courses/CourseCard";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const popularCourses: CourseType[] = [
  {
    id: generateId(),
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    description: "Learn to build websites using HTML, CSS, JavaScript, React, Node, and more. This comprehensive course covers everything you need to know to become a full-stack web developer.",
    category: "Programming",
    level: "Beginner",
    price: 99.99,
    discount: 0.15,
    rating: 4.8,
    ratingCount: 15420,
    students: 125500,
    duration: "63 hours",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: generateId(),
    title: "Modern UI/UX Design Masterclass",
    instructor: "Sarah Johnson",
    description: "Master modern UI/UX design principles and workflows. Learn to design beautiful interfaces that users will love, using tools like Figma and Adobe XD.",
    category: "Design",
    level: "Intermediate",
    price: 84.99,
    rating: 4.7,
    ratingCount: 8340,
    students: 45200,
    duration: "35 hours",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: generateId(),
    title: "Python for Data Science and Machine Learning",
    instructor: "Michael Thompson",
    description: "Learn Python programming and how to use it for data analysis, visualization, and machine learning. Master libraries like NumPy, Pandas, and TensorFlow.",
    category: "Data Science",
    level: "Intermediate",
    price: 129.99,
    discount: 0.2,
    rating: 4.9,
    ratingCount: 12800,
    students: 95300,
    duration: "48 hours",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: generateId(),
    title: "Digital Marketing Essentials",
    instructor: "Emily Chen",
    description: "Master digital marketing strategies including SEO, social media marketing, email campaigns, and paid advertising. Learn how to measure and optimize your marketing efforts.",
    category: "Marketing",
    level: "Beginner",
    price: 69.99,
    rating: 4.6,
    ratingCount: 5240,
    students: 38700,
    duration: "25 hours",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: generateId(),
    title: "Financial Analysis and Valuation",
    instructor: "Robert Williams",
    description: "Learn how to analyze financial statements, value companies, and make investment decisions. Perfect for aspiring finance professionals and investors.",
    category: "Finance",
    level: "Advanced",
    price: 149.99,
    discount: 0.1,
    rating: 4.7,
    ratingCount: 3680,
    students: 28600,
    duration: "40 hours",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: generateId(),
    title: "Mobile App Development with React Native",
    instructor: "James Rodriguez",
    description: "Build cross-platform mobile apps using React Native. Learn to create beautiful, responsive apps that work on both iOS and Android from a single codebase.",
    category: "Programming",
    level: "Intermediate",
    price: 89.99,
    rating: 4.8,
    ratingCount: 7420,
    students: 52800,
    duration: "38 hours",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  }
];

export const enrolledCourses = [
  {
    ...popularCourses[0],
    progress: 45,
    lastAccessedLesson: {
      id: generateId(),
      title: "Building Your First React Component",
      sectionTitle: "React Fundamentals"
    }
  },
  {
    ...popularCourses[2],
    progress: 72,
    lastAccessedLesson: {
      id: generateId(),
      title: "Pandas Data Manipulation",
      sectionTitle: "Data Analysis with Python"
    }
  },
  {
    ...popularCourses[4],
    progress: 18,
    lastAccessedLesson: {
      id: generateId(),
      title: "Financial Statement Analysis",
      sectionTitle: "Understanding Financial Statements"
    }
  }
];

export const courseSections = [
  {
    id: generateId(),
    title: "Introduction to Web Development",
    lessons: [
      {
        id: generateId(),
        title: "Course Overview and Setup",
        type: "video",
        duration: "12 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Understanding the Web Development Landscape",
        type: "video",
        duration: "18 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Setting Up Your Development Environment",
        type: "video",
        duration: "25 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Introduction to HTML, CSS, and JavaScript",
        type: "reading",
        duration: "15 min",
        isLocked: false
      }
    ]
  },
  {
    id: generateId(),
    title: "HTML Fundamentals",
    lessons: [
      {
        id: generateId(),
        title: "HTML Document Structure",
        type: "video",
        duration: "14 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Working with Text and Headings",
        type: "video",
        duration: "16 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Links, Images, and Media",
        type: "video",
        duration: "22 min",
        isLocked: false
      },
      {
        id: generateId(),
        title: "Forms and Input Elements",
        type: "video",
        duration: "28 min",
        isLocked: true
      },
      {
        id: generateId(),
        title: "HTML5 Semantic Elements",
        type: "reading",
        duration: "12 min",
        isLocked: true
      }
    ]
  },
  {
    id: generateId(),
    title: "CSS Styling",
    lessons: [
      {
        id: generateId(),
        title: "CSS Selectors and Specificity",
        type: "video",
        duration: "20 min",
        isLocked: true
      },
      {
        id: generateId(),
        title: "Box Model and Layout",
        type: "video",
        duration: "24 min",
        isLocked: true
      },
      {
        id: generateId(),
        title: "Flexbox and Grid Systems",
        type: "video",
        duration: "32 min",
        isLocked: true
      },
      {
        id: generateId(),
        title: "Responsive Design and Media Queries",
        type: "video",
        duration: "26 min",
        isLocked: true
      },
      {
        id: generateId(),
        title: "CSS Animations and Transitions",
        type: "video",
        duration: "22 min",
        isLocked: true
      }
    ]
  }
];

export const quizQuestions = [
  {
    id: generateId(),
    question: "Which HTML tag is used to define a paragraph?",
    options: ["<p>", "<paragraph>", "<para>", "<div>"],
    correctAnswer: 0
  },
  {
    id: generateId(),
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1
  },
  {
    id: generateId(),
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Boolean", "String", "Character", "Number"],
    correctAnswer: 2
  },
  {
    id: generateId(),
    question: "In CSS, which property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    correctAnswer: 1
  },
  {
    id: generateId(),
    question: "Which HTML tag is used to insert a line break?",
    options: ["<lb>", "<break>", "<br>", "<newline>"],
    correctAnswer: 2
  }
];
