import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        'bg-gradient-to-r from-[#9B87FE] to-[#8A76ED] text-black hover:shadow-lg hover:shadow-[#9B87FE]/50 active:scale-95',
      outline:
        'border-2 border-[#9B87FE] text-white hover:bg-[#9B87FE]/10 hover:border-[#8A76ED]',
      ghost: 'hover:bg-white/10 text-white',
    };

    const sizes = {
      default: 'h-12 px-8 py-3 text-base',
      sm: 'h-9 px-5 py-2 text-sm',
      lg: 'h-14 px-10 py-4 text-lg',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1843]',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
