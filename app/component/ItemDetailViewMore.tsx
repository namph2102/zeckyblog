import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiEyeLine } from "react-icons/ri";
import { capitalizeText, componentsProps } from "../sevices/untils";
import { IDataBlog } from "../sevices/typedata";
import "./style.scss";
interface ItemDetailViewMoreProps {
  blog: IDataBlog;
}
const ItemDetailViewMore: React.FC<ItemDetailViewMoreProps> = ({ blog }) => {
  return (
    <article id="blog_more" key={blog.slug}>
      <Link  href={`/${blog.slug}`}>
        <Image
          src={blog.image}
          width={200}
          height={160}
          alt={blog.title}      
         priority
          className="w-full sm:h-[250px] lg:max-h-[320px] md:max-h-[160px] max-h-[240px] h-auto object-cover"
        />
        <h2 className="line-clamp-1  mt-2 pb-0">{blog.title}</h2>
        <p className="indent-3 line-clamp-3 text-base my-2">{blog.des} </p>
        <div className="flex justify-end capitalize">
       
          <Tooltip
            arrow
            componentsProps={componentsProps}
            placement="bottom"
            title={`Tác giả: ${capitalizeText(
              blog.author.fullname || "Phạm Hoài Nam"
            )}`}
          >
            <p className="!text-xs font-medium flex items-center gap-1 pt-1">
              <RiEyeLine /> {blog.view.toLocaleString()}
            </p>
          </Tooltip>
        </div>
      </Link>
    </article>
  );
};

export default ItemDetailViewMore;
