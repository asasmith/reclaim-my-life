import Image from 'next/image';
import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from '@/lib/sanity/client';
import type { SanityImage as SanityImageType } from '@/lib/sanity/types';

const builder = createImageUrlBuilder(client);

type Props = {
  image: SanityImageType;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export default function SanityImage({
  image,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  sizes,
  fill = false,
}: Props) {
  // Return null if no image asset
  if (!image?.asset) {
    return null;
  }

  // Build optimized image URL
  const imageUrl = builder
    .image(image.asset)
    .auto('format') // Auto WebP/AVIF based on browser support
    .fit('crop') // Respect hotspot from Studio
    .url();

  // Handle fill mode (for responsive containers)
  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={image.alt || ''}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  // Standard sized image
  return (
    <Image
      src={imageUrl}
      alt={image.alt || ''}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
