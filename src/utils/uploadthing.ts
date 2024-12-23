

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
	generateUploadButton,
	generateUploadDropzone,
} from "@uploadthing/react";
import { UTApi } from "uploadthing/server";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

