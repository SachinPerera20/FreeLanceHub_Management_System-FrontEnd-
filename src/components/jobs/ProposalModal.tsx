import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button, Input, Textarea } from '../ui/FormControls';
import { useProposals } from '../../state/proposals';
interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}
export function ProposalModal({
  isOpen,
  onClose,
  jobId,
  jobTitle
}: ProposalModalProps) {
  const {
    createProposal,
    isLoading
  } = useProposals();
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProposal({
        jobId,
        coverLetter,
        bidAmount: Number(bidAmount),
        estimatedDays: Number(estimatedDays)
      });
      onClose();
      // Reset form
      setCoverLetter('');
      setBidAmount('');
      setEstimatedDays('');
    } catch (error) {
      console.error(error);
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={`Submit Proposal: ${jobTitle}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Bid Amount (LKR)" type="number" required min="0" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
          <Input label="Estimated Days" type="number" required min="1" value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)} />
        </div>

        <Textarea label="Cover Letter" placeholder="Explain why you are the best fit for this job..." required rows={5} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Submit Proposal
          </Button>
        </div>
      </form>
    </Modal>;
}