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

export const getStatusColor = (status: string) => {
  switch (status) {
      case "New":
          return "bg-red-500 text-red-50 py-2 px-2 text-md text-center rounded-md ";
        case "In Progress":
          return "bg-yellow-300 text-yellow-50 py-2 px-2 text-md text-center rounded-md ";
        case "Resolved":
          return "bg-green-500 text-green-50 py-2 px-2 text-md text-center rounded-md ";
        default:
          return "";
    }
  };