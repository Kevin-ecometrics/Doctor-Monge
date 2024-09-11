import React, { useEffect, useRef } from "react";

const FadeDownObserver = ({ children }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-safe:animate-fade-down");
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 transform translate-y-5 transition-opacity duration-1000 ease-in-out"
    >
      {children}
    </div>
  );
};

export default FadeDownObserver;
