import { AppLogo } from "@/components/layout/app-logo";

// Shared shell for sign-in, sign-up and password reset pages.
// The (auth) route group keeps this layout out of the URL.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse at 0% 35%, #bcd5ef 0%, transparent 55%)",
            "radial-gradient(ellipse at 100% 0%, #e5dcf7 0%, transparent 55%)",
            "radial-gradient(ellipse at 95% 100%, #d8f0e5 0%, transparent 50%)",
            "#ebe8f6",
          ].join(", "),
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgb(100 116 139 / 0.2) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="w-full max-w-[400px]">
        <AppLogo className="mb-6 justify-center" />
        {children}
      </div>
    </main>
  );
}
