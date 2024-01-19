import { ReactNode } from "react";

export const headingHelper = (headerText: string, icon: ReactNode) => {
  return (
    <span className="flex gap-4 items-center justify-between">
      {icon}
      {headerText}
    </span>
  );
};
