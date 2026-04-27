/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import Papa from 'papaparse';

// Validation schemas
const LocationDatePairSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  type: z.enum(['pickup', 'load', 'transshipment_1', 'transshipment_2', 'discharge', 'delivery']),
});

export const RouteTimelineSchema = z.object({
  bookingNumber: z.string().min(1, 'Booking Number is required'),
  blNumber: z.string().min(1, 'BL Number is required'),
  route: z.array(LocationDatePairSchema).min(1, 'At least one route stop is required'),
});

export type RouteTimeline = z.infer<typeof RouteTimelineSchema>;

interface CSVRow {
  [key: string]: string;
}

interface ParseResult {
  success: boolean;
  data?: RouteTimeline[];
  errors: Array<{
    rowNumber: number;
    error: string;
  }>;
}

const EXPECTED_HEADERS = [
  'Mode',
  'CUSTOMER ID',
  'Booking Number Blok',
  'Bl number',
  'Shipping line',
  'Pick up Location',
  'Date',
  'Load port/Airport',
  'Date',
  'Transhipent port 1',
  'Date',
  'Transhipent port 2',
  'Date',
  'Dischar port/Airport',
  'Date',
  'Delivery Location',
  'Date',
];

// Normalize header names for matching
function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, ' ');
}

export async function parseRouteCSV(csvData: string): Promise<ParseResult> {
  try {
    // Parse CSV
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    if (parsed.errors.length > 0) {
      return {
        success: false,
        data: [],
        errors: [
          {
            rowNumber: 0,
            error: `CSV parsing error: ${parsed.errors[0].message}`,
          },
        ],
      };
    }

    const rows = parsed.data as CSVRow[];

    // Validate headers
    if (rows.length === 0) {
      return {
        success: false,
        data: [],
        errors: [
          {
            rowNumber: 0,
            error: 'CSV file is empty',
          },
        ],
      };
    }

    const csvHeaders = Object.keys(rows[0]);
    console.log("___Hello___")
    console.log({csvHeaders})
    const normalizedCsvHeaders = csvHeaders.map(normalizeHeader);
    const normalizedExpectedHeaders = EXPECTED_HEADERS.map(normalizeHeader);

    // Check if headers match (allow for slight variations)
    const headerMatch = normalizedExpectedHeaders.every((expected) =>
      normalizedCsvHeaders.some((actual) => actual.includes(expected.split(' ')[0]))
    );

    if (!headerMatch) {
      return {
        success: false,
        data: [],
        errors: [
          {
            rowNumber: 0,
            error: `Invalid CSV headers. Expected: ${EXPECTED_HEADERS.join(', ')}`,
          },
        ],
      };
    }

    // Transform rows
    const transformedData: RouteTimeline[] = [];
    const rowErrors: Array<{ rowNumber: number; error: string }> = [];

    rows.forEach((row, index) => {
      try {
        const bookingNumber = (row['Booking Number Blok'] || '').trim();
        const blNumber = (row['Bl number'] || '').trim();

        // Build route array by pairing locations with dates
        const route: Array<{ location: string; date: string; type: string }> = [];

        const routeStops = [
          {
            locationKey: 'Pick up Location',
            dateKey: 'Date', // First Date
            type: 'pickup',
          },
          {
            locationKey: 'Load port/Airport',
            dateKey: 'Date', // Second Date
            type: 'load',
          },
          {
            locationKey: 'Transhipent port 1',
            dateKey: 'Date', // Third Date
            type: 'transshipment_1',
          },
          {
            locationKey: 'Transhipent port 2',
            dateKey: 'Date', // Fourth Date
            type: 'transshipment_2',
          },
          {
            locationKey: 'Dischar port/Airport',
            dateKey: 'Date', // Fifth Date
            type: 'discharge',
          },
          {
            locationKey: 'Delivery Location',
            dateKey: 'Date', // Sixth Date
            type: 'delivery',
          },
        ];

        // Find all "Date" columns
        const dateColumns = Object.keys(row).filter(
          (key) => normalizeHeader(key) === 'date'
        );

        let dateIndex = 0;

        routeStops.forEach((stop) => {
          const location = (row[stop.locationKey] || '').trim();
          const date = dateIndex < dateColumns.length ? (row[dateColumns[dateIndex]] || '').trim() : '';

          if (location || date) {
            route.push({
              location: location || 'N/A',
              date: date || 'N/A',
              type: stop.type,
            });
            dateIndex++;
          }
        });

        // Validate the transformed data
        const validated = RouteTimelineSchema.parse({
          bookingNumber,
          blNumber,
          route,
        });

        transformedData.push(validated);
      } catch (error: any) {
        rowErrors.push({
          rowNumber: index + 2, // +1 for header, +1 for 1-based indexing
          error: error.message || 'Invalid row data',
        });
      }
    });

    if (transformedData.length === 0) {
      return {
        success: false,
        data: [],
        errors: rowErrors.length > 0 ? rowErrors : [{ rowNumber: 1, error: 'No valid rows found' }],
      };
    }

    return {
      success: true,
      data: transformedData,
      errors: rowErrors,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      errors: [
        {
          rowNumber: 0,
          error: error.message || 'Failed to parse CSV',
        },
      ],
    };
  }
}
