'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function PremiosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    { src: "/imagenes/1.png", alt: "Kit Gamer completo - Vista general" },
    { src: "/imagenes/2.png", alt: "Teclado mecánico RGB" },
    { src: "/imagenes/3.png", alt: "Mouse gaming óptico" },
    { src: "/imagenes/4.png", alt: "Audífonos gaming premium" },
    { src: "/imagenes/5.png", alt: "Kit 4-en-1 empacado" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          🏆 Premio Principal
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Kit Gamer 4-en-1 Lobo del Trueno TF800
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Kit gaming profesional completo con teclado mecánico, mouse óptico, audífonos premium y mousepad antideslizante
        </p>
      </div>

      {/* Galería de Imágenes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📸</span>
            Galería del Premio
          </CardTitle>
          <p className="text-muted-foreground">Haz clic en cualquier imagen para verla en grande</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium">
                        🔍 Ver imagen completa
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Especificaciones Técnicas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Especificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>⚡</span>
              Especificaciones Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Teclado */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>⌨️</span>
                Teclado Mecánico
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li>• Switches Cherry MX Red (104 teclas)</li>
                <li>• Layout español QWERTY con letra Ñ</li>
                <li>• Iluminación RGBW personalizable</li>
                <li>• Cable USB-C desmontable</li>
                <li>• Estructura de aluminio premium</li>
              </ul>
            </div>

            {/* Mouse */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>🖱️</span>
                Mouse Gaming Óptico
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li>• Sensor PixArt 3360 de alta precisión</li>
                <li>• Resolución 1,200 DPI ajustable</li>
                <li>• 6 botones programables</li>
                <li>• Iluminación RGB sincronizada</li>
                <li>• Ergonomía para uso prolongado</li>
              </ul>
            </div>

            {/* Audífonos */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>🎧</span>
                Audífonos Gaming
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li>• Drivers de 50mm para audio premium</li>
                <li>• Micrófono con cancelación de ruido</li>
                <li>• Cable trenzado de 210cm</li>
                <li>• Almohadillas cómodas de espuma</li>
                <li>• Compatible con PC, consolas y móviles</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Compatibilidad y Extras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎮</span>
              Compatibilidad y Extras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Compatibilidad */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Plataformas Compatibles</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>💻</span>
                  <span className="text-sm">PC Windows</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>🍎</span>
                  <span className="text-sm">Mac</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>🎮</span>
                  <span className="text-sm">PS4 / PS5</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>🎯</span>
                  <span className="text-sm">Xbox</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>🎲</span>
                  <span className="text-sm">Steam Deck</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span>📱</span>
                  <span className="text-sm">Móviles</span>
                </div>
              </div>
            </div>

            {/* Extras incluidos */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Extras Incluidos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Mousepad antideslizante de calidad premium</li>
                <li>✅ Software de personalización RGB</li>
                <li>✅ Repuestos para switches del teclado</li>
                <li>✅ Cable USB adicional para el mouse</li>
                <li>✅ Guía de configuración en español</li>
                <li>✅ Garantía de 2 años del fabricante</li>
              </ul>
            </div>

            {/* Resistencia */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                💧 Resistente al Agua
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                El teclado incluye sistema de drenaje que protege contra derrames accidentales
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              ¿Te gusta lo que ves?
            </h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 max-w-2xl mx-auto">
              Este increíble kit gaming podría ser tuyo. Cada boleto que compres también ayuda al equipo Siera Code a llegar al HackaTec Nacional 2025.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/comprar">
                🎫 Comprar mi boleto ahora
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/transparencia">
                👀 Ver transparencia
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <span className="font-semibold">Sorteo:</span> 21 de noviembre de 2025 a las 8:00 PM • 
              <span className="font-semibold"> Precio:</span> $30 MXN por boleto
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}