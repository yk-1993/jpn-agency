import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

export interface IconButtonProps extends ButtonProps {
  icon: LucideIcon;
  iconClassName?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, iconClassName, className, children, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn("gap-2", className)} {...props}>
        <Icon className={cn("h-5 w-5", iconClassName)} />
        {children}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export { IconButton };
