import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Cards';
import { StatusBadge, CategoryBadge } from '../ui/Badges';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
interface JobCardProps {
  job: Job;
}
export function JobCard({
  job
}: JobCardProps) {
  return <Link to={`/jobs/${job.id}`}>
      <Card className="h-full hover:border-teal-500/50 transition-all group">
        <CardHeader className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={job.category} />
              <StatusBadge status={job.status} />
            </div>
            <CardTitle className="group-hover:text-teal-400 transition-colors line-clamp-1">
              {job.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill) => <span key={skill} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                {skill}
              </span>)}
            {job.skills.length > 3 && <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                +{job.skills.length - 3}
              </span>}
          </div>
        </CardContent>

        <CardFooter className="text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-teal-400 font-medium">
              <DollarSign className="w-4 h-4 mr-1" />
              LKR {job.budget.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatDistanceToNow(new Date(job.createdAt), {
              addSuffix: true
            })}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>;
}