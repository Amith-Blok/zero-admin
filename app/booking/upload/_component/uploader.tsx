/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { parseRouteCSV, type RouteTimeline } from '@/lib/routeParser';

interface RouteUploaderProps {
  onDataParsed: (data: RouteTimeline[], errors: Array<{ rowNumber: number; error: string }>) => void;
}

export default function RouteUploader({ onDataParsed }: RouteUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setFileName(null);

      if (acceptedFiles.length === 0) {
        setError('No file selected');
        return;
      }

      const file = acceptedFiles[0];

      // Validate file type
      if (!file.name.endsWith('.csv')) {
        setError('Only CSV files are allowed. Please upload a .csv file.');
        return;
      }

      // Validate file size (5MB limit)
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds 5MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
        return;
      }

      if (file.size === 0) {
        setError('File is empty. Please upload a file with data.');
        return;
      }

      setIsLoading(true);
      setFileName(file.name);

      try {
        // Read file as text
        const text = await file.text();
        
        // Parse CSV
        const result = await parseRouteCSV(text);

        if (!result.success) {
          setError(result.errors[0]?.error || 'Failed to parse CSV file');
          onDataParsed([], result.errors);
        } else {
          onDataParsed(result.data || [], result.errors);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to process file');
        onDataParsed([], [{ rowNumber: 0, error: err.message }]);
      } finally {
        setIsLoading(false);
      }
    },
    [onDataParsed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-3">
            <div className="text-3xl sm:text-4xl">📁</div>
            {isDragActive ? (
              <div>
                <p className="text-base sm:text-lg font-semibold text-blue-600">Drop the CSV file here</p>
              </div>
            ) : (
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-700">Drag and drop your CSV file here</p>
                <p className="text-sm text-gray-500 mt-2">or click to select a file</p>
              </div>
            )}
          </div>
        </div>

        {fileName && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              <span className="text-sm font-medium text-gray-700">{fileName}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Spinner className="h-4 w-4" />
            <span className="text-sm">Parsing CSV file...</span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-gray-500">
          Maximum file size: 5MB. Supported format: CSV with required headers.
        </p>
      </div>
    </Card>
  );
}
