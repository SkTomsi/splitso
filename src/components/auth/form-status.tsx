import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function FormError({
	message,
	status,
}: { message?: string; status?: boolean | null }) {
	const [formMessage, setMessage] = useState<string | undefined>("");
	const [formStatus, setStatus] = useState<boolean | null | undefined>(null);

	useEffect(() => {
		setMessage(message);

		setStatus(status);
	}, [message, status]);

	if (!formMessage) {
		return null;
	}

	let style = "bg-destructive/10 text-destructive border border-destructive/20";

	if (formStatus) {
		style =
			"bg-emerald-500/10 text-emerald-700 border border border-emerald-300/30";
	}

	return (
		<div
			className={`flex items-center gap-2 rounded-md p-3 font-medium ${style}`}
		>
			{status ? (
				<CheckIcon className="h-4 w-4" />
			) : (
				<ExclamationTriangleIcon className="h-4 w-4" />
			)}
			<p className="text-sm">{formMessage}</p>
		</div>
	);
}
