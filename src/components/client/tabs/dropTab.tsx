"use client";
import * as React from "react";
import { useCallback, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { Card, CardContent } from "@/components/ui/card";
import PropagateLoader from "react-spinners/PropagateLoader";
import { ErrorCode, useDropzone } from "react-dropzone";

const DropTab = ({
  setData,
  maxFileSize,
  maxTextChar,
  maxFileSizeUnit,
  className,
  loading,
}: any) => {
  const [receivedFile, setreceivedFile] = useState<any>(null);
  const [receivedText, setreceivedText] = useState<any>(null);
  const [receivedURL, setreceivedURL] = useState<any>(null);

  const [FileErrorMessage, setFileErrorMessage] = useState<any>("");
  const [TextErrorMessage, setTextErrorMessage] = useState<any>("");
  const [URLErrorMessage, setURLErrorMessage] = useState<any>("");

  function isValidHttpUrl(string: any) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const uploadvalidation = () => {
    let isValid = true;

    if (
      receivedURL != null &&
      receivedURL.length > 0 &&
      !isValidHttpUrl(receivedURL)
    ) {
      setURLErrorMessage("Invalid URL");
      isValid = false;
    } else {
      setURLErrorMessage("");
    }
    if (receivedText != null && receivedText.length > maxTextChar) {
      setTextErrorMessage("Your text is too long");
      isValid = false;
    } else {
      setTextErrorMessage("");
    }

    return isValid;
  };

  const handleDataSubmission = () => {
    const isValid = uploadvalidation();
    if (isValid && TextErrorMessage === "" && URLErrorMessage === "") {
      setData({
        file: receivedFile,
        text: receivedText,
        url: receivedURL,
      });
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (rejectedFiles.length > 0) {
        const errorCode = rejectedFiles[0].errors[0].code;
        let FileErrorMessage = "";

        switch (errorCode) {
          case ErrorCode.FileInvalidType:
            FileErrorMessage =
              "Invalid file type. Please upload a supported file";
            break;
          case ErrorCode.FileTooLarge:
            FileErrorMessage = `Maximum size allowed is ${maxFileSize} ${maxFileSizeUnit}.`;
            break;
          default:
            FileErrorMessage =
              "An error occurred while uploading the file. Please try again";
        }

        setFileErrorMessage(FileErrorMessage);
        uploadvalidation();
      } else {
        setreceivedFile(acceptedFiles[0]);
        setFileErrorMessage("");
      }
    },
    [maxFileSize, maxFileSizeUnit, uploadvalidation]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: 1,
    maxSize: maxFileSize * 1024 * 1024, //20MB
    multiple: false,
    disabled: loading,
  });
  return (
    <Card className={className} {...getRootProps()}>
      <CardContent className="flex h-[100%] flex-col">
        <div className="flex flex-1 pt-6 md:space-x-4 space-y-4 md:space-y-0 md:flex-row flex-col">
          <div className="w-full flex flex-col relative h-40 md:h-full">
            <h1 className=" font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20">
              File
            </h1>
            <div
              onClick={open}
              className={`bg-[#FFF2E1] relative select-none cursor-pointer rounded-lg flex-1 flex flex-col justify-center place-items-center border-dashed border-2 border-[#EAD8C0] ${
                isDragActive ? "border-[#A79277]" : ""
              } ${FileErrorMessage ? "border-red-300" : "border-[#EAD8C0]"}`}
            >
              <input {...getInputProps()} disabled={loading} />
              <p
                className={
                  !receivedFile?.name
                    ? `font-semibold text-[#A79277] text-3xl text-center`
                    : `font-semibold text-[#544c42] text-xl text-center p-2`
                }
              >
                {isDragActive
                  ? "Drop here"
                  : receivedFile
                  ? receivedFile?.name
                  : "Drag & Drop"}
              </p>
              {!receivedFile && (
                <p className=" font-semibold text-[#A79277] text-lg select-none">
                  or click here
                </p>
              )}
              {FileErrorMessage && (
                <div className="absolute bottom-0 p-2 text-sm">
                  <p className=" font-semibold text-red-400 text-center">
                    {FileErrorMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col relative h-52 md:h-full">
            <h1 className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20">
              Text
            </h1>
            {TextErrorMessage && (
              <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
                {TextErrorMessage}
              </p>
            )}
            <textarea
              disabled={loading}
              maxLength={maxTextChar}
              onChange={(e) => setreceivedText(e.target.value)}
              placeholder={`The most precious thing that we all have with us is time. ${`\n`}- Steve Jobs`}
              className={`resize-none h-full mb-4 w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
                TextErrorMessage != "" ? "border-red-300" : "border-[#EAD8C0]"
              }`}
            ></textarea>
            <div className="relative">
              <h1 className="font-semibold text-[#776B5D] bg-[#F8F7F4] px-1 py-[1px] rounded-lg text-lg absolute -right-3 -top-3  z-20">
                URL
              </h1>
              {URLErrorMessage && (
                <p className="text-sm text-red-400 text-center absolute z-40 -top-2 left-[50%] -translate-x-[50%] bg-white px-1 rounded-lg">
                  {URLErrorMessage}
                </p>
              )}
              <input
                disabled={loading}
                type="url"
                onChange={(e) => setreceivedURL(e.target.value)}
                placeholder="https://www.ftword.com"
                className={`w-full active:outline-none hover:outline-none outline-none border-2 rounded-lg p-2 relative ${
                  URLErrorMessage != "" ? "border-red-300" : "border-[#EAD8C0]"
                }`}
              ></input>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col pt-4">
          {loading ? (
            <div className="w-full h-10 bg-[#776B5D] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center">
              <PropagateLoader color="white" size={15} className="mb-4" />
            </div>
          ) : receivedFile != null ||
            (receivedText != null && receivedText.trim() !== "") ||
            (receivedURL != null && receivedURL.trim() !== "") ? (
            <div
              onClick={handleDataSubmission}
              className="w-full select-none h-10 bg-[#776B5D] hover:bg-[#544c42] rounded-lg text-[#F6F5F3] text-lg font-bold flex justify-center place-items-center cursor-pointer"
            >
              To Words{" "}
              <span>
                <GrFormNext size={25} />
              </span>
            </div>
          ) : (
            <div className="w-full select-none h-10 bg-[#F8F7F5] text-[#9CA3AF] rounded-lg text-lg font-bold flex justify-center place-items-center">
              To Words{" "}
              <span>
                <GrFormNext size={25} />
              </span>
            </div>
          )}
          <div className="text-[#776B5D] select-none text-sm flex w-full justify-end place-items-center pt-2 underline cursor-pointer">
            Upgrade to Pro
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DropTab;
