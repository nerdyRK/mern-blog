import React, { useRef, useEffect } from "react";

const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imgRef.current.src = src;
          observer.unobserve(imgRef.current);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src="placeholder.jpg" // Replace with your actual placeholder image
      alt={alt}
      className={className} // Apply the className passed as props
      loading="lazy"
    />
  );
};

export default LazyImage;
