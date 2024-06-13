"use client";

import ReactPlayer from "react-player/youtube";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { X } from "lucide-react";

interface VideoPlayerProps {
  children: React.ReactNode;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className="h-auto max-w-3xl border-none bg-transparent"
        disableClose
      >
        <div>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=l4iyOYKc0vE"
            width={"100%"}
          />
          <DialogClose className="absolute right-0 top-0">
            <X className="size-5 stroke-white" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
