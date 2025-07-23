import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import { Navbar, ResumeCard } from "~/components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Curriqulum.ai | Analyseur de CV par Intelligence Artificielle" },
    { name: "description", content: "Optimisez votre CV avec notre analyseur IA. Évaluation ATS, recommandations personnalisées et score de compatibilité pour maximiser vos chances d'entretien. Analyse instantanée et conseils d'experts." },
    { name: "keywords", content: "analyseur CV, ATS, intelligence artificielle, optimisation CV, score CV, recrutement, carrière, emploi, analyse de CV" },
    { property: "og:title", content: "Curriqulum.ai | Votre CV Optimisé par l'IA" },
    { property: "og:description", content: "Analysez et optimisez votre CV avec l'IA pour augmenter vos chances d'entretien. Compatible avec tous les systèmes ATS." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Curriqulum.ai | Analyse de CV par IA" },
    { name: "twitter:description", content: "Transformez votre CV avec notre technologie d'analyse par IA. Obtenez un score ATS et des recommandations personnalisées." },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Suivez vos Candidatures et Notes sur votre CV</h1>
          <h2>Obtenez un score ATS et des recommandations personnalisées pour maximiser vos chances d'entretien.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
