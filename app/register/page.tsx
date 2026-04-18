"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertCircle, Loader, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email invalide";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Le mot de passe doit contenir au moins une majuscule";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Le mot de passe doit contenir au moins un chiffre";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirmez votre mot de passe";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Créer le profil utilisateur dans la table 'users'
      if (data.user?.id) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: email,
          name: email.split("@")[0],
        });

        if (profileError) {
          setError(
            "Profil créé mais erreur lors de la configuration : " +
              profileError.message,
          );
          return;
        }
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (_) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, color: "error", label: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, color: "error", label: "Faible" };
    if (strength <= 3) return { strength: 2, color: "warning", label: "Moyen" };
    return { strength: 3, color: "success", label: "Fort" };
  };

  const passwordStrength = getPasswordStrength();

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="card bg-base-100 shadow-2xl border border-base-300/50">
            <div className="card-body items-center text-center space-y-4">
              <div className="rounded-full bg-success/20 p-4">
                <CheckCircle className="text-success" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-success">
                Inscription réussie!
              </h2>
              <p className="text-base-content/70">
                Un email de confirmation a été envoyé. Veuillez vérifier votre
                boîte mail.
              </p>
              <p className="text-sm text-base-content/50">
                Redirection automatique vers la connexion...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-3xl font-bold text-primary">LU</span>
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-2">
            S&apos;inscrire
          </h1>
          <p className="text-base-content/60">
            Commencez votre apprentissage maintenant
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300/50">
          <form onSubmit={handleRegister} className="card-body space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="alert alert-error shadow-sm border-l-4 border-error">
                <AlertCircle size={20} />
                <div>
                  <h3 className="font-semibold">Erreur d&apos;inscription</h3>
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
                  className={`input input-bordered pl-5  w-full focus:outline-none ${
                    validationErrors.password
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  disabled={loading}
                />
              </div>
              {password && (
                <div className="mt-2 space-y-2">
                  {(() => {
                    const colors = ["error", "warning", "success"];
                    return (
                      <div className="flex gap-1">
                        {colors.map((color, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength.strength
                                ? `bg-${color}`
                                : "bg-base-300"
                            }`}
                          />
                        ))}
                      </div>
                    );
                  })()}
                  <p
                    className={
                      passwordStrength.color === "error"
                        ? "text-xs font-semibold text-error"
                        : passwordStrength.color === "warning"
                          ? "text-xs font-semibold text-warning"
                          : "text-xs font-semibold text-success"
                    }
                  >
                    Force: {passwordStrength.label}
                  </p>
                </div>
              )}
              {validationErrors.password && (
                <label className="label pt-2 pb-0">
                  <span className="label-text-alt text-error">
                    {validationErrors.password}
                  </span>
                </label>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="form-control">
              <label className="label pb-2 pl-1">
                <span className="label-text font-semibold text-base-content">
                  Confirmer le mot de passe
                </span>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-base-content/40"
                  size={20}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (validationErrors.confirmPassword)
                      setValidationErrors({
                        ...validationErrors,
                        confirmPassword: undefined,
                      });
                  }}
                  placeholder="••••••••"
                  className={`input input-bordered pl-5  w-full focus:outline-none ${
                    validationErrors.confirmPassword
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  disabled={loading}
                />
              </div>
              {validationErrors.confirmPassword && (
                <label className="label pt-2 pb-0">
                  <span className="label-text-alt text-error">
                    {validationErrors.confirmPassword}
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
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>

            {/* Divider */}
            <div className="divider my-2">ou</div>

            {/* Sign in Link */}
            <div className="text-center">
              <p className="text-base-content/70">
                Vous avez déjà un compte?{" "}
                <Link
                  href="/login"
                  className="link link-primary font-semibold hover:link-primary-focus"
                >
                  Se connecter
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
