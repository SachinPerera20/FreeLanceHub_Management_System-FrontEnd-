import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../context/ContractsContext";

export default function ContractDetailsPage() {
    const { contractId } = useParams();
    const { user } = useAuth();
    const { getContractById } = useContracts();



}  