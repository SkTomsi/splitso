import { NextResponse } from "next/server";

export const middleware = async (request: Request) => {
	return NextResponse.next();
};
