
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Calendar, Clock, CalendarCheck, User, Phone, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  getAllBookings, 
  getAvailableTimeSlots, 
  addBooking, 
  isTimeSlotAvailable 
} from "@/services/bookingService";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = "YOUR_USER_ID"; // Replace with your EmailJS user ID

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Damklippning");
  const [message, setMessage] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const { toast } = useToast();

  // Update available time slots when date changes
  useEffect(() => {
    if (date) {
      const availableTimes = getAvailableTimeSlots(date, timeSlots);
      setAvailableTimeSlots(availableTimes);
      
      // Clear selected time if it's no longer available
      if (time && !availableTimes.includes(time)) {
        setTime(undefined);
      }
    }
  }, [date, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!date || !time || !name || !phone || !email || !service) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        description: "Vänligen fyll i alla fält markerade med *",
        variant: "destructive",
      });
      return;
    }

    // Double-check availability at submission time
    if (date && time && !isTimeSlotAvailable(date, time)) {
      toast({
        title: "Tiden är inte tillgänglig",
        description: "Någon har precis bokat denna tid. Vänligen välj en annan tid.",
        variant: "destructive",
      });
      // Refresh available times
      const availableTimes = getAvailableTimeSlots(date, timeSlots);
      setAvailableTimeSlots(availableTimes);
      setTime(undefined);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format date for storage and display
      const formattedDate = date ? date.toISOString().split('T')[0] : "";

      // Add the booking to our storage
      const bookingData = {
        date: formattedDate,
        time: time || "",
        name,
        phone,
        email,
        service,
        message,
      };

      addBooking(bookingData);

      // Prepare template parameters for EmailJS
      const templateParams = {
        name,
        email,
        phone,
        service,
        date: date ? format(date, "PPP", { locale: sv }) : "",
        time,
        message,
      };

      console.log("Booking data:", bookingData);
      
      // Show confirmation dialog
      setConfirmationOpen(true);
      
      // Update available times
      if (date) {
        const updatedAvailableTimes = getAvailableTimeSlots(date, timeSlots);
        setAvailableTimeSlots(updatedAvailableTimes);
      }

    } catch (error) {
      console.error("Error processing booking:", error);
      toast({
        title: "Ett fel uppstod",
        description: "Vi kunde inte skicka din bokning. Vänligen försök igen senare eller kontakta oss direkt per telefon.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDate(undefined);
    setTime(undefined);
    setName("");
    setPhone("");
    setEmail("");
    setService("Damklippning");
    setMessage("");
    setConfirmationOpen(false);
  };

  // Helper to determine if a date has limited availability
  const getDayAvailability = (day: Date) => {
    const availableTimes = getAvailableTimeSlots(day, timeSlots);
    if (availableTimes.length === 0) return "none";
    if (availableTimes.length < 5) return "limited";
    return "available";
  };

  return (
    <section id="booking" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
          Boka Din Tid
        </h2>
        <p className="section-heading text-center text-salon-600 mb-8">
          Enkelt och smidigt online
        </p>

        <div className="max-w-2xl mx-auto">
          <Card className="border border-salon-200 shadow-lg overflow-hidden">
            <div className="p-1 bg-accent/20"></div>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="block text-sm font-medium text-salon-700">
                      Välj datum *
                    </Label>
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4 text-accent" />
                          {date ? format(date, "PPP", { locale: sv }) : <span>Klicka för att välja datum</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarUI
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            setIsDatePickerOpen(false);
                          }}
                          modifiers={{
                            limited: (day) => getDayAvailability(day) === "limited",
                            fully_booked: (day) => getDayAvailability(day) === "none"
                          }}
                          modifiersClassNames={{
                            limited: "bg-yellow-100 text-yellow-900",
                            fully_booked: "bg-red-100 text-red-900"
                          }}
                          disabled={(day) => {
                            // Disable past dates and Sundays
                            const dayOfWeek = day.getDay();
                            return day < new Date(new Date().setHours(0, 0, 0, 0)) || dayOfWeek === 0 || getDayAvailability(day) === "none";
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                        <div className="p-3 border-t border-border flex justify-between text-xs">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                            <span>Tillgänglig</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-100 mr-1"></div>
                            <span>Begränsad</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-100 mr-1"></div>
                            <span>Fullbokad</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="block text-sm font-medium text-salon-700">
                      Välj tid *
                    </Label>
                    <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !time && "text-muted-foreground"
                          )}
                          disabled={!date}
                        >
                          <Clock className="mr-2 h-4 w-4 text-accent" />
                          {time ? time : <span>Klicka för att välja tid</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="start">
                        {availableTimeSlots.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 p-2">
                            {timeSlots.map((slot) => {
                              const isAvailable = availableTimeSlots.includes(slot);
                              return (
                                <Button
                                  key={slot}
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "justify-start font-normal",
                                    time === slot && "bg-accent/20 border-accent",
                                    !isAvailable && "opacity-50 cursor-not-allowed bg-muted"
                                  )}
                                  onClick={() => {
                                    if (isAvailable) {
                                      setTime(slot);
                                      setIsTimePickerOpen(false);
                                    }
                                  }}
                                  disabled={!isAvailable}
                                >
                                  {slot}
                                  {!isAvailable && (
                                    <Badge variant="outline" className="ml-1 text-xs">
                                      Bokad
                                    </Badge>
                                  )}
                                </Button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <AlertCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
                            <p className="text-sm">Inga lediga tider för detta datum</p>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="block text-sm font-medium text-salon-700">
                      Namn *
                    </Label>
                    <div className="flex">
                      <div className="flex items-center bg-muted p-2 rounded-l-md border border-r-0 border-input">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-l-none"
                        placeholder="Ditt namn"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="block text-sm font-medium text-salon-700">
                      Telefon *
                    </Label>
                    <div className="flex">
                      <div className="flex items-center bg-muted p-2 rounded-l-md border border-r-0 border-input">
                        <Phone className="h-4 w-4 text-accent" />
                      </div>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-l-none"
                        placeholder="Ditt telefonnummer"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="block text-sm font-medium text-salon-700">
                      E-post *
                    </Label>
                    <div className="flex">
                      <div className="flex items-center bg-muted p-2 rounded-l-md border border-r-0 border-input">
                        <Mail className="h-4 w-4 text-accent" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-l-none"
                        placeholder="Din e-postadress"
                        required
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="block text-sm font-medium text-salon-700">
                      Tjänst *
                    </Label>
                    <select
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Damklippning">Damklippning</option>
                      <option value="Herrklippning">Herrklippning</option>
                      <option value="Barnklippning">Barnklippning</option>
                      <option value="Färgning & Slingor">Färgning & Slingor</option>
                      <option value="Styling & Föning">Styling & Föning</option>
                      <option value="Bröllops- och festuppsättningar">Bröllops- och festuppsättningar</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="block text-sm font-medium text-salon-700">
                    Meddelande
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ytterligare information om din bokning..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !date || !time}
                  className="w-full bg-accent hover:bg-accent/90 text-primary transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="mr-2 h-5 w-5" />
                      Boka tid nu
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-salon-600 mb-2">
                    När du bokar tid skickas dina uppgifter via email till salongen.
                  </p>
                  <p className="text-sm text-salon-500">
                    * Obligatoriska fält. Om du behöver avboka eller ändra din tid, vänligen kontakta oss senast 24 timmar innan din bokade tid.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bokning bekräftad</DialogTitle>
            <DialogDescription>
              Tack för din bokning! Vi har skickat en bekräftelse till din e-post.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {date && time && (
              <div className="border rounded-md p-4 bg-accent/5">
                <div className="flex items-center mb-2">
                  <CalendarCheck className="h-5 w-5 text-accent mr-2" />
                  <span className="font-medium">Bokningsinformation</span>
                </div>
                <p><span className="font-medium">Datum:</span> {format(date, "PPP", { locale: sv })}</p>
                <p><span className="font-medium">Tid:</span> {time}</p>
                <p><span className="font-medium">Tjänst:</span> {service}</p>
                <p><span className="font-medium">Namn:</span> {name}</p>
              </div>
            )}
            <Button
              onClick={resetForm}
              className="w-full bg-accent hover:bg-accent/90 text-primary transition-colors"
            >
              Stäng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingSection;
