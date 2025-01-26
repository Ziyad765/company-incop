import React from 'react';
import { useForm } from 'react-hook-form';
import { Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegistrationFormData {
  ownerName: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  businessType: string;
  additionalDetails: string;
}

export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const { error } = await supabase
        .from('incorporation_requests')
        .insert([{
          owner_name: data.ownerName,
          phone_number: data.phoneNumber,
          company_name: data.companyName,
          address: data.address,
          business_type: data.businessType,
          additional_details: data.additionalDetails
        }]);

      if (error) throw error;

      alert('Registration submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Register Your Company
          </h2>
          <p className="mt-2 text-gray-600">
            Fill out the form below to start your company incorporation process
          </p>
        </div>

        <div className="bg-white p-8 shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Owner's Name
              </label>
              <input
                type="text"
                id="ownerName"
                {...register('ownerName', { required: 'Owner name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.ownerName && (
                <p className="mt-1 text-sm text-red-600">{errors.ownerName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...register('phoneNumber', { required: 'Phone number is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                {...register('companyName', { required: 'Company name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                id="address"
                rows={3}
                {...register('address', { required: 'Address is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Type of Business
              </label>
              <select
                id="businessType"
                {...register('businessType', { required: 'Business type is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a business type</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llc">Limited Liability Company (LLC)</option>
                <option value="corporation">Corporation</option>
                <option value="nonprofit">Nonprofit Organization</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                rows={4}
                {...register('additionalDetails')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Any additional information about your business..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}