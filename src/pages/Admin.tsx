
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { BookingData, getAllBookings, deleteBooking } from "@/services/bookingService";
import { Calendar, Clock, User, Phone, Mail, Scissors, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getAllBookings();
    setBookings(allBookings);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm("Är du säker på att du vill ta bort denna bokning?")) {
      const result = deleteBooking(id);
      if (result) {
        toast({
          title: "Bokning borttagen",
          description: "Bokningen har tagits bort från systemet.",
        });
        loadBookings();
      } else {
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte ta bort bokningen. Försök igen senare.",
          variant: "destructive",
        });
      }
    }
  };

  // Filter bookings based on date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < today;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP", { locale: sv });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bokningsadmin</h1>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-[400px] mb-6">
            <TabsTrigger value="upcoming">Kommande</TabsTrigger>
            <TabsTrigger value="past">Tidigare</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <h2 className="text-xl font-semibold mb-4">Kommande bokningar</h2>
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">Inga kommande bokningar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onDelete={handleDeleteBooking} 
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <h2 className="text-xl font-semibold mb-4">Tidigare bokningar</h2>
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">Inga tidigare bokningar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onDelete={handleDeleteBooking}
                    formatDate={formatDate}
                    isPast 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: BookingData;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  isPast?: boolean;
}

const BookingCard = ({ booking, onDelete, formatDate, isPast = false }: BookingCardProps) => {
  return (
    <Card className={isPast ? "opacity-70" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{booking.name}</CardTitle>
          {!isPast && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive" 
              onClick={() => onDelete(booking.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>{booking.service}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(booking.date)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{booking.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{booking.email}</span>
          </div>
          {booking.message && (
            <div className="mt-2 pt-2 border-t text-sm">
              <p className="font-medium mb-1">Meddelande:</p>
              <p className="text-muted-foreground">{booking.message}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
