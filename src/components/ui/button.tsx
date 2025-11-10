import * as React from "react";
import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";
import {
  PRIMARY_BUTTON_CLASSES,
  SECONDARY_BUTTON_CLASSES,
} from "../../lib/buttonStyles";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: cn(PRIMARY_BUTTON_CLASSES, "font-semibold"),
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-md shadow-destructive/30",
        outline: cn(SECONDARY_BUTTON_CLASSES),
        secondary: cn(SECONDARY_BUTTON_CLASSES),
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
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
