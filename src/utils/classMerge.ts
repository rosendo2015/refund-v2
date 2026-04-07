import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function classMarge(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}