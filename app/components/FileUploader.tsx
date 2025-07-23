import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { formatSize, isValidFileSize, getFileSizeCategory } from "../lib/utils"

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file);
  }, [onFileSelect])

  const handleRemoveFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
  }, [onFileSelect])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 20 * 1024 * 1024,
  })

  const file = selectedFile;
  const maxSizeBytes = 20 * 1024 * 1024; // 20MB

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative" onClick={(e) => e.stopPropagation()}>
                {/* Bouton de suppression */}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all duration-200 group"
                  title="Supprimer le fichier"
                >
                  <img 
                    src="/icons/cross.svg" 
                    alt="Supprimer" 
                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                  />
                </button>

                <div className="flex items-center space-x-4">
                  <img src="/images/pdf.png" alt="PDF file" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate max-w-xs">
                      {file.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className={`font-medium ${
                        isValidFileSize(file.size, maxSizeBytes) 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {formatSize(file.size)}
                      </span>
                      <span>•</span>
                      {/* <span>{file.type || 'PDF'}</span> */}
                      <span>Taille conforme</span>
                    </div>
                  </div>
                </div>
              </div>

              {!isValidFileSize(file.size, maxSizeBytes) && (
                <div className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 text-sm rounded-lg p-3">
                  <img src="/icons/warning.svg" alt="warning" className="size-5" />
                  <span className="font-medium">
                    Ce fichier dépasse la taille maximale autorisée ({formatSize(maxSizeBytes)})
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="file upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Choisir un fichier</span> ou glisser-déposer un fichier
              </p>
              <p className="text-sm text-gray-500">
                Seuls les fichiers PDF sont autorisés (max {formatSize(maxSizeBytes)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader