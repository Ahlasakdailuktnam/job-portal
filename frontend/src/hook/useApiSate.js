import { useState } from "react";

export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return {
    loading,
    setLoading,
    error,
    setError,
  };
};