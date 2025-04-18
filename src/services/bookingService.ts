
// Simulated database for bookings
// In a real application, this would connect to a backend API

// Type definitions for our booking data
export interface BookingData {
  id: string;
  date: string; // ISO date string
  time: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
}

// Initialize localStorage with sample data if empty
const initializeBookings = (): void => {
  if (!localStorage.getItem('bookings')) {
    // Create sample bookings for demonstration
    const sampleBookings: BookingData[] = [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        name: 'Anna Andersson',
        phone: '070-123-4567',
        email: 'anna@example.com',
        service: 'Damklippning',
      },
      {
        id: '2',
        date: new Date().toISOString().split('T')[0],
        time: '14:30',
        name: 'Erik Johansson',
        phone: '070-987-6543',
        email: 'erik@example.com',
        service: 'Herrklippning',
      },
    ];
    localStorage.setItem('bookings', JSON.stringify(sampleBookings));
  }
};

// Initialize on module load
initializeBookings();

// Get all bookings
export const getAllBookings = (): BookingData[] => {
  const bookingsString = localStorage.getItem('bookings') || '[]';
  return JSON.parse(bookingsString);
};

// Get bookings for a specific date
export const getBookingsForDate = (date: Date): BookingData[] => {
  const formattedDate = date.toISOString().split('T')[0];
  return getAllBookings().filter(booking => booking.date === formattedDate);
};

// Check if a time slot is available
export const isTimeSlotAvailable = (date: Date, time: string): boolean => {
  const formattedDate = date.toISOString().split('T')[0];
  const bookings = getAllBookings();
  return !bookings.some(booking => booking.date === formattedDate && booking.time === time);
};

// Get available time slots for a date
export const getAvailableTimeSlots = (date: Date, allTimeSlots: string[]): string[] => {
  const bookedTimes = getBookingsForDate(date).map(booking => booking.time);
  return allTimeSlots.filter(time => !bookedTimes.includes(time));
};

// Add a new booking
export const addBooking = (booking: Omit<BookingData, 'id'>): BookingData => {
  const bookings = getAllBookings();
  const newBooking: BookingData = {
    ...booking,
    id: Date.now().toString(), // Simple ID generation
  };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

// Delete a booking
export const deleteBooking = (id: string): boolean => {
  const bookings = getAllBookings();
  const filteredBookings = bookings.filter(booking => booking.id !== id);
  
  if (filteredBookings.length === bookings.length) {
    return false; // No booking was removed
  }
  
  localStorage.setItem('bookings', JSON.stringify(filteredBookings));
  return true;
};
