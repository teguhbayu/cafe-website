import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function randomNumber(n: number) {
  return Math.floor(Math.random() * n);
}

export function randomFileName() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ";
  const name =
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)] +
    chars[randomNumber(51)];

  return name;
}
