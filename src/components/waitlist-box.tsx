"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const cssLoader = `
let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
head.appendChild(link);
`;

export default function WaitlistBox() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return (
			<div className="flex h-full w-full flex-col items-center gap-2">
				<Skeleton className="h-full w-full" />
				<Skeleton className="h-5 w-full" />
			</div>
		);
	}

	return (
		<>
			{loaded && (
				<div className="flex w-full flex-col items-center gap-2">
					<p>Coming Soon!</p>
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: as per docs */}
					<Script type="" dangerouslySetInnerHTML={{ __html: cssLoader }} />

					<Script src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js" />

					<div
						id="getWaitlistContainer"
						data-waitlist_id="22554"
						data-widget_type="WIDGET_2"
					/>
				</div>
			)}
		</>
	);
}
