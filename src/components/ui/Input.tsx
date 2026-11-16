
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// function Input({
//   label,
//   error,
//   id,
//   className = "",
//   ...rest
// }: InputProps) {
//   return (
//     <div className="flex items-end gap-3 mb-3">
//       <label
//         htmlFor={id}
//         className="min-w-0 flex-1 text-sm font-medium text-slate-700 dark:text-slate-200"
//       >
//         {label}
//       </label>

//       <input
//         id={id}
//         className={`
//           w-full rounded-md border px-3 py-2 text-sm
//           bg-white text-slate-900
//           dark:bg-slate-800 dark:text-white
//           ${error ? "border-red-500" : "border-slate-300 dark:border-slate-600"}
//           ${className}
//         `}
//         aria-invalid={Boolean(error)}
//         aria-describedby={error ? `${id}-error` : undefined}
//         {...rest}
//       />

//       {error && (
//         <p
//           id={`${id}-error`}
//           className="text-xs text-red-500"
//         >
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }


function Input({
  label,
  error,
  id,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-1 min-w-0 flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={id}
        className={`
          w-full rounded-md border px-3 py-2 text-sm
          bg-white text-slate-900
          dark:bg-slate-800 dark:text-white
          ${error ? "border-red-500" : "border-slate-300 dark:border-slate-600"}
          ${className}
        `}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
export default Input;
