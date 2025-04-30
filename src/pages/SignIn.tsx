import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/main-logo.png';
import RightSideImg from '../assets/Right-Column-bg.png';
import { LoginRequest, userLogin } from "../services/Auth";



const SignIn: React.FC = () => {
    const [passVisibility, setPassVisibility] = useState(false);
    const [state, setState] = useState({
        usernameOrEmail: "",
        password: "",
        usernameOrEmailError: "",
        passwordError: "",
        isLoading: false,
        passVisibility: false,
    })

    const togglePasswordVisibility = () => {
        setState((prevState) => ({
            ...prevState,
            passVisibility: !prevState.passVisibility,
        }));
    };

    const handleEmailValidation = (usernameOrEmail: string) => {
        const isEmail = usernameOrEmail.includes("@");

        let error = "";

        if (isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(usernameOrEmail)) {
                error = "Please enter a valid email address.";
            }
        } else {
            if (usernameOrEmail.length < 4) {
                error = "Username must be at least 4 characters long.";
            }
        }

        setState((prevState) => ({
            ...prevState,
            usernameOrEmailError: error,
        }));
    };


    const handlePasswordValidation = (password: string) => {
        const passwordErrors: string[] = [];
        if (password.length < 8) passwordErrors.push("at least 8 characters");
        // if (!/[A-Z]/.test(password)) passwordErrors.push("an uppercase letter");
        // if (!/[a-z]/.test(password)) passwordErrors.push("a lowercase letter");
        // if (!/[0-9]/.test(password)) passwordErrors.push("a number");

        if (passwordErrors.length) {
            setState((prevState) => ({
                ...prevState,
                passwordError: `Password must contain: ${passwordErrors.join(", ")}.`,
            }));
            return;
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: value,
            };

            if (name === "usernameOrEmail") {
                updatedState.usernameOrEmailError = "";
            }

            if (name === "password") {
                updatedState.passwordError = "";
            }

            return updatedState;
        });
    };


    const handleUserLogin = (e: any) => {
        e.preventDefault();

        // Email or username validation
        handleEmailValidation(state.usernameOrEmail.trim());


        // Password validation
        handlePasswordValidation(state.password.trim());

        // Validated payload
        const payload: LoginRequest = {
            method: "POST",
            usernameOrEmail: state.usernameOrEmail.trim(),
            password: state.password.trim(),
        };

        console.log("Validated Payload:", payload);

        userLogin(payload);
    };

    return (
        <div className="min-h-screen w-fu;; flex items-center justify-center bg-[#f5f5f5]">
            <div className="w-[450px] md:w-[900px] h-[600px] flex items-center justify-center md:grid md:grid-cols-2 md:items-stretch md:justify-normal bg-white">

                {/* Left Panel - Form */}
                <div className="py-6 px-6 md:px-10 flex flex-col justify-center">
                    <img src={logo} alt="logo" className="mb-6 w-[150px]" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Welcome back</h1>
                        <p className="text-gray-600 text-sm md:text-base">You need to be signed in to access the project dashboard.</p>

                        <form className="space-y-3 mt-6">
                            {/* Email */}
                            <div className="mt-4">
                                <>
                                    <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
                                        Email or username
                                    </label>
                                    <input
                                        id="usernameOrEmail"
                                        type="text"
                                        name="usernameOrEmail"
                                        placeholder="wesley.mendoza@example.com"
                                        className=" block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        onChange={handleOnChange}
                                        value={state.usernameOrEmail}
                                    />
                                </>
                                {state.usernameOrEmailError && <p className="text-sm text-[#ed4337]">{state.usernameOrEmailError}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={state.passVisibility ? "text" : "password"}
                                        placeholder="••••••••"
                                        className=" block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        onChange={handleOnChange}
                                        value={state.password}
                                    />
                                    {/* Password visibility toggle icon*/}
                                    <div className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                                        {!state.passVisibility ? <FaRegEyeSlash className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
                                            :
                                            <FaRegEye className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
                                        }
                                    </div>
                                </div>
                                {state.passwordError && <p className="text-sm text-[#ed4337]">{state.passwordError}</p>}
                            </div>

                            {/* Options */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    Keep me signed in
                                </label>
                                <Link to="#" className="text-black font-medium underline hover:no-underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="button"
                                className="w-full bg-green-500 text-white hover:bg-green-600 py-2 rounded-md transition"
                                onClick={handleUserLogin}
                                disabled={state.isLoading}
                            >
                                Sign in
                            </button>

                            {/* Google Button */}
                            <button
                                type="button"
                                className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-2 rounded-md transition"
                            >
                                <FcGoogle />
                                Sign in with Google
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="mt-4 text-sm text-center text-gray-600">
                            Haven’t joined yet?{" "}
                            <Link to="/signup" className="text-black font-medium underline hover:no-underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Panel - Image */}
                <div className="hidden md:block">
                    <img
                        src={RightSideImg}
                        alt="Building"
                        className="object-cover h-full w-full"
                    />
                </div>

            </div>
        </div>
    );
};

export default SignIn;
