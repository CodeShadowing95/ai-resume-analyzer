import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
  { title: "Curriqulum.ai | Auth" },
  { name: "description", content: "Portail d'authentification sécurisé pour Curriqulum.ai - Connectez-vous ou créez un compte pour accéder à l'analyse de CV assistée par IA, aux conseils de carrière et aux outils de développement professionnel. Votre passerelle vers l'optimisation de vos candidatures et l'évolution de carrière." },
  { name: "keywords", content: "analyseur CV, ATS, intelligence artificielle, optimisation CV, score CV, recrutement, carrière, emploi, analyse de CV" },
  { property: "og:title", content: "Curriqulum.ai | Auth" },
  { property: "og:description", content: "Auth" },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Curriqulum.ai | Auth" },
  { name: "twitter:description", content: "Auth" },
])

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navigate(next || '/');
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg animate-in fade-in duration-1000">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Youhouu <span className="text-white">👋</span>!</h1>
            <h2>Connectez-vous pour bénéficier de toute la puissance de Curriqulum.ai</h2>
          </div>

          <div className="flex justify-center items-center">
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Connexion en cours ⌛</p>
              </button>
            ) : (
              <>
              {auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}>
                  <p>Déconnexion</p>
                </button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}>
                  <p>Se connecter</p>
                </button>
              )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth