import { FileScan, WandSparkles } from "lucide-react";
import { useState } from "react";
import { FileUploader, Navbar } from "~/components"

export const meta = () => ([
  { title: "Analyseur de CV IA - Upload et Analyse ATS | Curriqulum.ai" },
  { description: "Uploadez votre CV et obtenez instantanément un score ATS détaillé, des recommandations personnalisées et des conseils d'optimisation pour maximiser vos chances d'entretien. Analyse IA gratuite et rapide." },
  { keywords: "upload CV, analyse ATS, score CV, optimisation CV, recommandations CV, analyse IA, entretien d'embauche, candidature, recrutement, ATS optimization" },

  // Open Graph / Facebook
  { property: "og:title", content: "Analyseur de CV IA - Upload et Analyse ATS Instantanée" },
  { property: "og:description", content: "Uploadez votre CV et découvrez comment l'optimiser pour passer les filtres ATS. Score détaillé, recommandations personnalisées et conseils d'experts en quelques secondes." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://curriqulum.ai/upload" },
  { property: "og:image", content: "https://curriqulum.ai/images/resume-scan.gif" },
  { property: "og:image:alt", content: "Interface d'analyse de CV par intelligence artificielle" },
  { property: "og:site_name", content: "Curriqulum.ai" },
  { property: "og:locale", content: "fr_FR" },

  // Twitter Card
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Analyseur de CV IA - Upload et Analyse ATS" },
  { name: "twitter:description", content: "Uploadez votre CV et obtenez un score ATS détaillé avec des recommandations personnalisées. Analyse IA gratuite et instantanée." },
  { name: "twitter:image", content: "https://curriqulum.ai/images/resume-scan.gif" },
  { name: "twitter:image:alt", content: "Analyse de CV par intelligence artificielle" },
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
  { rel: "canonical", href: "https://curriqulum.ai/upload" },

  // Additional meta for better indexing
  { name: "rating", content: "general" },
  { name: "distribution", content: "global" },
  { name: "coverage", content: "worldwide" },
  { name: "target", content: "all" },
  { name: "HandheldFriendly", content: "true" },
  { name: "MobileOptimized", content: "width" },
  { name: "viewport", content: "width=device-width, initial-scale=1.0" },
])

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");

    if(!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if(!companyName || !jobTitle || !jobDescription || !file) return;

    console.log({
      companyName,
      jobTitle,
      jobDescription,
      file,
    })
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Votre CV, Notre Expertise</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" alt="resume scan" className="w-full" />
            </>
          ) : (
            <h2>Upload votre CV et obtenez un score ATS et des recommandations personnalisées pour maximiser vos chances d'entretien.</h2>
          )}

          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Nom de l'entreprise</label>
                <input type="text" id="company-name" placeholder="Entreprise dans laquelle vous postulez" name="company-name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Titre du poste</label>
                <input type="text" id="job-title" placeholder="Poste auquel vous postulez" name="job-title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Description du poste</label>
                <textarea rows={5} id="job-description" placeholder="Description détaillée du poste" name="job-description"></textarea>
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Uploadez votre CV</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button type="submit" className="primary-button">
                <WandSparkles className="mr-2" />
                Analyse magique
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Upload