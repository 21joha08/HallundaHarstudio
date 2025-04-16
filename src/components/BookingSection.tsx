
import { useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Calendar, Clock, CalendarCheck, User, Phone, Mail } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
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

    // Here you would normally send the booking data to your backend
    console.log("Booking data:", { date, time, name, phone, email, service, message });

    // Show confirmation dialog
    setConfirmationOpen(true);
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
                          disabled={(date) => {
                            // Disable past dates and Sundays
                            const day = date.getDay();
                            return date < new Date(new Date().setHours(0, 0, 0, 0)) || day === 0;
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
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
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant="outline"
                              size="sm"
                              className={cn(
                                "justify-start font-normal",
                                time === slot && "bg-accent/20 border-accent"
                              )}
                              onClick={() => {
                                setTime(slot);
                                setIsTimePickerOpen(false);
                              }}
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
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
                  className="w-full bg-accent hover:bg-accent/90 text-primary transition-colors"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Boka tid nu
                </Button>

                <p className="text-sm text-salon-500 mt-4">
                  * Obligatoriska fält. Om du behöver avboka eller ändra din tid, vänligen kontakta oss senast 24 timmar innan din bokade tid.
                </p>
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
