"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email invalide";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error: signInError, data } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // Wait a bit to ensure session is stored
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/dashboard");
    } catch (_) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-3xl font-bold text-primary">LU</span>
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Connexion
          </h1>
          <p className="text-base-content/60">
            Retournez à votre apprentissage
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300/50">
          <form onSubmit={handleLogin} className="card-body space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="alert alert-error shadow-sm border-l-4 border-error">
                <AlertCircle size={20} />
                <div>
                  <h3 className="font-semibold">Erreur de connexion</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="form-control">
              <label className="label pb-2 pl-1">
                <span className="label-text font-semibold text-base-content">
                  Email
                </span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-base-content/40"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email)
                      setValidationErrors({
                        ...validationErrors,
                        email: undefined,
                      });
                  }}
                  placeholder="votre.email@exemple.com"
                  className={`input input-bordered pl-5 w-full focus:outline-none ${
                    validationErrors.email
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  disabled={loading}
                />
              </div>
              {validationErrors.email && (
                <label className="label pt-2 pb-0">
                  <span className="label-text-alt text-error">
                    {validationErrors.email}
                  </span>
                </label>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label pb-2 pl-1">
                <span className="label-text font-semibold text-base-content">
                  Mot de passe
                </span>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-base-content/40"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password)
                      setValidationErrors({
                        ...validationErrors,
                        password: undefined,
                      });
                  }}
                  placeholder="••••••••"
                  className={`input input-bordered pl-5 w-full focus:outline-none ${
                    validationErrors.password
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  disabled={loading}
                />
              </div>
              {validationErrors.password && (
                <label className="label pt-2 pb-0">
                  <span className="label-text-alt text-error">
                    {validationErrors.password}
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg font-semibold mt-6 gap-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>

            {/* Divider */}
            <div className="divider my-2">ou</div>

            {/* Sign up Link */}
            <div className="text-center">
              <p className="text-base-content/70">
                Pas encore de compte?{" "}
                <Link
                  href="/register"
                  className="link link-primary font-semibold hover:link-primary-focus"
                >
                  S'inscrire gratuitement
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-base-content/50 text-sm mt-6">
          Vos données sont sécurisées avec Supabase
        </p>
      </div>
    </div>
  );
}
