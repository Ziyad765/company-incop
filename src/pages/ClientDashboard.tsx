import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface IncorporationRequest {
  id: string;
  owner_name: string;
  company_name: string;
  phone_number: string;
  address: string;
  business_type: string;
  status: string;
  created_at: string;
  additional_details?: string;
}

export default function ClientDashboard() {
  const [assignedRequests, setAssignedRequests] = useState<IncorporationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAssignedRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('incorporation_requests')
          .select('*')
          .eq('assigned_to', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssignedRequests(data || []);
      } catch (error) {
        console.error('Error fetching assigned requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedRequests();
  }, [user, navigate]);

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('incorporation_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setAssignedRequests(assignedRequests.map(request =>
        request.id === id ? { ...request, status } : request
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress': return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Your Assigned Requests
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and update the status of incorporation requests assigned to you
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : assignedRequests.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No requests assigned</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any incorporation requests assigned to you yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {assignedRequests.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(request.status)}
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.company_name}
                      </h3>
                    </div>
                    <select
                      value={request.status}
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Owner Details</h4>
                      <div className="mt-2 text-sm text-gray-900">
                        <p>{request.owner_name}</p>
                        <p>{request.phone_number}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Business Details</h4>
                      <div className="mt-2 text-sm text-gray-900">
                        <p>Type: {request.business_type}</p>
                        <p>Address: {request.address}</p>
                      </div>
                    </div>
                  </div>

                  {request.additional_details && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Additional Details</h4>
                      <p className="mt-2 text-sm text-gray-900">{request.additional_details}</p>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    Submitted on {new Date(request.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}