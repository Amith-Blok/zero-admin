'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { type RouteTimeline } from '@/lib/routeParser';

interface RoutePreviewProps {
  routes: RouteTimeline[];
  errors: Array<{ rowNumber: number; error: string }>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function RoutePreview({
  routes,
  errors,
  onSubmit,
  isSubmitting,
}: RoutePreviewProps) {
  if (routes.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    if (dateString === 'N/A' || !dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      pickup: 'Pick Up',
      load: 'Load',
      transshipment_1: 'Transshipment 1',
      transshipment_2: 'Transshipment 2',
      discharge: 'Discharge',
      delivery: 'Delivery',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Route Timeline Preview</h2>
        <p className="text-gray-600">
          {routes.length} route{routes.length !== 1 ? 's' : ''} ready to submit
          {errors.length > 0 && ` (${errors.length} error${errors.length !== 1 ? 's' : ''})`}
        </p>
      </div>

      {errors.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Validation Warnings</h3>
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="text-sm text-yellow-800">
                Row {error.rowNumber}: {error.error}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {routes.map((route, idx) => (
          <Card key={idx} className="p-4 sm:p-6 border border-gray-200">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">
                Booking: <span className="text-blue-600">{route.bookingNumber}</span>
              </h3>
              <p className="text-sm text-gray-600">BL Number: {route.blNumber}</p>
            </div>

            <div className="space-y-2">
              {route.route.map((stop, stopIdx) => (
                <div key={stopIdx} className="flex items-start gap-3">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    {stopIdx < route.route.length - 1 && (
                      <div className="w-0.5 h-6 bg-gray-300 my-0"></div>
                    )}
                  </div>

                  {/* Stop details */}
                  <div className="flex-1 pb-2">
                    <p className="font-medium text-gray-900">{getTypeLabel(stop.type)}</p>
                    <p className="text-sm text-gray-600">{stop.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(stop.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
        <button
          onClick={onSubmit}
          disabled={isSubmitting || routes.length === 0}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : `Submit ${routes.length} Route${routes.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
