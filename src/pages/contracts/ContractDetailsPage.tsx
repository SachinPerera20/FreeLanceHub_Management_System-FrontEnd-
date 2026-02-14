import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../context/ContractsContext";
import { useJobs } from "../../hooks/useJobs";


export default function ContractDetailsPage() {
    const { contractId } = useParams();
    const { user } = useAuth();
    const { getContractById, updateContract } = useContracts();

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

  const allowed = contract.clientId === user.id || contract.freelancerId === user.id;


  if (!allowed) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border rounded-xl p-6 space-y-3">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p className="text-gray-600">You don’t have permission to view this contract.</p>
          <Link
            to="/contracts"
            className="inline-flex px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-sm"
          >
            ← Back to Contracts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{contract.title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Status: <span className="font-medium text-gray-900">{contract.status}</span> • Payment:{" "}
              <span className="font-medium text-gray-900">{contract.paymentStatus}</span>
            </p>
          </div>

          <Link
            to="/contracts"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ← Back
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-semibold">{contract.clientName ?? contract.clientId}</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Freelancer</p>
            <p className="font-semibold">{contract.freelancerName ?? contract.freelancerId}</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold">${contract.totalAmount}</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-semibold">{new Date(contract.startDate).toLocaleString()}</p>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{contract.description}</p>
        </div>

        {contract.terms ? (
          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Terms</p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{contract.terms}</p>
          </div>
        ) : null}

        {contract.milestones && contract.milestones.length > 0 ? (
          <div className="border rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-500">Milestones</p>
            <div className="space-y-2">
              {contract.milestones.map((m) => (
                <div key={m.id} className="border rounded-lg p-3">
                  <div className="flex justify-between gap-3">
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-sm text-gray-600">{m.status}</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{m.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Amount: <span className="font-medium">${m.amount}</span> • Due:{" "}
                    {new Date(m.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

}  