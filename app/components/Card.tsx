import Image from "next/image";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  price?: number | string;
  button?: ReactNode;
  children?: ReactNode;
  overlayButton?: boolean; 
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  price,
  button,
  children,
  overlayButton = false,
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg flex flex-col ${className}`}
    >
      {image && (
        <div className="relative w-full">
          <Image
            src={image}
            alt={title || "Card Image"}
            width={300}
            height={200}
            className="w-full h-auto object-cover rounded-xl"
          />
          {overlayButton && button && (
            <div className="absolute bottom-[-20] left-1/2 transform -translate-x-1/2">
              {button}
            </div>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col justify-between flex-1">
        {title && <h3 className="font-semibold text-lg">{title}</h3>}
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        {price !== undefined && (
          <p className="mt-2 font-bold text-red-600">$ {price}</p>
        )}
        {!overlayButton && button && <div className="mt-4">{button}</div>}
        {children}
      </div>
    </div>
  );
};
