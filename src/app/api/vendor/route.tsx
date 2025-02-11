import { prisma } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      !vendorName ||
      !bankAccountNo ||
      !bankName ||
      !addressLine1 ||
      !country ||
      !city ||
      !zipCode
    ) {
      return NextResponse.json(
        { success: false, message: "These Fieds are required" },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.create({
      data: {
        vendorName,
        bankAccountNo,
        bankName,
        addressLine1,
        addressLine2,
        country,
        city,
        zipCode,
        userId,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Error creating vendor" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: vendor }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown Error creating vendor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendors = await prisma.vendor.findMany({
      where: { userId },
    });

    if (!vendors) {
      return NextResponse.json(
        { success: false, message: "Error fetching vendors" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: vendors }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown Error fetching vendors" },
      { status: 500 }
    );
  }
}
