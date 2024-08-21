import { format } from 'date-fns';

export function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy, h:mm a');
  }