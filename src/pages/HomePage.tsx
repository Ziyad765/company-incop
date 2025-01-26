import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ClipboardCheck, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Start Your Business Journey Today
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Simple, fast, and reliable company incorporation services. Let us handle the paperwork while you focus on building your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Register Your Company
              </Link>
              <Link
                to="/login"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                Client Login <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="relative pl-16">
                <Building2 className="absolute left-0 top-0 h-10 w-10 text-blue-600" />
                <h3 className="text-base font-semibold leading-7 text-gray-900">Easy Registration</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">Simple online form to collect all necessary information for your company registration.</p>
              </div>
              <div className="relative pl-16">
                <ClipboardCheck className="absolute left-0 top-0 h-10 w-10 text-blue-600" />
                <h3 className="text-base font-semibold leading-7 text-gray-900">Track Progress</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">Monitor your application status in real-time through our client dashboard.</p>
              </div>
              <div className="relative pl-16">
                <Shield className="absolute left-0 top-0 h-10 w-10 text-blue-600" />
                <h3 className="text-base font-semibold leading-7 text-gray-900">Secure & Reliable</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">Your data is protected with enterprise-grade security measures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}