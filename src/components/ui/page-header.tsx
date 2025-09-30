// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";

const headingVariants = cva(
  "font-semibold leading-tight tracking-tighter lg:leading-[1.1] text-gray-700",
  {
    variants: {
      size: {
        default: "text-xl md:text-2xl",
        sm: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function PageHeaderHeading({
  className,
  size,
  as: Comp = "h1",
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
}

export { PageHeaderHeading };
