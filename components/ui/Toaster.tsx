"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toaster DaisyUI-aware.
 * À placer UNE SEULE FOIS dans app/layout.tsx  →  <Toaster />
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:        "!bg-base-100 !text-base-content !border !border-base-300 !shadow-lg !rounded-xl",
          title:        "!text-base-content !font-semibold !text-sm",
          description:  "!text-base-content/60 !text-xs",
          closeButton:  "!bg-base-200 !text-base-content/60 hover:!bg-base-300 !border-base-300",
          success:      "!border-l-4 !border-l-success",
          error:        "!border-l-4 !border-l-error",
          warning:      "!border-l-4 !border-l-warning",
          info:         "!border-l-4 !border-l-info",
          loading:      "!border-l-4 !border-l-primary",
        },
      }}
    />
  );
}
