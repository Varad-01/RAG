"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Database, MoveUp, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const VectorDBPage = (props: Props) => {
  const [isUploading, setisUploading] = useState(false);
  const [indexname, setIndexname] = useState("");
  const [namespace, setNamespace] = useState("");
  const [fileListAsText, setfileListAsText] = useState("");

  const [filename, setFilename] = useState("");
  const [progress, setProgress] = useState(0);

  const onFileListRefresh = async () => {
    setfileListAsText("");
    const response = await fetch("api/getfilelist", { method: "GET" });
    const filenames = await response.json();
    const resultString = (filenames as [])
      .map((filename) => `📄 ${filename}`)
      .join("\n");
    setfileListAsText(resultString);
  };

  const onStartUpload = async () => {
    setProgress(0);
    setFilename("");
    setisUploading(true);
    const response = await fetch("api/updatedatabase", {
      method: "POST",
      body: JSON.stringify({
        indexname,
        namespace,
      }),
    });
    await processStreamedProgress(response);
  };

  async function processStreamedProgress(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) {
      console.error("Reader was not found");
      return;
    }
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setisUploading(false);
          break;
        }

        const data = new TextDecoder().decode(value);
        const { filename, totalChunks, chunksUpserted, isComplete } =
          JSON.parse(data);
        const currentProgress = (chunksUpserted / totalChunks) * 100;
        setProgress(currentProgress);
        setFilename(`${filename} [${chunksUpserted}/${totalChunks}]`);
      }
    } catch (error) {
      console.error("Error reading response: ", error);
    } finally {
      reader.releaseLock();
    }
  }

  return (
    <main className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl bg-white">
        <CardHeader className="bg-indigo-600 p-8 rounded-t-2xl">
          <CardTitle className="text-3xl font-bold text-white">
            Update Knowledge Base
          </CardTitle>
          <CardDescription className="text-sm text-white opacity-80">
            Add new documents to your vector DB seamlessly.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 lg:col-span-1 space-y-4">
              <div className="relative">
                <Button
                  onClick={onFileListRefresh}
                  className="absolute top-0 right-0 transform -translate-x-2 -translate-y-2 bg-transparent text-gray-500 hover:text-gray-700 transition-transform"
                  variant="ghost"
                  size="icon"
                >
                  <RefreshCcw className="w-6 h-6" />
                </Button>
                <Label className="text-lg text-gray-700">Files List:</Label>
                <Textarea
                  readOnly
                  value={fileListAsText}
                  className="min-h-32 w-full resize-none rounded-xl border-2 border-gray-300 bg-gray-50 p-4 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Index Name</Label>
                  <Input
                    value={indexname}
                    onChange={(e) => setIndexname(e.target.value)}
                    placeholder="Enter index name"
                    disabled={isUploading}
                    className="text-gray-700 border-2 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <Label>Namespace</Label>
                  <Input
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="Enter namespace"
                    disabled={isUploading}
                    className="text-gray-700 border-2 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex items-center justify-center">
              <Button
                onClick={onStartUpload}
                variant="outline"
                className="flex items-center justify-center w-full py-4 px-6 text-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400"
                disabled={isUploading}
              >
                <Database className="mr-2 w-6 h-6" />
                <MoveUp className="w-6 h-6" />
                <span className="ml-2">Start Upload</span>
              </Button>
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <Label className="text-lg text-gray-700">
                File Name: {filename}
              </Label>
              <div className="flex items-center space-x-4">
                <Progress
                  value={progress}
                  className="flex-1 h-2 bg-indigo-500 rounded-full"
                />
                <div className="text-gray-600 font-medium">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default VectorDBPage;
