// src/Components/MessagePopup.jsx
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

export const MessagePopup = ({ message, type, onClose }) => {
	if (!message) return null;

	let icon, title, variant, bgClass;
	switch (type) {
		case "success":
			icon = <CheckCircle2Icon className='h-5 w-5 mr-2 text-green-600' />;
			title = "نجاح";
			variant = "default";
			bgClass = "bg-green-100";
			break;
		case "error":
			icon = <AlertCircleIcon className='h-5 w-5 mr-2 text-red-600' />;
			title = "خطأ";
			variant = "destructive";
			bgClass = "bg-red-100";
			break;
		default:
			icon = <AlertCircleIcon className='h-5 w-5 mr-2 text-gray-500' />;
			title = "تنبيه";
			variant = "default";
			bgClass = "bg-gray-100";
	}

	return (
		<div dir='rtl' className='fixed top-4 z-50 right-2 w-[90%] max-w-sm '>
			<Alert
				variant={variant}
				className={`relative ${bgClass} animate-scale-in`}>
				{icon}

				<div className='mr-2'>
					<AlertTitle className={"flex inlne"}>{title}</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</div>

				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-sm text-gray-500 hover:text-gray-800'>
					✕
				</button>
			</Alert>

			<style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
		</div>
	);
};
