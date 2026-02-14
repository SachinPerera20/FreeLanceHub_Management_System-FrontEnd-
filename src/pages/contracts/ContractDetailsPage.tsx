import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../context/ContractsContext";

export default function ContractDetailsPage() {
    const { contractId } = useParams();
    const { user } = useAuth();
    const { getContractById } = useContracts();

    if (!user) {
        return <div className="p-6">Please login to view contract details.</div>;
      }

      if (!contractId) {
        return <div className="p-6">Invalid contract</div>;
      }

      const contract = getContractById(contractId);

  if (!contract) {
    return <div className="p-6">Contract not found</div>;
  }

}  