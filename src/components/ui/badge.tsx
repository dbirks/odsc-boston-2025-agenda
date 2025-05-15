import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600", // VIP
        secondary:
          "border-transparent bg-slate-400 text-white hover:bg-slate-500", // Silver
        destructive:
          "border-transparent bg-gradient-to-r from-indigo-700 to-purple-700 text-white hover:from-indigo-800 hover:to-purple-800", // Platinum
        gold:
          "border-amber-400 bg-amber-100 text-amber-800 hover:bg-amber-200", // Gold
        expo:
          "border-green-400 bg-green-100 text-green-800 hover:bg-green-200", // Expo
        bootcamp:
          "border-purple-400 bg-purple-100 text-purple-800 hover:bg-purple-200", // Bootcamp
        twoDayBusiness:
          "border-cyan-400 bg-cyan-100 text-cyan-800 hover:bg-cyan-200", // 2-Day Business
        threeDayBusiness:
          "border-indigo-400 bg-indigo-100 text-indigo-800 hover:bg-indigo-200", // 3-Day Business
        outline: "border-gray-300 text-gray-700 bg-white", // Default fallback
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