/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type User = {
  email_id: string;
  first_name: string;
  last_name: string;
  user_type: string;
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email_id: "",
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const toggleLogout = () => {
    const redirectURL = "/app";
    const auth = (window as any).catalyst.auth;
    auth.signOut(redirectURL);
  };
  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const userManagement = catalyst.userManagement;
    const currentUserPromise = userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUser(response.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/app" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-graduation-cap"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <span className="font-bold text-xl">EduCatalyst</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              to="/courses"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/categories"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/instructors"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Instructors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex w-full max-w-sm items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8 bg-background w-[200px] md:w-[300px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/courses?search=" + e.currentTarget.value);
                }
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-muted"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[300px] rounded-xl bg-white text-center p-6 shadow-lg"
              >
                <DropdownMenuLabel className="text-xl font-semibold mb-2">
                  My Account
                </DropdownMenuLabel>
                <p className="text-sm text-gray-600 mb-2">{user.email_id}</p>

                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-xl flex items-center justify-center">
                  <User className="text-gray-500 w-8 h-8" />
                </div>

                <p className="mt-4 text-lg font-medium">
                  Hi, {user.first_name ? `${user.first_name} ` : ""}{" "}
                  {user.last_name ? `${user.last_name} ` : ""}
                </p>
                <p className="text-sm text-gray-500">{user.user_type}</p>
                <button
                  onClick={toggleLogout}
                  className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                >
                  Logout
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
