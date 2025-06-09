import React from "react";
import { Star, Clock, Users, BookOpen, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CourseHeroProps = {
  title: string;
  instructor: string;
  description: string;
  rating: number;
  ratingCount: number;
  students: number;
  image: string;
  price: number;
  discount?: number;
  level: string;
  category: string;
  isEnrolled: boolean;
  onEnroll: () => void;
  onContinueLearning: () => void;
};

export const CourseHero = ({
  title,
  instructor,
  description,
  rating,
  ratingCount,
  students,
  image,
  price,
  discount,
  level,
  category,
  isEnrolled = false,
  onEnroll,
  onContinueLearning,
}: CourseHeroProps) => {
  const discountedPrice = discount ? price - price * discount : null;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95"></div>
      <div
        className="h-[300px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="container relative -mt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Badge className="mb-2">{category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-500 stroke-amber-500 h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({ratingCount} ratings)
                </span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {students.toLocaleString()} students
                </span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm"></span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <BarChart className="h-4 w-4 mr-1" />
                <span className="text-sm">{level}</span>
              </div>
            </div>

            <p className="text-lg mb-2">By {instructor}</p>
            <p className="text-muted-foreground mb-6">{description}</p>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <img
                src={image}
                alt={title}
                className="w-full aspect-video object-cover"
              />

              <CardContent className="pt-6">
                <div className="mb-4">
                  {discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-lg line-through text-muted-foreground">
                        ${price.toFixed(2)}
                      </span>
                      <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30">
                        {Math.round(discount * 100)}% OFF
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold">
                      ${price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>Access on mobile and desktop</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {isEnrolled ? (
                  <Button className="w-full" onClick={onContinueLearning}>
                    Continue Learning
                  </Button>
                ) : (
                  <Button className="w-full" onClick={onEnroll}>
                    Enroll Now
                  </Button>
                )}
              </CardContent>

              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                30-day money-back guarantee
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
