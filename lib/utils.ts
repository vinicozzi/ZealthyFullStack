import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns'; 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: string, dateFormat = 'yyyy-MM-dd HH:mm:ss', outputFormat = 'MMMM d, yyyy h:mm a') {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, outputFormat);
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid Date';
  }
}

