import React from "react";
import { Play, Lock, FileText, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type LessonType = {
  id: string | number;
  title: string;
  type: string;
  duration: string;
  isLocked?: boolean;
  isCompleted?: boolean;
};

type SectionType = {
  id: string | number;
  title: string;
  duration: string;
  lessons: LessonType[];
};

type CourseCurriculumProps = {
  sections: SectionType[];
  isEnrolled: boolean;
};

export const CourseCurriculum = ({
  sections,
  isEnrolled,
}: CourseCurriculumProps) => {
  const calculateTotalLessons = () => {
    return sections.reduce(
      (total, section) => total + section.lessons.length,
      0
    );
  };

  const calculateTotalDuration = () => {
    let totalMinutes = 0;

    sections.forEach((section) => {
      section.lessons.forEach((lesson) => {
        const durationParts = lesson.duration.split(" ");
        if (durationParts.length === 2 && durationParts[1] === "min") {
          totalMinutes += parseInt(durationParts[0], 10);
        }
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${
      minutes > 0 ? `${minutes}m` : ""
    }`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Course Curriculum</h2>
        <div className="text-sm text-muted-foreground">
          {calculateTotalLessons()} lessons • {calculateTotalDuration()} total
          length
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        {sections.map((section, index) => (
          <AccordionItem
            key={section.id.toString()}
            value={section.id.toString()}
          >
            <AccordionTrigger className="hover:bg-muted/30 px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center w-full text-left pr-4">
                <div>
                  <span className="font-semibold">
                    Section {index + 1}: {section.title}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {section.lessons.length} lessons
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <ul className="space-y-1">
                {section.lessons.map((lesson) => (
                  <li key={lesson.id.toString()}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start rounded-lg h-auto py-3 px-4 ${
                        lesson.isLocked && !isEnrolled ? "opacity-60" : ""
                      }`}
                      disabled={lesson.isLocked && !isEnrolled}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          {lesson.type === "video" ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-grow text-left">
                          <div className="font-medium">{lesson.title}</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                          {lesson.isLocked && !isEnrolled && (
                            <Lock className="h-3 w-3 ml-2" />
                          )}
                        </div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
