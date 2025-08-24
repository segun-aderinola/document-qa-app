import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/common/Dropzone';
import { ProgressBar } from '../components/common/ProgressBar';
import { useUploadSimulator } from '../hooks/useUploadSimulator';
import { useAppContext } from '../context/AppContext';
import { useToast } from '../hooks/useToast';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { addDocument, documents } = useAppContext();
  const { uploads, startUpload, cancelUpload } = useUploadSimulator();
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    try {
      const document = await startUpload(file);
      addDocument(document);
      
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`
      });

      // Navigate to the document after a short delay
      setTimeout(() => {
        navigate(`/doc/${document.id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUploadCancel = (docId: string) => {
    cancelUpload(docId);
    toast({
      title: "Upload cancelled",
      description: "The file upload has been cancelled."
    });
  };

  const activeUploads = Object.values(uploads);
  const hasDocuments = documents.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Document Q&A Suite
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your documents and ask intelligent questions. Get detailed answers powered by advanced analysis.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Dropzone
              onFileSelect={handleFileSelect}
              disabled={activeUploads.length > 0}
              className="w-full"
            />
          </motion.div>

          {/* Active Uploads */}
          {activeUploads.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {activeUploads.map((upload) => {
                // Find the corresponding file name (in a real app, you'd store this)
                const fileName = `upload-${upload.docId.slice(-6)}.pdf`;
                return (
                  <ProgressBar
                    key={upload.docId}
                    upload={upload}
                    fileName={fileName}
                    onCancel={() => handleUploadCancel(upload.docId)}
                  />
                );
              })}
            </motion.div>
          )}

          {/* Existing Documents CTA */}
          {hasDocuments && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-4">
                You have {documents.length} document{documents.length === 1 ? '' : 's'} ready for Q&A
              </p>
              <Button
                onClick={() => navigate(`/doc/${documents[0].id}`)}
                className="flex items-center gap-2"
              >
                Go to Documents
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Features */}
          {!hasDocuments && activeUploads.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mt-16"
            >
              {[
                {
                  title: "Smart Upload",
                  description: "Drag and drop any document to get started"
                },
                {
                  title: "Intelligent Q&A",
                  description: "Ask questions and get detailed, contextual answers"
                },
                {
                  title: "Search & Export",
                  description: "Search across all conversations and export your data"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border"
                >
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}