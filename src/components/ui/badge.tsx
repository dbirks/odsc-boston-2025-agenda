import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        secondary:
          "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        gold:
          "border-amber-400 bg-amber-100 text-amber-800 hover:bg-amber-200",
        outline: "border-gray-300 text-gray-700 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(clsx(badgeVariants({ variant }), className))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };