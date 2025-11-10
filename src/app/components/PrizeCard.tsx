"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const gameIcons = {
  keyboard: "⌨️",
  mouse: "🖱️", 
  headphones: "🎧",
  mousepad: "📱",
  water: "💧",
  rgb: "🌈",
  compatibility: "⚡"
};

export default function PrizeCard({
  title = "Kit Gamer 4-en-1 Lobo del Trueno TF800",
  imageUrl = "/imagenes/5.png",
  description = "Kit gaming profesional 4-en-1 con teclado mecánico RGB, mouse óptico de alta precisión, audífonos gaming y mousepad antideslizante.",
  bullets = [
    { icon: "⌨️", text: "Teclado mecánico español QWERTY con switches Cherry MX Red" },
    { icon: "🖱️", text: "Mouse gaming óptico 1,200 DPI con sensor PixArt 3360" },
    { icon: "🎧", text: "Audífonos gaming con cable trenzado de 210cm" },
    { icon: "📱", text: "Mousepad antideslizante incluido" },
    { icon: "💧", text: "Resistente al agua con sistema de drenaje" },
    { icon: "🌈", text: "Iluminación RGBW en teclado y mouse" },
    { icon: "⚡", text: "Compatible con PC, Mac, PS4, PS5, Xbox, Steam Deck" }
  ],
}: {
  title?: string;
  imageUrl?: string;
  description?: string;
  bullets?: { icon: string; text: string }[];
} = {}) {
  return (
    <Card className="overflow-hidden">
      {/* Imagen */}
      <div className="relative aspect-4/3 bg-muted">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Ctext x='400' y='280' font-family='system-ui' font-size='24' fill='%2364748b' text-anchor='middle'%3EKit Gamer 4-en-1%3C/text%3E%3Ctext x='400' y='320' font-family='system-ui' font-size='16' fill='%2364748b' text-anchor='middle'%3EProfesional%3C/text%3E%3C/svg%3E";
          }}
        />
        <Badge className="absolute right-4 top-4 bg-green-500 hover:bg-green-500 text-white">
          ¡Premio!
        </Badge>
      </div>
      
      {/* Contenido */}
      <CardHeader className="pb-4">
        <CardTitle className="text-xl lg:text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Incluye:</h4>
          <div className="grid gap-3">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-3">
                <span className="text-lg leading-none shrink-0">{bullet.icon}</span>
                <span className="text-sm leading-relaxed">{bullet.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-sm font-medium text-primary">
            ¡Un premio increíble para el ganador afortunado!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}