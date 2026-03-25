export interface Photographer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  photoCount: number;
  joined: string;
  verified: boolean;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  photographerId: string;
  photographerName: string;
  photographerAvatar: string;
  image: string;
  likes: number;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  image: string;
}

const placeholderImg = (seed: string, w = 600, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const photographers: Photographer[] = [
  { id: "1", name: "Aria Chen", username: "ariachen", avatar: placeholderImg("aria", 200, 200), bio: "Maternity and portrait photographer specializing in artistic belly photography.", rating: 4.9, reviewCount: 142, photoCount: 87, joined: "2024", verified: true },
  { id: "2", name: "Marcus Webb", username: "marcuswebb", avatar: placeholderImg("marcus", 200, 200), bio: "Fine art body photographer with 10+ years of experience.", rating: 4.8, reviewCount: 98, photoCount: 64, joined: "2024", verified: true },
  { id: "3", name: "Luna Reyes", username: "lunareyes", avatar: placeholderImg("luna", 200, 200), bio: "Capturing the beauty of life's most precious moments.", rating: 4.7, reviewCount: 76, photoCount: 53, joined: "2025", verified: true },
  { id: "4", name: "James Okafor", username: "jamesokafor", avatar: placeholderImg("james", 200, 200), bio: "Studio and natural light belly photography artist.", rating: 4.9, reviewCount: 201, photoCount: 112, joined: "2024", verified: true },
  { id: "5", name: "Sophie Laurent", username: "sophielaurent", avatar: placeholderImg("sophie", 200, 200), bio: "Parisian photographer bringing elegance to every shot.", rating: 4.6, reviewCount: 54, photoCount: 38, joined: "2025", verified: false },
  { id: "6", name: "Dev Patel", username: "devpatel", avatar: placeholderImg("dev", 200, 200), bio: "Documentary-style photographer focused on authentic moments.", rating: 4.8, reviewCount: 89, photoCount: 71, joined: "2024", verified: true },
];

export const categories: Category[] = [
  { id: "flat", name: "Flat", description: "Smooth and toned flat belly photography", count: 312, image: placeholderImg("flat", 600, 400) },
  { id: "abs", name: "Abs", description: "Chiseled six-pack and ab definition shots", count: 287, image: placeholderImg("abs", 600, 400) },
  { id: "big", name: "Big", description: "Beautiful big belly photography", count: 198, image: placeholderImg("big", 600, 400) },
  { id: "round", name: "Round", description: "Perfectly round and full belly portraits", count: 245, image: placeholderImg("round", 600, 400) },
  { id: "hairy", name: "Hairy", description: "Natural hairy belly photography", count: 134, image: placeholderImg("hairy", 600, 400) },
  { id: "outie", name: "Outie", description: "Unique outie belly button photography", count: 167, image: placeholderImg("outie", 600, 400) },
  { id: "innie", name: "Innie", description: "Classic innie belly button close-ups", count: 223, image: placeholderImg("innie", 600, 400) },
  { id: "tattooed", name: "Tattooed", description: "Ink and art on belly photography", count: 176, image: placeholderImg("tattooed", 600, 400) },
  { id: "dad-bod", name: "Dad Bod", description: "Embracing the dad bod belly look", count: 189, image: placeholderImg("dadbod", 600, 400) },
  { id: "beer-belly", name: "Beer Belly", description: "Proud beer belly photography", count: 143, image: placeholderImg("beerbelly", 600, 400) },
  { id: "skinny", name: "Skinny", description: "Slim and slender belly portraits", count: 201, image: placeholderImg("skinny", 600, 400) },
  { id: "pierced", name: "Pierced", description: "Belly button piercings and jewelry shots", count: 156, image: placeholderImg("pierced", 600, 400) },
];

export const photos: Photo[] = [
  { id: "p1", title: "Golden Hour Glow", description: "Warm golden light on a toned flat belly", category: "flat", price: 15, photographerId: "1", photographerName: "Aria Chen", photographerAvatar: placeholderImg("aria", 200, 200), image: placeholderImg("golden", 600, 800), likes: 342, featured: true },
  { id: "p2", title: "Sculpted Light", description: "Dramatic studio lighting on chiseled abs", category: "abs", price: 12, photographerId: "2", photographerName: "Marcus Webb", photographerAvatar: placeholderImg("marcus", 200, 200), image: placeholderImg("sculpted", 600, 800), likes: 287, featured: true },
  { id: "p3", title: "Full & Proud", description: "Beautiful big belly portrait in natural light", category: "big", price: 20, photographerId: "3", photographerName: "Luna Reyes", photographerAvatar: placeholderImg("luna", 200, 200), image: placeholderImg("floral", 600, 800), likes: 198, featured: true },
  { id: "p4", title: "Ink Stories", description: "Detailed tattoo work across a belly canvas", category: "tattooed", price: 10, photographerId: "4", photographerName: "James Okafor", photographerAvatar: placeholderImg("james", 200, 200), image: placeholderImg("silhouette", 600, 800), likes: 456, featured: true },
  { id: "p5", title: "Natural Fuzz", description: "Embracing the natural hairy belly look", category: "hairy", price: 18, photographerId: "5", photographerName: "Sophie Laurent", photographerAvatar: placeholderImg("sophie", 200, 200), image: placeholderImg("natural", 600, 800), likes: 167, featured: false },
  { id: "p6", title: "The Perfect Outie", description: "Close-up portrait of a unique outie belly button", category: "outie", price: 25, photographerId: "6", photographerName: "Dev Patel", photographerAvatar: placeholderImg("dev", 200, 200), image: placeholderImg("elegance", 600, 800), likes: 312, featured: true },
  { id: "p7", title: "Round & Beautiful", description: "Perfectly round belly in soft studio light", category: "round", price: 22, photographerId: "1", photographerName: "Aria Chen", photographerAvatar: placeholderImg("aria", 200, 200), image: placeholderImg("moonlit", 600, 800), likes: 234, featured: false },
  { id: "p8", title: "Six Pack Sunday", description: "Peak ab definition fitness photography", category: "abs", price: 14, photographerId: "2", photographerName: "Marcus Webb", photographerAvatar: placeholderImg("marcus", 200, 200), image: placeholderImg("strength", 600, 800), likes: 189, featured: false },
  { id: "p9", title: "Dad Bod Energy", description: "Confident dad bod belly portrait", category: "dad-bod", price: 16, photographerId: "3", photographerName: "Luna Reyes", photographerAvatar: placeholderImg("luna", 200, 200), image: placeholderImg("expecting", 600, 800), likes: 278, featured: true },
  { id: "p10", title: "Sparkle & Shine", description: "Belly button piercing jewelry close-up", category: "pierced", price: 30, photographerId: "4", photographerName: "James Okafor", photographerAvatar: placeholderImg("james", 200, 200), image: placeholderImg("abstract", 600, 800), likes: 401, featured: false },
  { id: "p11", title: "Slim Silhouette", description: "Elegant skinny belly portrait at sunset", category: "skinny", price: 28, photographerId: "5", photographerName: "Sophie Laurent", photographerAvatar: placeholderImg("sophie", 200, 200), image: placeholderImg("paradise", 600, 800), likes: 156, featured: false },
  { id: "p12", title: "Cheers to That", description: "Proud beer belly in classic portrait style", category: "beer-belly", price: 20, photographerId: "6", photographerName: "Dev Patel", photographerAvatar: placeholderImg("dev", 200, 200), image: placeholderImg("classic", 600, 800), likes: 345, featured: true },
  { id: "p13", title: "Deep Innie", description: "Perfectly shaped innie belly button macro shot", category: "innie", price: 15, photographerId: "1", photographerName: "Aria Chen", photographerAvatar: placeholderImg("aria", 200, 200), image: placeholderImg("deepinnie", 600, 800), likes: 289, featured: true },
  { id: "p14", title: "Flat Perfection", description: "Impossibly flat belly in morning light", category: "flat", price: 18, photographerId: "2", photographerName: "Marcus Webb", photographerAvatar: placeholderImg("marcus", 200, 200), image: placeholderImg("flatperf", 600, 800), likes: 334, featured: false },
  { id: "p15", title: "Bear Mode", description: "Big hairy belly in all its glory", category: "hairy", price: 12, photographerId: "4", photographerName: "James Okafor", photographerAvatar: placeholderImg("james", 200, 200), image: placeholderImg("bearmode", 600, 800), likes: 211, featured: true },
  { id: "p16", title: "Belly Art", description: "Colorful tattoo sleeve wrapping around the belly", category: "tattooed", price: 22, photographerId: "3", photographerName: "Luna Reyes", photographerAvatar: placeholderImg("luna", 200, 200), image: placeholderImg("bellyart", 600, 800), likes: 378, featured: false },
];

export function getPhotographer(id: string) {
  return photographers.find((p) => p.id === id);
}

export function getPhotosByPhotographer(id: string) {
  return photos.filter((p) => p.photographerId === id);
}

export function getPhoto(id: string) {
  return photos.find((p) => p.id === id);
}

export function getFeaturedPhotos() {
  return photos.filter((p) => p.featured);
}
