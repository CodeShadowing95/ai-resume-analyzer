import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ATS, Details, Summary } from "~/components";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
  { title: "Résultats d'Analyse CV IA - Score ATS et Recommandations | Curriqulum.ai" },
  { description: "Découvrez votre score ATS détaillé, les recommandations personnalisées et les conseils d'optimisation pour votre CV. Analyse complète par intelligence artificielle avec suggestions d'amélioration." },
  { keywords: "résultats analyse CV, score ATS, recommandations CV, feedback CV, optimisation CV, conseils CV, rapport analyse IA, amélioration CV, entretien d'embauche" },

  // Open Graph / Facebook
  { property: "og:title", content: "Résultats d'Analyse CV IA - Score ATS et Recommandations Détaillées" },
  { property: "og:description", content: "Consultez votre score ATS, les points forts et axes d'amélioration de votre CV. Recommandations personnalisées par IA pour maximiser vos chances d'entretien." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://curriqulum.ai/resume" },
  { property: "og:image", content: "https://curriqulum.ai/images/resume-scan-2.gif" },
  { property: "og:image:alt", content: "Résultats d'analyse de CV par intelligence artificielle" },
  { property: "og:site_name", content: "Curriqulum.ai" },
  { property: "og:locale", content: "fr_FR" },

  // Twitter Card
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Résultats d'Analyse CV IA - Score ATS et Recommandations" },
  { name: "twitter:description", content: "Consultez votre score ATS détaillé et les recommandations personnalisées pour optimiser votre CV. Analyse IA complète et actionnable." },
  { name: "twitter:image", content: "https://curriqulum.ai/images/resume-scan-2.gif" },
  { name: "twitter:image:alt", content: "Résultats d'analyse de CV par intelligence artificielle" },
  { name: "twitter:site", content: "@CurriqulumAI" },
  { name: "twitter:creator", content: "@CurriqulumAI" },

  // Additional SEO meta tags
  { name: "robots", content: "index, follow" },
  { name: "googlebot", content: "index, follow" },
  { name: "author", content: "Curriqulum.ai" },
  { name: "language", content: "fr" },
  { name: "revisit-after", content: "7 days" },

  // Schema.org structured data
  { name: "application-name", content: "Curriqulum.ai" },
  { name: "msapplication-TileColor", content: "#2563eb" },
  { name: "theme-color", content: "#2563eb" },

  // Canonical URL
  { rel: "canonical", href: "https://curriqulum.ai/resume" },

  // Additional meta for better indexing
  { name: "rating", content: "general" },
  { name: "distribution", content: "global" },
  { name: "coverage", content: "worldwide" },
  { name: "target", content: "all" },
  { name: "HandheldFriendly", content: "true" },
  { name: "MobileOptimized", content: "width" },
  { name: "viewport", content: "width=device-width, initial-scale=1.0" },
])

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoading && !auth.isAuthenticated) navigate('/auth?next=/resume/' + id);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume: ${id}`);

      if(!resume) return console.error(`No resume found for id ${id}`);

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return console.error(`No resume found for id ${id}`);

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if(!imageBlob) return console.error(`No image found for id ${id}`);

      const image = new Blob([imageBlob], { type: "image/png" });
      setImageUrl(URL.createObjectURL(image));

      setFeedback(data.feedback);

      console.log({ imageUrl, resumeUrl, feedback: data.feedback });
      
    }

    loadResume();
  }, [id])

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">Retour à l'accueil</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            // <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt="image url" className="w-full h-full object-contain rounded-2xl" title="Résultats d'analyse de CV par intelligence artificielle" />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Résultats d'analyse du CV</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="resume scan" className="w-full" />
          )}
        </section>
      </div>
    </main>
  )
}

export default Resume