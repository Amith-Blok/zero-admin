"use client"
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import RouteUploader from "./_component/uploader";
import { useState } from "react";
import { RouteTimeline } from "@/lib/routeParser";
import RoutePreview from "./_component/previewer";

export default function Page() {
  const [routes, setRoutes] = useState<RouteTimeline[]>([]);
  const [errors, setErrors] = useState<
    Array<{ rowNumber: number; error: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDataParsed = (
    parsedRoutes: RouteTimeline[],
    parseErrors: Array<{ rowNumber: number; error: string }>,
  ) => {
    setRoutes(parsedRoutes);
    setErrors(parseErrors);
    setSubmitStatus(null);
  };

  const handleSubmit = async () => {
    if (routes.length === 0) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routes }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: `Successfully submitted ${routes.length} route(s)!`,
        });
        setRoutes([]);
        setErrors([]);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit routes",
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/booking">
                    Booking
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Upload</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 sm:py-12">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Booking upload
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Upload a CSV file to update to shipping
                    tracking
                  </p>
                </div>

                {/* Upload Section */}
                <RouteUploader onDataParsed={handleDataParsed} />

                {/* Status Messages */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${submitStatus.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                  >
                    <p
                      className={`text-sm font-medium ${submitStatus.type === "success" ? "text-green-800" : "text-red-800"}`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {/* Preview Section */}
                {routes.length > 0 && (
                  <RoutePreview
                    routes={routes}
                    errors={errors}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}

                {/* Empty State */}
                {routes.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Upload a CSV file to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
