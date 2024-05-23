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

export default function GetWords() {
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
      <div
        {...getRootProps()}
        className="min-h-screen flex justify-center font-OpenSans dark:text-white pb-10 md:pb-0 select-none relative"
      >
        <div className="w-full sm:px-10 px-5 xl:px-0">
          <div className="md:pt-24">
            <Heading />
          </div>
          <div className="flex md:space-x-8 space-x-2 md:pt-14 pt-10 w-full  justify-center place-items-center">
            <Link
              href="/"
              className="bg-white dark:bg-gray  dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              Paste Words
            </Link>
            <Link
              href="/get"
              className="bg-green dark:bg-yellow-dark dark:text-black font-medium w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-white cursor-pointer whitespace-nowrap"
            >
              Get Words
            </Link>
            <Link
              href="/my"
              className="bg-white dark:bg-gray  dark:text-white w-44 h-10 flex justify-center place-items-center rounded-lg tex-sm md:text-xl text-black cursor-pointer whitespace-nowrap"
            >
              My Words
            </Link>
          </div>
          <div className="flex justify-center pt-6">
            <Accordion
              value={accordion}
              type="single"
              collapsible
              className="bg-white dark:bg-gray rounded-lg w-[768px] select-none"
            >
              <AccordionItem
                value="item-1"
                className={`md:px-8 px-4 rounded-t-xl ${
                  Object.keys(acceptedFiles).length > 0 &&
                  "bg-green dark:bg-yellow-dark"
                }`}
              >
                <AccordionTrigger
                  onClick={() =>
                    setAccordion(accordion == "item-1" ? "" : "item-1")
                  }
                  className={`font-semibold relative ${
                    Object.keys(acceptedFiles).length > 0 &&
                    "text-white dark:text-black"
                  }`}
                >
                  File
                  {fileRejections[0]?.errors[0]?.message.length > 0 ? (
                    <div className="absolute right-10">
                      <div className="text-red dark:text-red-light">
                        {fileRejections[0].errors[0].message}
                      </div>
                    </div>
                  ) : acceptedFiles.length > 0 ? (
                    <div className="absolute right-10 ">
                      <div className="text-white dark:text-black flex justify-center place-items-center space-x-2">
                        <div>
                          {" "}
                          {Object.keys(acceptedFiles).length} Files{" - "}
                          {prettyBytes(
                            acceptedFiles.reduce(
                              (acc, curr) => acc + curr.size,
                              0
                            )
                          )}
                        </div>
                        <div
                          className="text-white dark:text-gray"
                          onClick={() => {
                            acceptedFiles.length = 0;
                            acceptedFiles.splice(0, acceptedFiles.length);
                          }}
                        >
                          <FaDeleteLeft size={20} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    onClick={open}
                    className="w-full md:h-60 h-40 rounded-lg bg-yellow dark:bg-gray-dark flex justify-center place-items-center"
                  >
                    <input {...getInputProps()} />
                    <div className="flex-col text-green dark:text-yellow-dark md:text-2xl text-lg font-bold flex justify-center place-items-center">
                      <BiDownload className="text-[50px] md:text-[70px]" />
                      <div>
                        Drag & Drop
                        <span className="text-lg cursor-pointer">
                          {" "}
                          or <span className="hover:underline">click here</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className={`md:px-8 px-4 ${
                  receivedText != "" ? "bg-green dark:bg-yellow-dark" : ""
                }`}
              >
                <AccordionTrigger
                  className={`font-semibold relative ${
                    receivedText != "" && "text-white dark:text-black"
                  }`}
                  onClick={() =>
                    setAccordion(accordion == "item-2" ? "" : "item-2")
                  }
                >
                  Text
                  {validText && receivedText != "" ? (
                    <div className="absolute right-10">
                      <div className="text-white dark:text-black">
                        {cliTruncate(receivedText, 25)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <textarea
                    value={receivedText}
                    maxLength={20971520}
                    onBlur={() => setValidText(true)}
                    onChange={(e) => setreceivedText(e.target.value)}
                    placeholder={`The most precious thing that we all have with us is time. - Steve Jobs`}
                    className="w-full md:p-4 p-2 md:h-60 h-40 text-black dark:text-white font-OpenSans rounded-lg bg-yellow dark:bg-gray-dark  md:text-lg flex justify-center place-items-center resize-none active:outline-none hover:outline-none outline-none"
                  ></textarea>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className={`md:px-8 px-4 rounded-b-xl border-none ${
                  validURL && "bg-green dark:bg-yellow-dark"
                }`}
              >
                <AccordionTrigger
                  className={`font-semibold relative ${
                    validURL && "text-white dark:text-black"
                  }`}
                  onClick={() =>
                    setAccordion(accordion == "item-3" ? "" : "item-3")
                  }
                >
                  Link
                  {validURL === false ? (
                    <div className="absolute right-10 ">
                      <div className="text-red dark:text-red-light">
                        Please enter a valid url
                      </div>
                    </div>
                  ) : validURL === true && receivedURL.length > 0 ? (
                    <div className="absolute right-10 ">
                      <div className="text-white dark:text-black">
                        {cliTruncate(receivedURL, 25)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <input
                    value={receivedURL}
                    onBlur={(e) => isValidHttpUrl(e.target.value)}
                    type="url"
                    onChange={(e) => setreceivedURL(e.target.value)}
                    placeholder="https://www.pastewords.com"
                    className="w-full md:p-4 p-2 md:h-15 h-10 text-black dark:text-white font-OpenSans rounded-lg bg-yellow dark:bg-gray-dark  md:text-lg flex justify-center place-items-center resize-none active:outline-none hover:outline-none outline-none"
                  ></input>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div
            className="flex pt-6 w-full justify-center place-items-center"
            onClick={submit}
          >
            <div className="bg-green dark:bg-yellow-dark dark:text-black  text-white font-medium md:w-80 w-full h-10 flex justify-center place-items-center rounded-lg md:text-xl text-lg  cursor-pointer">
              GET WORDS
              <span>
                <FaAngleRight size={25} color="text-white" className="pl-3" />
              </span>
            </div>
          </div>
          {error ? (
            <div className=" font-semibold w-full flex justify-center pt-4 text-red dark:text-red-light">
              {error}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
