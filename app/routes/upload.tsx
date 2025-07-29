import { FileScan, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FileUploader, Navbar } from "~/components"
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

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
  const navigate = useNavigate();
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {
    setIsProcessing(true);
    setStatusText("Chargement du CV en cours...");

    const uploadedFile = await fs.upload([file]);
    if(!uploadedFile) return setStatusText("Une erreur s'est produite lors de l'upload du CV.");

    setStatusText("Conversion du CV en image...");

    const imageFile = await convertPdfToImage(file);
    if(!imageFile.file) return setStatusText("Une erreur s'est produite lors de la conversion du CV en image.");

    setStatusText("Chargement de l'image en cours...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if(!uploadedImage) return setStatusText("Une erreur s'est produite lors du chargement de l'image.");

    setStatusText("Collecte de données...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName, jobTitle, jobDescription,
      feedback: "",
    };
    await kv.set(`resume: ${uuid}`, JSON.stringify(data));

    setStatusText("Analyse en cours...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    )

    if(!feedback) return setStatusText("Une erreur s'est produite lors de l'analyse du CV.");

    const feedbackText = typeof feedback.message.content === "string"
    ? feedback.message.content
    : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume: ${uuid}`, JSON.stringify(data));
    setStatusText("Analyse termée. Redirection...");

    console.log(data);

    return navigate(`/resume/${uuid}`);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");

    if(!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if(!companyName || !jobTitle || !jobDescription || !file) return;

    await handleAnalyze({ companyName, jobTitle, jobDescription, file });
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
            <h2>Dépose ton CV et obtiens un score ATS et des recommandations personnalisées pour maximiser tes chances d'entretien.</h2>
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