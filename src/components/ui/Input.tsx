import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export default function Input({ label, hint, className = "", ...props }: Props) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-semibold text-gray-900">{label}</span> : null}
      <input
        className={[
          "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3",
          "outline-none transition focus:border-gray-300 focus:ring-2 focus:ring-black/5",
          className,
        ].join(" ")}
        {...props}
      />
      {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
    </label>
  );
}
