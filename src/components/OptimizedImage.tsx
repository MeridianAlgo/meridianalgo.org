import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23333"%3E%3C/rect%3E%3C/svg%3E'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.01,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && loading === 'lazy') {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
    } else if (loading === 'eager') {
      setImageSrc(src);
      setImageLoaded(true);
    }
  }, [isIntersecting, src, loading]);

  return (
    <div ref={targetRef as React.RefObject<HTMLDivElement>} className="relative">
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'skeleton' : 'animate-fadeIn'} transition-opacity duration-500`}
        loading={loading}
      />
    </div>
  );
};

export default OptimizedImage;
