import Image from 'next/image';

export default function AdvertisementBanner({ ad }: { ad: any }) {
  if (!ad) return null;

  const content = (
    <div className="relative w-full h-32 md:h-48 rounded-2xl overflow-hidden shadow-lg my-8 ring-1 ring-gray-900/5 group block">
      <Image 
        src={ad.image} 
        alt={ad.title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
        sizes="(max-width: 768px) 100vw, 800px" 
      />
      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-mono select-none">
        Advertisement
      </div>
    </div>
  );

  return ad.targetUrl ? (
    <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-2xl">
      {content}
    </a>
  ) : content;
}
