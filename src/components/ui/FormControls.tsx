import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
// --- BUTTON ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className = '',
  variant = 'primary',
  isLoading,
  size = 'md',
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  const variants = {
    primary: 'bg-[#f97316] text-white hover:bg-[#ea580c] border border-transparent shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)]',
    secondary: 'bg-[#1a1a1a] text-white border border-[#333333] hover:bg-[#222222] hover:border-[#444444] shadow-sm',
    outline: 'bg-transparent text-white border border-[#333333] hover:border-[#f97316] hover:text-[#f97316]',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40',
    ghost: 'bg-transparent text-[#888888] hover:text-white hover:bg-[#111111]'
  };
  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-full',
    md: 'text-sm px-5 py-2.5 rounded-full',
    lg: 'text-base px-8 py-3.5 rounded-full'
  };
  return <button ref={ref} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || isLoading} {...props}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>;
});
Button.displayName = 'Button';
// --- INPUT ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  id,
  ...props
}, ref) => {
  return <div className="w-full group">
        {label && <label htmlFor={id} className="block text-xs font-semibold text-[#888888] mb-1.5 uppercase tracking-wider group-focus-within:text-[#f97316] transition-colors">
            {label}
          </label>}
        <input ref={ref} id={id} className={`w-full bg-[#0a0a0a] border ${error ? 'border-red-500/50' : 'border-[#222222]'} text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all duration-200 placeholder-[#444444] disabled:opacity-50 disabled:bg-[#111111] ${className}`} {...props} />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>;
});
Input.displayName = 'Input';
// --- TEXTAREA ---
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className = '',
  label,
  error,
  id,
  ...props
}, ref) => {
  return <div className="w-full group">
        {label && <label htmlFor={id} className="block text-xs font-semibold text-[#888888] mb-1.5 uppercase tracking-wider group-focus-within:text-[#f97316] transition-colors">
            {label}
          </label>}
        <textarea ref={ref} id={id} className={`w-full bg-[#0a0a0a] border ${error ? 'border-red-500/50' : 'border-[#222222]'} text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all duration-200 placeholder-[#444444] disabled:opacity-50 min-h-[100px] ${className}`} {...props} />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>;
});
Textarea.displayName = 'Textarea';
// --- SELECT ---
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className = '',
  label,
  error,
  id,
  options,
  ...props
}, ref) => {
  return <div className="w-full group">
        {label && <label htmlFor={id} className="block text-xs font-semibold text-[#888888] mb-1.5 uppercase tracking-wider group-focus-within:text-[#f97316] transition-colors">
            {label}
          </label>}
        <div className="relative">
          <select ref={ref} id={id} className={`w-full bg-[#0a0a0a] border ${error ? 'border-red-500/50' : 'border-[#222222]'} text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all duration-200 disabled:opacity-50 appearance-none ${className}`} {...props}>
            {options.map((opt) => <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#666666]">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>;
});
Select.displayName = 'Select';