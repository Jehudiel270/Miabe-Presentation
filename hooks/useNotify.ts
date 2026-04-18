"use client";

import { toast } from "sonner";

/**
 * useNotify — semantic toast helpers.
 *
 * import { useNotify } from "@/hooks/useNotify";
 * const notify = useNotify();
 * notify.success("Cours terminé !");
 * notify.promise(fetchData(), { loading: "...", success: "OK", error: "Erreur" });
 */
export function useNotify() {
  return {
    success:  (title: string, description?: string) => toast.success(title, { description }),
    error:    (title: string, description?: string) => toast.error(title, { description }),
    warning:  (title: string, description?: string) => toast.warning(title, { description }),
    info:     (title: string, description?: string) => toast.info(title, { description }),
    loading:  (title: string, description?: string) => toast.loading(title, { description }),
    promise:  <T,>(promise: Promise<T>, msgs: { loading: string; success: string; error: string }) =>
      toast.promise(promise, msgs),
    dismiss:  (id?: string | number) => toast.dismiss(id),
  };
}
