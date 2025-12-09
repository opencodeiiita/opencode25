import { cn } from '@/lib/utils';
import * as React from 'react';

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-[#9B87FE] text-black hover:bg-[#8A76ED] active:scale-95',
      outline: 'border-2 border-[#9B87FE] text-white hover:bg-[#9B87FE]/10',
      ghost: 'hover:bg-white/10',
    };

    const sizes = {
      default: 'h-11 px-8 py-2',
      sm: 'h-9 px-4',
      lg: 'h-12 px-10',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
