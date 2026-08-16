import React from 'react';
import { IMAGES } from '../assets/imagesData';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const iconHeights = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Emblem Graphic Render with Embedded Base64 Data URI */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={IMAGES.logo}
          alt="Vegas TaskCraft Emblem"
          className={`${iconHeights[size]} w-auto object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]`}
        />
      </div>

      {showText && (
        <div>
          <span className="font-display font-black tracking-tight text-white block leading-none text-lg sm:text-xl">
            VEGAS TASKCRAFT
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mt-0.5">
            RESIDENTIAL DECOR AND SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};
