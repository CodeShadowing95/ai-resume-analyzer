import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { Trash2, AlertTriangle, ArrowLeft, FileText, Database, User, Shield } from "lucide-react";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deletionComplete, setDeletionComplete] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        setIsDeleting(true);
        setShowConfirmation(false);
        
        try {
            // Simulate progress for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            files.forEach(async (file) => {
                await fs.delete(file.path);
            });
            await kv.flush();
            
            setDeletionComplete(true);
            await loadFiles();
            
            // Auto redirect after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            console.error("Erreur lors de la suppression:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (deletionComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Suppression terminée</h2>
                    <p className="text-gray-600 mb-4">Toutes vos données ont été effacées avec succès.</p>
                    <p className="text-sm text-gray-500">Redirection automatique dans 3 secondes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour</span>
                        </button>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{auth.user?.username}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trash2 className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Gestion des Données</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Supprimez définitivement toutes vos données stockées dans l'application
                    </p>
                </div>

                {/* Data Overview */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Files Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-800">Fichiers stockés</h3>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {files.length > 0 ? (
                                files.map((file) => (
                                    <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">Aucun fichier trouvé</p>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">{files.length}</span> fichier(s) au total
                            </p>
                        </div>
                    </div>

                    {/* Database Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-purple-600" />
                            <h3 className="text-xl font-semibold text-gray-800">Base de données</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm font-medium text-purple-800">Données utilisateur</p>
                                <p className="text-xs text-purple-600">Profils, préférences, historique</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm font-medium text-purple-800">Analyses de CV</p>
                                <p className="text-xs text-purple-600">Scores, feedbacks, recommandations</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm font-medium text-purple-800">Cache et sessions</p>
                                <p className="text-xs text-purple-600">Données temporaires</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning Section */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Action irréversible</h3>
                            <ul className="text-red-700 space-y-1 text-sm">
                                <li>• Tous vos CV analysés seront définitivement supprimés</li>
                                <li>• Vos scores et recommandations seront perdus</li>
                                <li>• Votre historique d'utilisation sera effacé</li>
                                <li>• Cette action ne peut pas être annulée</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center">
                    {!showConfirmation ? (
                        <button
                            onClick={() => setShowConfirmation(true)}
                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Trash2 className="w-5 h-5 inline mr-2" />
                            Supprimer toutes les données
                        </button>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmer la suppression</h3>
                            <p className="text-gray-600 mb-6">
                                Êtes-vous absolument certain de vouloir supprimer toutes vos données ?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Suppression...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Confirmer
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WipeApp;