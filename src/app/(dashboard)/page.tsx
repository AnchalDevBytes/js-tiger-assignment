"use client";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VendorList from "@/components/VendorList";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">VendorHub</span>
            </div>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-gray-900">
              Vendor Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your vendors, their banking details, and addresses all in
              one place.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button
              onClick={() => router.push("/vendors/new")}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </div>
        </div>
        <VendorList />
      </main>
    </div>
  );
};

export default Home;
