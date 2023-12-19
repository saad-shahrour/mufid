"use client";
 
import { UploadButton } from "../../utils/uploadthing";
import styles from "./BundleButton.module.scss" 

export default function BundleButtonForm() {
  return (
      <UploadButton 
        className="items-start ut-button:bg-gray-500 ut-button:ut-readying:bg-gray-500/50"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          
          console.log("Files: ", res);
          console.log(true);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
  );
}