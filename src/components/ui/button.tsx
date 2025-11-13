import * as React from "react";
import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/35 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-md shadow-destructive/30",
        outline:
          "border-2 border-primary/70 bg-transparent text-primary hover:bg-primary/10 hover:text-primary hover:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground border border-input/40 hover:border-primary/60 hover:bg-secondary/80 shadow-sm",
        ghost:
          "text-foreground hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3 min-h-[44px]",
        sm: "h-10 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 min-h-[40px]",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4 min-h-[48px]",
        icon: "size-11 rounded-md min-w-[44px] min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const elRef = useRef<HTMLElement | null>(null);

  const { onClick, ...rest } = props as any;

  const handleClick = (e: React.MouseEvent) => {
    try {
      if (typeof onClick === "function") onClick(e);
    } catch (err) {
      // swallow handler errors to not break ripple
      console.error(err);
    }

    const el = elRef.current;
    if (!el || !(el instanceof HTMLElement)) return;

    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const sizePx = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.width = ripple.style.height = `${sizePx}px`;
    ripple.style.left = `${e.clientX - rect.left - sizePx / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - sizePx / 2}px`;
    el.appendChild(ripple);
    // remove after animation
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Comp
      ref={elRef as any}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...rest}
    />
  );
}

export { Button, buttonVariants };
