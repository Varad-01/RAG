import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg transform hover:scale-105",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-xl transform hover:scale-105",
        outline:
          "border-2 border-teal-400 text-teal-600 transform hover:scale-105 hover:bg-teal-50",
        secondary:
          "bg-indigo-500 text-white transform hover:scale-105 hover:bg-indigo-600",
        ghost: "hover:bg-teal-100 text-teal-600 transform hover:scale-105",
        link: "text-teal-600 underline-offset-4 transform hover:underline hover:scale-105",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-8 px-4",
        lg: "h-16 px-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
