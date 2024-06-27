import { type ClassValue, clsx } from "clsx"
import { router } from "expo-router";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onSwipePerformed = (action: string) => {
  switch(action){
    case 'left': {
      console.log('left Swipe performed');
      break;
    }
    case 'right': {
      console.log('right Swipe performed');
      router.back();
      break;
    }
    case 'up': {
      console.log('up Swipe performed');
      break;
    }
    case 'down': {
      console.log('down Swipe performed');
      break;
    }
    default: {
      console.log('Undetected action');
    }
  }
};
