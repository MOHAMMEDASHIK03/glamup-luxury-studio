import bridal from "@/assets/bridal.jpg";
import glam from "@/assets/glam.jpg";
import hair from "@/assets/hair.jpg";
import hero from "@/assets/hero.jpg";

export type Service = {
  slug: string;
  name: string;
  category: "Makeup" | "Hairstyling";
  price: number;
  description: string;
  image: string;
};

export const services: Service[] = [
  { slug: "simple-makeup", name: "Simple Makeup", category: "Makeup", price: 80, description: "Effortlessly fresh, everyday glam — perfect for brunches, events and date nights.", image: glam },
  { slug: "bridal-makeup", name: "Bridal Makeup", category: "Makeup", price: 350, description: "Long-wear, photo-ready bridal artistry tailored to your features and outfit.", image: bridal },
  { slug: "hd-makeup", name: "HD Makeup", category: "Makeup", price: 220, description: "High-definition, airbrush-smooth finish made for cameras and lights.", image: hero },
  { slug: "glossy-makeup", name: "Glossy Makeup", category: "Makeup", price: 180, description: "Dewy skin, glossy lips and luminous highlights for a soft modern look.", image: glam },
  { slug: "soft-glam-makeup", name: "Soft Glam Makeup", category: "Makeup", price: 200, description: "Romantic soft-glam with shimmery eyes and a perfected complexion.", image: hero },
  { slug: "soft-curls", name: "Soft Curls", category: "Hairstyling", price: 70, description: "Voluminous, bouncy curls with a luxe red-carpet finish.", image: hair },
  { slug: "straightening", name: "Hair Straightening", category: "Hairstyling", price: 90, description: "Sleek, glassy straight hair that holds beautifully all evening.", image: hair },
  { slug: "bridal-hairstyle", name: "Bridal Hairstyle", category: "Hairstyling", price: 250, description: "Intricate bridal hair design — updos, braids and accessory styling.", image: hair },
  { slug: "hair-updo", name: "Hair Updo", category: "Hairstyling", price: 120, description: "Elegant updos for cocktails, weddings and special occasions.", image: hair },
];

export const WHATSAPP_NUMBER = "61481308396";
export const buildWhatsAppLink = (service?: string) => {
  const msg = service
    ? `Hello Glamupbykirthi, I would like to book ${service} service.`
    : `Hello Glamupbykirthi, I would like to enquire about your services.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
