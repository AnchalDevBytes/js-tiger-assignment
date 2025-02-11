import { prisma } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!params || !params.id) {
      return NextResponse.json(
        { success: false, message: "Vendor id is required" },
        { status: 400 }
      );
    }

    const { id } = params;
    const {
      vendorName,
      bankAccountNo,
      bankName,
      addressLine1,
      addressLine2,
      country,
      city,
      zipCode,
    } = await req.json();

    if (
      !vendorName &&
      !bankAccountNo &&
      !bankName &&
      !addressLine1 &&
      !addressLine2 &&
      !country &&
      !city &&
      !zipCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Atleast one field is required to update",
        },
        { status: 400 }
      );
    }
    const updatedVendor = await prisma.vendor.update({
      where: { id: id, userId: userId },
      data: {
        vendorName,
        bankAccountNo,
        bankName,
        addressLine1,
        addressLine2,
        country,
        city,
        zipCode,
      },
    });

    if (!updatedVendor) {
      return NextResponse.json(
        { success: false, message: "Error updating vendor" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedVendor },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown Error updating vendor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!params || !params.id) {
      return NextResponse.json(
        { success: false, message: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const { id } = params;
    await prisma.vendor.delete({
      where: { id, userId },
    });

    return NextResponse.json(
      { success: true, message: "Vendor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown Error deleting vendor" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Vendor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: vendor }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error fetching vendor" },
      { status: 500 }
    );
  }
}
