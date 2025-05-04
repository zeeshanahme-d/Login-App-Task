import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/main-logo.png';
import RightSideImg from '../assets/Right-Column-bg.png';
//services
import { LoginRequest, userLogin } from "../services/Auth";
//context
import { useAuth } from "../context/AuthContext";
//components
import Error from "../components/Error";
import CustomInput from "../components/CustomInput";
import Loader from "../components/Loader";


const SignIn: React.FC = () => {
    const { user, setUser } = useAuth();
    const [state, setState] = useState({
        usernameOrEmail: "",
        password: "",
        usernameOrEmailError: "",
        passwordError: "",
        mainError: "",
        isLoading: false,
        passVisibility: false,
    });
    const navigate = useNavigate();


    useEffect(() => {
        let LocalUser = localStorage.getItem("user");
        setUser(JSON.parse(LocalUser!));
        if (LocalUser) {
            navigate("/dashboard");
        }
    }, [user]);

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

        return !error;
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
        } else {
            return true;
        }
    };

    const handleUserLogin = (e: any) => {
        e.preventDefault();

        let emailError = handleEmailValidation(state.usernameOrEmail.trim())
        let passError = handlePasswordValidation(state.password.trim())

        const payload: LoginRequest = {
            method: "POST",
            usernameOrEmail: state.usernameOrEmail.trim(),
            password: state.password.trim(),
        };

        if (!emailError || !passError) {
            return;
        } else {
            setState((prevState) => ({
                ...prevState,
                isLoading: true,
            }));
            handleLoginResponse(payload);
        }

    };

    const handleLoginResponse = (response: LoginRequest) => {
        userLogin(response)
            .then((response) => {
                if (response.message) {
                    setState((prevState) => ({
                        ...prevState,
                        mainError: response.message,
                    }));
                    setTimeout(() => {
                        setState((prevState) => ({
                            ...prevState,
                            mainError: "",
                        }));
                    }, 5000);

                } else {
                    setUser(response);
                    localStorage.setItem("user", JSON.stringify(response));
                    localStorage.setItem("accessToken", response.accessToken);
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            })
            .finally(() => {
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
            });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f5f5]">
            <div className="relative w-[450px] md:w-[900px] md:h-[600px] h-[550px] flex items-center justify-center md:grid md:grid-cols-2 md:items-stretch md:justify-normal bg-white">
                <Loader isLoading={state.isLoading} />
                {/* Left Panel - Form */}
                <div className="py-6 px-6 md:px-10 flex flex-col justify-center">
                    <img src={logo} alt="logo" className="mb-6 w-[150px]" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Welcome back</h1>
                        <p className="text-gray-600 text-sm md:text-base">You need to be signed in to access the project dashboard.</p>
                        <Error error={state.mainError} />

                        <form className="space-y-3 mt-6">
                            {/* Email or Username */}
                            <CustomInput
                                name="usernameOrEmail"
                                id="usernameOrEmail"
                                label="Email or username"
                                type="text"
                                placeholder="wesley.mendoza@example.com"
                                value={state.usernameOrEmail}
                                error={state.usernameOrEmailError}
                                disabled={false}
                                state={state}
                                setState={setState}
                            />

                            {/* Password */}
                            <CustomInput
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={state.password}
                                error={state.passwordError}
                                disabled={false}
                                state={state}
                                setState={setState}
                            />

                            {/* Options */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    Keep me signed in
                                </label>
                                <Link to="/" className="text-black font-medium underline hover:no-underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="button"
                                className={`w-full bg-green-500 text-white hover:bg-green-600 py-2 rounded-md transition ${state.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
                            <Link to="/" className="text-black font-medium underline hover:no-underline">
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
