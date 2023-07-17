import blogModel from "@/app/sevices/database/BlogModel";
import connectMoongodb from "@/app/sevices/database/connectDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    await connectMoongodb();
    console.log(slug);
    const data = await blogModel.findOne({ slug });
    if (!data) throw new Error("Cần dữ liệu");
    return NextResponse.json({
      data: data,
      statusCode: 200,
      message: "Lấy thành công bài viết",
    });
  } catch (err: any) {
    return NextResponse.json({ statusCode: 404, data: err.message });
  }
}
