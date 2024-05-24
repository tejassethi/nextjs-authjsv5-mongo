"use client";
import { FaAngleRight } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { BiDownload } from "react-icons/bi";
import prettyBytes from "pretty-bytes";
import cliTruncate from "cli-truncate";
import { FaDeleteLeft } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import Navbar from "@/components/client/navbar";
import Link from "next/link";
import Heading from "@/components/client/heading";

export default function MyWords() {
  const [accordion, setAccordion] = useState("item-1");
  const [receivedText, setreceivedText] = useState<any>("");
  const [receivedURL, setreceivedURL] = useState<any>("");
  const [validURL, setValidURL] = useState<any>(null);
  const [validText, setValidText] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const submit = () => {
    if (receivedText == "" && receivedURL == "" && acceptedFiles.length < 1) {
      setError("Please fill in at least one field before proceeding.");
    }
    if (receivedText && !validText) {
      setError("Please review for any issues before proceeding.");
      return;
    }
    if (receivedURL && !validURL) {
      setError("Please review for any issues before proceeding.");
      return;
    }
    return;
  };

  const isValidHttpUrl = (string: any) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    setValidURL(!!urlPattern.test(string));
    return !!urlPattern.test(string);
  };

  const MAX_SIZE = 50 * 1024 * 1024;

  const fileValidator = (acceptedFiles: any, fileRejections: any) => {
    const totalSize = acceptedFiles.reduce(
      (acc: any, file: any) => acc + file.size,
      0
    );
    if (totalSize > MAX_SIZE) {
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);
      fileRejections.push({
        file: null,
        errors: [
          {
            code: "file-too-large",
            message: `Maximum size: ${prettyBytes(MAX_SIZE)}`,
          },
        ],
      });
      console.log(acceptedFiles);
    }
  };
  const { getRootProps, getInputProps, acceptedFiles, fileRejections, open } =
    useDropzone({
      noClick: true,
      multiple: true,
      onDropAccepted: () => setAccordion("item-2"),
      onDrop: fileValidator,
    });

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative">
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="md:pt-20">
            <Heading />
          </div>
          <div className="flex md:space-x-8 space-x-2 md:pt-14 pt-10 w-full  justify-center place-items-center">
            <Link
              href="/"
              className="bg-white dark:bg-gray dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              Paste Words
            </Link>
            <Link
              href="/get"
              className="bg-white dark:bg-gray dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              Get Words
            </Link>
            <Link
              href="/my"
              className="bg-green dark:bg-yellow-dark dark:text-black font-medium w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-white cursor-pointer whitespace-nowrap"
            >
              My Words
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
