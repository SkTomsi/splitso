"use server";

import type { Bill, BillItem } from "@/features/bills/types";
import { auth } from "@/server/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({});

export async function ScanReceiptAction(billImageUrl: string): Promise<Bill> {
	const session = await auth();

	if (!session?.user) {
		throw new Error("User not logged in");
	}

	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

	const buffer = await fetch(billImageUrl).then((res) => res.arrayBuffer());

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

		const text = result.response.text();

		const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

		try {
			const data = JSON.parse(cleanedText);

			const billData: Bill = {
				address: data.address,
				billTotal: data.billTotal,
				date: data.date,
				gstTotal: data.gstTotal,
				items: data.items.map((item: BillItem) => ({
					amount: item.amount,
					itemTotal: item.amount * item.quantity,
					name: item.name,
					quantity: item.quantity,
				})),
				restaurantName: data.restaurantName,
			};

			return billData;
		} catch (_error) {
			throw new Error("Something went wrong");
		}
	} catch (error) {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
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
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(error);
		throw new Error("Something went wrong");
	}
}
