import FeaturesSection from "@/components/accueil/features/FeaturesSection";
import Footer from "@/components/ui/footer";

export default function FeaturesPage() {
  return (
    <div>
      <FeaturesSection />

      {/* CTA */}
      <div className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">
          Rejoignez la révolution de l’épargne sécurisée
        </h2>

        <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
          TontineChain transforme les tontines traditionnelles en un système
          fiable, transparent et automatisé grâce à la blockchain. Sécurisez vos
          contributions, éliminez les risques liés au manque de confiance et
          accédez à une nouvelle génération d’épargne collective.
        </p>

        <button className="btn btn-primary mt-6">
          Créer une tontine sécurisée
        </button>
      </div>

      <Footer />
    </div>
  );
}
