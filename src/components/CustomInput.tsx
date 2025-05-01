import React from 'react'
//components
import Error from './Error';
//icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface CustomInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    error?: string | null;
    name: string;
    id: string;
    required?: boolean;
    disabled?: boolean;
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {

    const { label, type, placeholder, value, error, name, id, state, setState } = props;

    const togglePasswordVisibility = () => {
        setState((prevState: any) => ({
            ...prevState,
            passVisibility: !prevState.passVisibility,
        }));
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState: any) => {
            const updatedState = {
                ...prevState,
                [name]: value,
            };

            if (name === "usernameOrEmail") {
                updatedState.usernameOrEmailError = "";
                updatedState.disabledBtn = false;
            }

            if (name === "password") {
                updatedState.passwordError = "";
                updatedState.disabledBtn = false;
            }

            if (value.length < 1) {
                updatedState.disabledBtn = true;
            }

            return updatedState;
        });
    };


    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={type === "password" && state.passVisibility ? "text" : type}
                    placeholder={placeholder}
                    className=" block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onChange={handleOnChange}
                    value={value}
                />

                <div className={`absolute inset-y-0 right-3 items-center text-gray-400 cursor-pointer ${name == "password" ? "flex" : "hidden"}`}>
                    {!state.passVisibility ? <FaRegEyeSlash className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
                        :
                        <FaRegEye className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
                    }
                </div>

            </div>
            <Error error={error} />
        </div>
    )
}


export default CustomInput;
