import blogModel from "@/app/sevices/database/BlogModel";
import userModel from "@/app/sevices/database/UserModel";
import connectMoongodb from "@/app/sevices/database/connectDatabase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    await connectMoongodb();
    const [totaluser, listBlogs = []] = await Promise.all([
      userModel.count(),
      blogModel.find().sort({ updatedAt: -1 }).populate({
        path: "author",
        select: "fullname",
      }),
    ]);

    return NextResponse.json(listBlogs);
  } catch (err: any) {
    return NextResponse.json({ statusCode: 404, listBlogs: err.message });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    await connectMoongodb();

    const data = await blogModel
      .findOne({ slug })
      .populate({ path: "author", select: "fullname" });
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
