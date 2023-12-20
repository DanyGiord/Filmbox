import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
  } from "@/components/ui/tooltip";
  
  interface ActionTooltipProps {
      label: string;
      children: React.ReactNode;
      side?: 'top' | 'right' | 'bottom' | 'left';
      align?: 'start' | 'center' | 'end';
  }
  
  export const ActionTooltip = ({
      label,
      children,
      side,
      align,
  }: ActionTooltipProps) => {
      return (
          <TooltipProvider>
              <Tooltip delayDuration={50}>
                  <TooltipTrigger asChild>
                      {children}
                  </TooltipTrigger>
                  <TooltipContent side={side} align={align} className="z-[99999999]">
                      <p className="font-semibold text-sm capitalize">
                          {label.toLowerCase()}
                      </p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
      )
  }