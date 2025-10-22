import { useApi } from "@/ApiProvider";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/Components/ui/input-otp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessagePopup } from "../../Components/MessagePopup";
export const Login = ({ handleChange, formData }) => {
	const [loginError, setLoginError] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [otpSent, setOtpSent] = useState(false);
	const [otpCode, setOtpCode] = useState("");
	const [isLoading, setIsLoading] = useState("");
	const [popup, setPopup] = useState({ message: "", type: "" });
	const navigate = useNavigate();
	const api = useApi();

	const validate = (values) => {
		const errors = {};
		if (!values.username.trim()) {
			errors.username = "اسم المستخدم مطلوب!";
		}
		if (!values.password.trim()) {
			errors.password = "كلمة المرور مطلوبة!";
		}
		return errors;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const errors = validate(formData);
		setFormErrors(errors);
		if (Object.keys(errors).length > 0) return;

		setIsLoading(true);

		const [result, status, error] = await api.post("/token/", formData);

		if (!error && status >= 200 && status < 300) {
			if (
				result.message ===
				"OTP sent to your email. Enter OTP to proceed."
			) {
				setOtpSent(true);
				setPopup({
					message: "تم إرسال رمز OTP إلى بريدك الإلكتروني.",
					type: "success",
				});
			} else if (result.access && result.refresh) {
				localStorage.setItem("accessToken", result.access);
				localStorage.setItem("refreshToken", result.refresh);
				navigate("/");
			} else {
				setLoginError(
					result.detail || "إسم المستخدم أو كلمة المرور غير صحيحة"
				);
			}
		} else {
			console.error("Login failed:", error || result);
			console.log(error);
			setLoginError("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.");
		}

		setIsLoading(false);
	};

	const handleOtpSubmit = async (e) => {
		e.preventDefault();

		if (!otpCode.trim()) {
			alert("يرجى إدخال رمز OTP.");
			return;
		}

		setIsLoading(true);

		const body = {
			username: formData.username,
			otp: otpCode,
		};

		const [tokens, status, error] = await api.post("/token/verify/", body);

		if (!error && status >= 200 && status < 300) {
			setPopup({ message: "تم التحقق من OTP بنجاح.", type: "success" });
			navigate("/home");
		} else {
			console.error("OTP verification failed:", error || tokens);
			setPopup({
				message: "فشل التحقق من OTP. حاول مرة أخرى.",
				type: "error",
			});
		}

		setIsLoading(false);
	};

	const handleResendOtp = async () => {
		setIsLoading(true);
		setOtpCode("");

		const [result, status, error] = await api.post("/admin/login/", {
			username: data.username,
			password: data.password,
			secret_key: data.secretKey,
		});

		if (!error && status >= 200 && status < 300) {
			setPopup({
				message: "تم إرسال رمز OTP جديد إلى بريدك الإلكتروني.",
				type: "success",
			});
		} else {
			setPopup({
				message: "فشل إرسال رمز OTP. حاول مرة أخرى.",
				type: "error",
			});
		}

		setIsLoading(false);
	};

	return (
		<div
			dir='rtl'
			className='flex items-center justify-center min-h-screen w-dvw bg-gray-200'>
			<div className='bg-white shadow-lg rounded-lg py-4 px-8 w-full max-w-[22em]'>
				<h2 className='text-[1.2em] font-bold text-center text-gray-700 mb-6'>
					{otpSent ? "تحقق من OTP" : "تسجيل الدخول"}
				</h2>
				<form
					onSubmit={otpSent ? handleOtpSubmit : handleSubmit}
					className='space-y-4'>
					{!otpSent ? (
						<>
							<div>
								<label className='block text-[0.7em] text-gray-600 mb-1 '>
									إسم المستخدم
								</label>
								<input
									type='text'
									name='username'
									value={formData.username}
									onChange={handleChange}
									className='custom-input w-full py-1 px-3'
								/>
								{formErrors.username && (
									<p className='text-red-500 text-[0.6em]'>
										{formErrors.username}
									</p>
								)}
							</div>
							<div>
								<label className='block text-[0.7em] text-gray-600 mb-1'>
									كلمة المرور
								</label>
								<input
									type='password'
									name='password'
									value={formData.password}
									onChange={handleChange}
									className='custom-input w-full py-1 px-3'
								/>
								{formErrors.password && (
									<p className='text-red-500 text-[0.6em]'>
										{formErrors.password}
									</p>
								)}
								<Link
									className='text-[0.7em] text-green-600 hover:underline block mt-1'
									to='/forgot-password'>
									نسيت كلمة المرور؟
								</Link>
								{loginError && (
									<p className='text-red-500 text-[0.7em] mt-2'>
										{loginError}
									</p>
								)}
							</div>
							<button
								type='submit'
								className='custom-button text-[0.9em] py-1 px-2 w-full mt-0 rounded-[5px]'
								disabled={isLoading}>
								{isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
							</button>
						</>
					) : (
						<>
							<div className='max-w-md mx-auto space-y-4'>
								<div>
									<label className='block text-[0.8em] text-gray-600 mb-2'>
										أدخل رمز OTP
									</label>
									<div
										className='flex justify-center'
										dir='ltr'>
										<InputOTP
											maxLength={6}
											value={otpCode}
											onChange={(value) =>
												setOtpCode(value)
											}>
											<InputOTPGroup>
												<InputOTPSlot
													index={0}
													className='w-10 h-10 text-lg border-gray-300'
												/>
												<InputOTPSlot
													index={1}
													className='w-10 h-10 text-lg border-gray-300'
												/>
												<InputOTPSlot
													index={2}
													className='w-10 h-10 text-lg border-gray-300'
												/>
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot
													index={3}
													className='w-10 h-10 text-lg border-gray-300'
												/>
												<InputOTPSlot
													index={4}
													className='w-10 h-10 text-lg border-gray-300'
												/>
												<InputOTPSlot
													index={5}
													className='w-10 h-10 text-lg border-gray-300'
												/>
											</InputOTPGroup>
										</InputOTP>
									</div>
								</div>

								<button
									type='submit'
									className='w-full custom-button py-2 rounded-sm transition disabled:opacity-50 disabled:cursor-not-allowed'
									disabled={
										isLoading || otpCode.length !== 6
									}>
									{isLoading
										? "جاري التحقق..."
										: "تحقق من OTP"}
								</button>

								<button
									type='button'
									onClick={handleResendOtp}
									className='w-full text-center text-[0.8em] text-green-600 hover:underline'
									disabled={isLoading}>
									إعادة إرسال رمز OTP
								</button>

								<button
									type='button'
									onClick={() => {
										setOtpSent(false);
										setOtpCode("");
									}}
									className='w-full text-center text-[0.8em] text-gray-600 hover:underline'>
									العودة إلى تسجيل الدخول
								</button>
							</div>
						</>
					)}
				</form>
				<p className='mt-2 text-center text-[0.7em] text-gray-600'>
					لا تملك حساب؟{" "}
					<Link
						className='text-green-600 hover:underline'
						to='/register'>
						إنشاء حساب
					</Link>
				</p>
			</div>
			<MessagePopup
				message={popup.message}
				type={popup.type}
				onClose={() => setPopup({ message: "", type: "" })}
			/>
		</div>
	);
};
