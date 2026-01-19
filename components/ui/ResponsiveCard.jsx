import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ResponsiveCard() {
  return (
    <Card className="
      p-6
      bg-white 
      mobile:bg-blue-100 
      tablet:bg-green-100 
      laptop:bg-yellow-100
    ">
      <CardHeader>
        <CardTitle className="
          text-xl
          mobile:text-2xl
          tablet:text-3xl
          laptop:text-4xl
        ">
          Responsive Component
        </CardTitle>
      </CardHeader>
      <CardContent className="
        text-base
        mobile:text-lg
        tablet:text-xl
        laptop:text-2xl
      ">
        Resize the screen to see the background and text size change at:
        425px, 768px, and 1024px breakpoints.
      </CardContent>
    </Card>
  );
}
