import { trpc } from "@/utils/trpcClient";
import { useState } from "react";

const useFileManagement = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { mutateAsync: getSignedURL } = trpc.file.signedUrl.useMutation();

  const uploadToS3 = (uploadUrl, file) =>
    fetch(uploadUrl, {
      method: "PUT",
      body: file,
    });

  const generateUploadUrl = async (file) => {
    const { publicUrl, uploadUrl } = await getSignedURL({
      fileName: file.name,
      fileType: file.type,
    });
    return { publicUrl, uploadUrl };
  };

  const { mutateAsync: uploadFilestoDB } = trpc.file.upload.useMutation();

  const handleUpload = async (files) => {
    setLoading(true);
    try {
      const filesPromises = Array.from(files).map(async (file) => {
        const { uploadUrl, publicUrl } = await generateUploadUrl(file);
        await uploadToS3(uploadUrl, file);
        return {
          type: file.type,
          src: publicUrl,
          size: file.size,
          name: file.name,
        };
      });

      const uploadedFiles = await Promise.all(filesPromises);

      const records = await uploadFilestoDB(uploadedFiles);

      if (records.length) {
        setSuccess(true);
      } else {
        setError("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleUpload,
    success,
    error,
  };
};

export default useFileManagement;
