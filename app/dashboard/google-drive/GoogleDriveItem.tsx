"use client";
import React, { useCallback, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IGoogleDrive } from "./page";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { handleCopyClick } from "@/app/sevices/untils";
const handleCopyText = () => {};
interface googleDriveItemProps {
  item: IGoogleDrive;
  handleDelete: (id: string) => void;
}
const GoogleDriveItem: React.FC<googleDriveItemProps> = ({
  item,
  handleDelete,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <tr>
      <td>
        <span className="max-w-[100px] px-2 overflow-hidden text-ellipsis inline-block whitespace-nowrap">
          {item.name}
        </span>
      </td>
      <td>
        <span>
          <button
            onClick={() =>
              handleCopyClick("https://drive.google.com/uc?id=" + item.id)
            }
            className="py-1 rounded-full px-2 cursor-pointer bg-blue-500"
          >
            Copy Link
          </button>
        </span>
      </td>
      <td>
        <span>{item.mimeType}</span>
      </td>
      <td>
        <span className="flex justify-center items-center">
          {item.mimeType.includes("image") ? (
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
              <img
                className="object-cover w-10 h-10"
                width={60}
                height={60}
                alt="error"
                src={`https://drive.google.com/uc?id=${item.id}`}
              />
            </ControlledZoom>
          ) : item.mimeType.includes("video") ? (
            <>
              <audio
                className="w-32"
                controls
                src={`https://drive.google.com/uc?export=download&id=${item.id}`}
              ></audio>
            </>
          ) : (
            item.mimeType
          )}
        </span>
      </td>
      <td>
        <span className="text-3xl">
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
          >
            <BiTrash />
          </button>
        </span>
      </td>
    </tr>
  );
};

export default GoogleDriveItem;
