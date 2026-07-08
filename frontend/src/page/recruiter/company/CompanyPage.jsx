import { useEffect, useState } from "react";
import { Company } from "../../../components/company/Company";
import { CreateCompany } from "../../../components/company/CreateCompany";
import { getMyCompany } from "../../../api/company/company";
import Loading from "../../../components/common/Loading";
import { useApiState } from "../../../hook/useApiSate";
import ErrorState from "../../../components/common/ErrorState";

const CompanyPage = () => {
  const [company, setCompany] = useState(null);

  const {
    loading,
    setLoading,
    error,
    setError,
  } = useApiState();

  const fetchCompany = async () => {
    try {
      setLoading(true);

      const res = await getMyCompany();

      if (res.has_company) {
        setCompany(res.data);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load company"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return <ErrorState message={error} />;
  }

  return company ? (
    <Company company={company} onDeleted={() => setCompany(null)} />
  ) : (
    <CreateCompany
      onSuccess={(newCompany) => {
        setCompany(newCompany);
      }}
    />
  );
};

export default CompanyPage;
