interface IIData {
  title: string;
  des: string;
  image: string;
  content: string;
  slug: string;
}
// idataCreateBlog
export interface IData extends IIData {
  author: string;
  category: string;
  pathImage?: string;
}
export interface IDataBlog extends IIData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  view: number;
  status: boolean;
  author: {
    fullname: string;
  };
  category: {
    cate: string;
    slug: string;
  };
}
