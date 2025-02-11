"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { ApiInterface } from "@/Interfaces/ApiInterface";
import { VendorInterface } from "@/Interfaces/VendorInterface";
import Spinner from "@/components/Spinner";

const vendorSchema = z.object({
  vendorName: z.string().min(1, "Vendor name is required"),
  bankAccountNo: z.string().min(1, "Bank account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

const EditVendor = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof vendorSchema>>({
    resolver: zodResolver(vendorSchema),
  });

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response: AxiosResponse<ApiInterface<VendorInterface>> =
          await axios.get(`/api/vendor/${params.id}`);

        if (!response || !response.data || !response.data.success) {
          toast.error(response.data.message);
          return;
        }
        form.reset(response.data.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch vendor");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchVendor();
  }, [params.id, form]);

  const onSubmit = async (values: z.infer<typeof vendorSchema>) => {
    setLoading(true);
    try {
      const response: AxiosResponse<ApiInterface<VendorInterface>> =
        await axios.put(`/api/vendor/${params.id}`, values);

      if (!response || !response.data || !response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update vendor");
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="h-[500px] flex items-center justify-center flex-col gap-2">
        <Spinner />
        <span className="text-2xl animate-pulse text-yellow-600 tracking-widest">
          loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6">Edit Vendor</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="bankAccountNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account No. *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1 *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Vendor"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditVendor;
