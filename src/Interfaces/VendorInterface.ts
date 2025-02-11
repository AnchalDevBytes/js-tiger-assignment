export interface VendorInterface {
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface VendorResponseInterface {
  id: string;
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
}
