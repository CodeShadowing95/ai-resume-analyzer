import type { Route } from "./+types/home";
import { Navbar, ResumeCard } from "~/components";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { FileUser, Upload } from "lucide-react";

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
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumesList = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumesList?.map((resume) => JSON.parse(resume.value));

      console.log("Parsed resumes:", parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Le <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Cheat-code</span> infaillible pour passer tous les ATS recruteurs</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>Vous n'avez pas encore de CVs enregistrés. Uploadez votre 1er CV pour obtenez des feedbacks détaillés.</h2>
          ) : (
            <h2>Obtenez un score ATS et des recommandations personnalisées pour maximiser vos chances d'entretien.</h2>
          )
        }
        </div>

        {loadingResumes && (
          <div className="flex flex-col justify-center items-center">
            <img src="/images/resume-scan-2.gif" alt="Loading" className="w-64" />
            <p className="text-gray-500">Chargement des CVs...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-6">
            <img 
              src="/images/no-resumes.svg" 
              alt="No resumes found" 
              className="h-80 opacity-80"
            />
            <p className="text-gray-600 text-lg text-center max-w-md">
              Commencez par télécharger votre CV pour obtenir une analyse détaillée et des recommandations personnalisées.
            </p>
            <button 
              className="primary-button w-fit font-semibold"
              onClick={() => navigate('/upload')}
            >
              <Upload className="mr-2" />
              J'upload mon CV
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
