import type { ReactNode } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

function Paragraph({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={overrideTailwindClasses(`text-gray-400 text-xl md:w-3/4 mt-5 par ${className}`)}
      {...props}
    >
      {children}
    </p>
  );
}

export default Paragraph;
