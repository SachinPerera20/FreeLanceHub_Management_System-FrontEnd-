import React, { useEffect } from 'react';
import { X } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className={`
          relative w-full ${maxWidthClasses[maxWidth]} 
          bg-[#0a0a0a] border border-[#222222] 
          rounded-xl shadow-2xl 
          transform transition-all flex flex-col max-h-[90vh]
        `}>
        <div className="flex items-center justify-between p-6 border-b border-[#222222]">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            {title}
          </h3>
          <button onClick={onClose} className="text-[#666666] hover:text-white transition-colors focus:outline-none">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>;
}