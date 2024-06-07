"use client";
import { FaAngleRight } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { BiDownload } from "react-icons/bi";
import prettyBytes from "pretty-bytes";
import cliTruncate from "cli-truncate";
import { FaDeleteLeft } from "react-icons/fa6";
import wordsCount from "words-count";
import pluralize from "pluralize";
import JoditEditor from "jodit-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { useEffect, useMemo, useState } from "react";

export default function Get() {
  const [accordion, setAccordion] = useState("item-1");
  const [receivedText, setreceivedText] = useState<any>("");

  useEffect(() => {
    console.log(receivedText);
  }, [receivedText]);
  const [receivedURL, setreceivedURL] = useState<any>("");
  const [validURL, setValidURL] = useState<any>(null);
  const [validText, setValidText] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const stripHTML = (html: any) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder:
        "The most precious thing that we all have with us is time. - Steve Jobs",
      askBeforePasteHTML: false,
      defaultLineHeight: 1.5,
      statusbar: false,
      toolbar: false,
      // theme: "dark",
    }),
    []
  );

  const submit = () => {
    if (receivedText == "" && receivedURL == "" && acceptedFiles.length < 1) {
      setError("Please fill in at least one field before proceeding.");
      return;
    }
    if ((receivedText && !validText) || (receivedURL && !validURL)) {
      setError("Please review for any issues before proceeding.");
      return;
    }
    setError("");
    console.log("asdf");
  };

  useEffect(() => {
    if (receivedURL == "") setValidURL(null);
  }, [receivedURL]);

  const isValidHttpUrl = (string: any) => {
    if (receivedURL == "") {
      setValidURL(null);
      return;
    }
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
      {" "}
      <div
        {...getRootProps()}
        className=" flex justify-center text-white pb-10 md:pb-0 select-none relative"
      >
        <div className="w-full sm:px-10 xl:px-0 flex justify-center place-items-center">
          <div className="flex flex-col justify-cente place-items-center pt-6 w-[768px]">
            <Accordion
              value={accordion}
              type="single"
              collapsible
              className=" bg-neutral-700 rounded-lg w-full select-none"
            >
              <AccordionItem
                value="item-1"
                className={`md:px-8 px-4 rounded-t-xl transition-all duration-500 ${
                  Object.keys(acceptedFiles).length > 0 &&
                  " bg-neutral-400 border-neutral-800"
                }`}
              >
                <AccordionTrigger
                  onMouseDown={() =>
                    setAccordion(accordion == "item-1" ? "" : "item-1")
                  }
                  className={`font-semibold relative ${
                    Object.keys(acceptedFiles).length > 0 && "text-black"
                  }`}
                >
                  File
                  {fileRejections[0]?.errors[0]?.message.length > 0 ? (
                    <div className="absolute right-10">
                      <div className="text-red-400">
                        {fileRejections[0].errors[0].message}
                      </div>
                    </div>
                  ) : acceptedFiles.length > 0 ? (
                    <div className="absolute right-10 ">
                      <div className="text-black flex justify-center place-items-center space-x-2">
                        <div>
                          {" "}
                          {pluralize(
                            "File",
                            Object.keys(acceptedFiles).length,
                            true
                          )}
                          {" - "}
                          {prettyBytes(
                            acceptedFiles.reduce(
                              (acc, curr) => acc + curr.size,
                              0
                            )
                          )}
                        </div>
                        <div
                          className="text-neutral-800"
                          onMouseDown={() => {
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
                    onMouseDown={open}
                    className="w-full md:h-60 h-40 rounded-lg bg-neutral-800 flex justify-center place-items-center"
                  >
                    <input {...getInputProps()} />
                    <div className="flex-col text-neutral-500 md:text-2xl text-lg font-bold flex justify-center place-items-center">
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
                className={`md:px-8 px-4 transition-all duration-500 ${
                  stripHTML(receivedText) != ""
                    ? "bg-neutral-400 text-neutral-800 border-neutral-800"
                    : ""
                }`}
              >
                <AccordionTrigger
                  className={`font-semibold relative ${
                    stripHTML(receivedText) != "" && "text-black"
                  }`}
                  onMouseDown={() =>
                    setAccordion(accordion == "item-2" ? "" : "item-2")
                  }
                >
                  Text
                  {validText && stripHTML(receivedText) != "" ? (
                    <div className="absolute right-10">
                      <div className="text-black">
                        {pluralize("Word", wordsCount(receivedText), true)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <JoditEditor
                    className="active:outline-none hover:outline-none outline-none transition-none"
                    config={config}
                    value={receivedText}
                    onChange={(e) => {
                      setreceivedText(e);
                      stripHTML(receivedText) != "" && setValidText(true);
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className={`md:px-8 px-4 rounded-b-xl border-none transition-all duration-500 ${
                  validURL && "bg-neutral-400"
                }`}
              >
                <AccordionTrigger
                  className={`font-semibold relative ${
                    validURL && "text-black"
                  }`}
                  onMouseDown={() =>
                    setAccordion(accordion == "item-3" ? "" : "item-3")
                  }
                >
                  Link
                  {validURL === false ? (
                    <div className="absolute right-10 ">
                      <div className="text-red-400">
                        Please enter a valid url
                      </div>
                    </div>
                  ) : validURL === true && receivedURL.length > 0 ? (
                    <div className="absolute right-10 ">
                      <div className="text-black">
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
                    className="w-full md:p-4 p-2 md:h-15 h-10 text-white rounded-lg bg-neutral-800 placeholder:text-[#6F6F6F]  md:text-lg flex justify-center place-items-center resize-none active:outline-none hover:outline-none outline-none"
                  ></input>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div
              className="flex pt-6 w-full justify-end place-items-center"
              onMouseDown={submit}
            >
              <div className="bg-zinc-300 hover:bg-neutral-400 duration-100 transition font-medium text-black py-1 px-4 flex justify-center place-items-center rounded-lg md:text-xl text-lg  cursor-pointer">
                Get Words
                <span>
                  <FaAngleRight size={25} color="text-white" className="pl-3" />
                </span>
              </div>
            </div>
            {error ? (
              <div className=" font-semibold w-full flex justify-end pt-4 text-red-400">
                {error}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
