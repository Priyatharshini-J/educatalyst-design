/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Play, Lock, FileText, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../ui/loading-spinner";

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
  courseId: string;
};

export const CourseCurriculum = ({
  sections,
  isEnrolled,
  courseId,
}: CourseCurriculumProps) => {
  const [videoData, setVideoData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
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

  function getYouTubeEmbedUrl(videoUrl: string) {
    const videoId = new URL(videoUrl).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const zcql = catalyst.ZCatalystQL;
    const query = `Select * from videoUrls where videoUrls.courseId = '${courseId}'`;
    const zcqlPromise = zcql.executeQuery(query);
    zcqlPromise
      .then((response) => {
        const data = response.content;
        const dataMap = data.reduce((acc, item) => {
          const lessonId = item.videoUrls.lessonId;
          const videoUrl = item.videoUrls.videoUrl;
          acc[lessonId] = videoUrl;
          return acc;
        }, {} as Record<string, string>);
        setVideoData(dataMap);
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
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <div className="text-sm text-muted-foreground">
              {calculateTotalLessons()} lessons • {calculateTotalDuration()}{" "}
              total length
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
                                <>
                                  <div className="aspect-video">
                                    <iframe
                                      src={getYouTubeEmbedUrl(
                                        videoData[lesson.id]
                                      )}
                                      title="YouTube video"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full rounded-md border"
                                    />
                                  </div>
                                </>
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
      )}
    </>
  );
};
