import { Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiHomeAlt, BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";
import { RiFlagLine } from "react-icons/ri";
import { componentsProps } from "../sevices/untils";
interface ShareSocialProps {
  link: string;
  isTextShare?: boolean;
}
const ShareSocial: React.FC<ShareSocialProps> = ({ link, isTextShare }) => {
  const className = `flex gap-2 items-center ${
    isTextShare
      ? "border-t-2 border-gray-500 py-4 mt-2"
      : " mb-8 sm:mb-12 justify-center mt-3"
  }`;

  return (
    <div className={className}>
      {isTextShare && <p className="!font-medium text-sm">Chia sẻ bài viết:</p>}
      <p className="flex gap-1 text-base items-center">
        <Tooltip
          componentsProps={componentsProps}
          title="Chia sẻ bài viết lên Facebook"
          arrow
          placement="bottom"
        >
          <>
            <Link
              className="flex items-center gap-1 border-gray-400 rounded-full p-1 border-[0.5px]"
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${link}&hashtag=baiviethay,zeckytintuc,top`}
            >
              <BiLogoFacebook />
            </Link>
          </>
        </Tooltip>
        <Tooltip
          componentsProps={componentsProps}
          title="Chia sẻ bài viết lên Twitter"
          arrow
          placement="bottom"
        >
          <>
            <Link
              className="flex items-center gap-1 border-gray-400 rounded-full p-1 border-[0.5px]"
              target="_blank"
              href={`http://twitter.com/share?text=link&url=${link}&hashtags=hashtag1,hashtag2,hashtag3`}
            >
              <BiLogoTwitter />
            </Link>
          </>
        </Tooltip>
        <Tooltip
          componentsProps={componentsProps}
          title="Vào trang chủ Zecky.online"
          arrow
          placement="bottom"
        >
          <>
            <Link
              className="flex items-center gap-1 border-gray-400 rounded-full p-1 border-[0.5px]"
              target="_blank"
              href={`https://zecky.online/`}
            >
              <BiHomeAlt />
            </Link>
          </>
        </Tooltip>

        <Tooltip
          componentsProps={componentsProps}
          title="Theo dõi Fanpage"
          arrow
          placement="bottom"
        >
          <>
            <Link
              className="flex items-center gap-1 border-gray-400 rounded-full p-1 border-[0.5px]"
              target="_blank"
              href={`https://www.facebook.com/profile.php?id=100087004991368`}
            >
              <RiFlagLine />
            </Link>
          </>
        </Tooltip>
      </p>
    </div>
  );
};

export default ShareSocial;
