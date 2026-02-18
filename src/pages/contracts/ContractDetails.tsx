import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContracts } from '../../state/contracts';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Cards';
import { Button, Textarea } from '../../components/ui/FormControls';
import { StatusBadge, PaymentBadge } from '../../components/ui/Badges';
import {
  CheckCircle,
  CreditCard,
  MessageSquare,
  FileText,
  Mail,
  Star,
  User } from
'lucide-react';
import { format } from 'date-fns';
import { usersService } from '../../services/users.service';
import { reviewsService } from '../../services/reviews.service';
import { SafeUser, Review } from '../../types';
export function ContractDetails() {
  const { id } = useParams<{
    id: string;
  }>();
  const { currentContract, fetchContractById, completeContract, isLoading } =
  useContracts();
  const { user } = useAuth();
  const [clientUser, setClientUser] = useState<SafeUser | null>(null);
  const [freelancerUser, setFreelancerUser] = useState<SafeUser | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [existingReview, setExistingReview] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  useEffect(() => {
    if (id) {
      fetchContractById(id);
    }
  }, [id, fetchContractById]);
  useEffect(() => {
    const loadData = async () => {
      if (currentContract) {
        // Fetch users
        const client = await usersService.getUserById(currentContract.clientId);
        const freelancer = await usersService.getUserById(
          currentContract.freelancerId
        );
        setClientUser(client);
        setFreelancerUser(freelancer);
        // Check for existing review
        if (user?.role === 'CLIENT') {
          const reviews = await reviewsService.listByFreelancer(
            currentContract.freelancerId
          );
          const found = reviews.find((r) => r.contractId === currentContract.id);
          if (found) setExistingReview(true);
        }
      }
    };
    loadData();
  }, [currentContract, user]);
  if (isLoading || !currentContract) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>);

  }
  const isClient = user?.role === 'CLIENT';
  const handleComplete = async () => {
    if (confirm('Are you sure you want to mark this contract as completed?')) {
      await completeContract(currentContract.id);
    }
  };
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !currentContract) return;
    setIsSubmittingReview(true);
    try {
      await reviewsService.createReview(
        {
          contractId: currentContract.id,
          freelancerId: currentContract.freelancerId,
          rating,
          comment: reviewComment,
          tags: []
        },
        user.id,
        user.name
      );
      setReviewSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Contract Details</h1>
          <div className="flex gap-2">
            <StatusBadge status={currentContract.status} />
            <PaymentBadge status={currentContract.paymentStatus} />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agreement Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Contract ID</span>
                <span className="text-white font-mono">
                  {currentContract.id}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Agreed Price</span>
                <span className="text-teal-400 font-bold text-lg">
                  LKR {currentContract.agreedPrice.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Start Date</span>
                <span className="text-white">
                  {format(new Date(currentContract.startedAt), 'PPP')}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Completion Date</span>
                <span className="text-white">
                  {currentContract.completedAt ?
                  format(new Date(currentContract.completedAt), 'PPP') :
                  '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Communication
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Chat with your {isClient ? 'Freelancer' : 'Client'} about the
                project.
              </p>
              <Link to="/chat" className="w-full">
                <Button variant="secondary" className="w-full">
                  Open Chat
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <CreditCard className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Payment</h3>

              {currentContract.paymentStatus === 'paid' ?
              <>
                  <p className="text-green-400 text-sm mb-4">
                    Payment Completed
                  </p>
                </> :
              isClient ?
              <>
                  <p className="text-gray-400 text-sm mb-4">
                    Payment is pending.
                  </p>
                  <Link
                  to={`/payments/checkout/${currentContract.id}`}
                  className="w-full">

                    <Button className="w-full">Pay Now</Button>
                  </Link>
                </> :

              <p className="text-gray-400 text-sm mb-4">
                  Waiting for client payment.
                </p>
              }
            </CardContent>
          </Card>
        </div>

        {/* Contact Info (Only if paid) */}
        {currentContract.paymentStatus === 'paid' &&
        <Card className="mb-8 border-teal-900/30 bg-teal-900/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-400" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#111827] rounded-lg border border-gray-800">
                  <div className="text-xs text-gray-500 uppercase mb-1">
                    Client
                  </div>
                  <div className="font-medium text-white mb-1">
                    {clientUser?.name}
                  </div>
                  <div className="text-teal-400 text-sm">
                    {clientUser?.email}
                  </div>
                </div>
                <div className="p-4 bg-[#111827] rounded-lg border border-gray-800">
                  <div className="text-xs text-gray-500 uppercase mb-1">
                    Freelancer
                  </div>
                  <div className="font-medium text-white mb-1">
                    {freelancerUser?.name}
                  </div>
                  <div className="text-teal-400 text-sm">
                    {freelancerUser?.email}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Email addresses are shared after payment completion to exchange
                final deliverables.
              </p>
            </CardContent>
          </Card>
        }

        {/* Completion / Review Section */}
        {currentContract.status === 'active' && isClient &&
        <Card className="border-teal-900/50 bg-teal-900/10">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Complete Contract
                </h3>
                <p className="text-gray-400 text-sm">
                  Mark the job as finished when all work is delivered.
                </p>
              </div>
              <Button onClick={handleComplete}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </CardContent>
          </Card>
        }

        {currentContract.status === 'completed' && isClient &&
        <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Rate & Review</CardTitle>
            </CardHeader>
            <CardContent>
              {existingReview || reviewSubmitted ?
            <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Review Submitted
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Thank you for your feedback!
                  </p>
                </div> :

            <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) =>
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110">

                          <Star
                      className={`w-8 h-8 ${rating >= star ? 'text-[#f97316] fill-[#f97316]' : 'text-gray-700 fill-gray-700'}`} />

                        </button>
                  )}
                    </div>
                  </div>
                  <Textarea
                label="Feedback"
                placeholder="Share your experience working with this freelancer..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required />

                  <Button
                type="submit"
                disabled={
                rating === 0 ||
                !reviewComment.trim() ||
                isSubmittingReview
                }>

                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
            }
            </CardContent>
          </Card>
        }
      </div>
    </Layout>);

}