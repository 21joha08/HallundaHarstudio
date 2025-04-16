
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const EmailSetupGuide = () => {
  const [serviceId, setServiceId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [userId, setUserId] = useState("");
  const [showGuide, setShowGuide] = useState(true);
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, you would save these values to localStorage or a database
    if (serviceId && templateId && userId) {
      // This is just for demonstration - in a real app, you'd use these values
      console.log("EmailJS credentials saved:", { serviceId, templateId, userId });
      
      toast({
        title: "Inställningar sparade",
        description: "Din EmailJS-konfiguration har sparats.",
      });
      
      setShowGuide(false);
    } else {
      toast({
        title: "Ofullständiga uppgifter",
        description: "Vänligen fyll i alla fält.",
        variant: "destructive",
      });
    }
  };

  if (!showGuide) return null;

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>E-postinställningar</CardTitle>
        <CardDescription>
          Ställ in EmailJS för att skicka bokningsbekräftelser till din e-post.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="serviceId">EmailJS Service ID</Label>
          <Input
            id="serviceId"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            placeholder="Ex: service_abc123"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="templateId">EmailJS Template ID</Label>
          <Input
            id="templateId"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            placeholder="Ex: template_xyz789"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userId">EmailJS User ID (Public Key)</Label>
          <Input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ex: user_eYg1w5fxKQcavNRIGa7Ou"
          />
        </div>
        <div className="text-sm text-muted-foreground mt-4">
          <p>För att konfigurera EmailJS:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Skapa ett konto på <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline">EmailJS.com</a></li>
            <li>Skapa en Service och anslut din e-post</li>
            <li>Skapa en Template för bokningsförfrågningar</li>
            <li>Kopiera dina Service ID, Template ID och User ID här</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowGuide(false)}>
          Avbryt
        </Button>
        <Button onClick={handleSave}>
          Spara inställningar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailSetupGuide;
