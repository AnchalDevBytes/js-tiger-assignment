"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { ApiInterface } from "@/Interfaces/ApiInterface";
import { VendorResponseInterface } from "@/Interfaces/VendorInterface";

const VendorList = () => {
  const [vendors, setVendors] = useState<VendorResponseInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response: AxiosResponse<ApiInterface<VendorResponseInterface[]>> =
        await axios.get("/api/vendor");
      if (!response || !response.data || !response.data.success) {
        toast.error(response.data.message);
        return;
      }
      setVendors(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Failed to fetch vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response: AxiosResponse<ApiInterface<null>> = await axios.delete(
        `/api/vendor/${id}`
      );

      if (!response || !response.data || !response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      fetchVendors();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Failed to delete vendor");
    }
  };

  const paginatedVendors = vendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  return (
    <div className="mt-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Bank Account No.</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">
                  {vendor.vendorName}
                </TableCell>
                <TableCell>{vendor.bankAccountNo}</TableCell>
                <TableCell>{vendor.bankName}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/vendors/edit/${vendor.id}`)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this vendor? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(vendor.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorList;
