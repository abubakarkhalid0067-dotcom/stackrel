"use client";

export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.35]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
      }}
    />
  );
}
