import { type ClassValue, clsx } from "clsx";
import mongoose, { mongo } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
