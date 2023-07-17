import connectMoongodb from "../sevices/database/connectDatabase";
import blogModel from "../sevices/database/BlogModel";
import { NextRequest, NextResponse } from "next/server";
import { IData } from "../sevices/typedata";
export async function GET(request: NextRequest) {
  try {
    await connectMoongodb();
    const listBlogs = (await blogModel.find()) || [];
    return NextResponse.json(listBlogs);
  } catch (err: any) {
    return NextResponse.json({ statusCode: 404, listBlogs: err.message });
  }
}

export async function HEAD(request: NextRequest) {}

export async function POST(request: NextRequest) {
  try {
    const dataRequest = await request.json();
    const body: IData = dataRequest.body;
    await connectMoongodb();
    const checkExtends = await blogModel.findOne({ slug: body.slug });
    if (checkExtends) {
      return NextResponse.json({
        statusCode: 200,
        message: "Bài viết đã tồn tại rồi",
      });
    }
    const data = await blogModel.create(body);
    return NextResponse.json({
      statusCode: 201,
      message: "Thêm thành công bài viết",
      newBlog: data,
    });
  } catch (err: any) {
    return NextResponse.json({ statusCode: 200, message: err.message });
  }
}

export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}

export async function PATCH(request: NextRequest) {}
