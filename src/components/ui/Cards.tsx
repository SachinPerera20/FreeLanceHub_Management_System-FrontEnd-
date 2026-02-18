import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({
  children,
  className = '',
  onClick
}: CardProps) {
  return <div className={`
        bg-[#0a0a0a] 
        border border-[#222222] 
        rounded-xl p-6 
        shadow-sm 
        ${onClick ? 'cursor-pointer hover:border-[#444444] hover:bg-[#111111] transition-all duration-300' : ''} 
        ${className}
      `} onClick={onClick}>
      {children}
    </div>;
}
export function CardHeader({
  children,
  className = ''
}: CardProps) {
  return <div className={`mb-5 ${className}`}>{children}</div>;
}
export function CardTitle({
  children,
  className = ''
}: CardProps) {
  return <h3 className={`text-xl font-semibold text-white tracking-tight ${className}`}>
      {children}
    </h3>;
}
export function CardContent({
  children,
  className = ''
}: CardProps) {
  return <div className={className}>{children}</div>;
}
export function CardFooter({
  children,
  className = ''
}: CardProps) {
  return <div className={`mt-6 pt-5 border-t border-[#222222] flex items-center justify-between ${className}`}>
      {children}
    </div>;
}