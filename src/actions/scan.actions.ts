"use server";

import { auth } from "@/server/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UTApi } from "uploadthing/server";
import type { ClientUploadedFileData } from "uploadthing/types";

const utapi = new UTApi({});

export async function ScanReceiptAction(
	files: ClientUploadedFileData<{ uploadedBy: string }>[],
) {
	const session = await auth();

	if (!session?.user) {
		throw new Error("User not logged in");
	}

	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = `
      Analyze this receipt image and extract the following information in JSON format:

      - Item Name
      - Item Rate (rate of a single quantity)
      - Item Quantity
      - Total amount of that item 
      - GST amounts
      - Date of the transaction
      - Bill Total
      - GST Total

      
      Only respond IN THIS VALID JSON FORMAT:

      {
       restaurantName: "string",
       billTotal: number,
       gstTotal: number,
       date: "ISO date string",
       address: "string",
       items: [  
            {
                "amount": number,
				"quantity": number,
                "date": "ISO date string",
                "name": "string",
                "category": "string"
				"itemTotal": number (amount * quantity)
            }
        ]
      }

      things to note:

      - Make sure the item data is scanned correctly
      - Rest data is optional
      - Make sure the date is in ISO format

      

      If its not a recipt, return an empty object
    `;

	const image = files[0].url;

	const buffer = await fetch(image).then((res) => res.arrayBuffer());

	try {
		const result = await model.generateContent([
			{
				inlineData: {
					data: Buffer.from(buffer).toString("base64"),
					mimeType: "image/jpeg",
				},
			},
			prompt,
		]);

		if (!result) {
			throw new Error("Something went wrong");
		}

		return result.response.text();
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong");
	}
}

export async function DeleteReceiptAction({ fileKey }: { fileKey: string }) {
	if (!fileKey) {
		throw new Error("No file url provided");
	}

	try {
		const res = await utapi.deleteFiles([fileKey]);
		if (!res.success) {
			throw new Error("Error while deleting your file");
		}

		return true;
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong");
	}
}
