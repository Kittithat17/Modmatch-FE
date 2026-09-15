import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const authLinkClassName =
  "font-medium text-primary underline-offset-4 hover:underline";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="gap-6 py-8 shadow-[0_8px_30px_rgb(15_23_42/0.06)] ring-foreground/5">
      <CardHeader className="px-8 text-center">
        <CardTitle className="text-xl font-bold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-8">
        {children}
        {footer && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
