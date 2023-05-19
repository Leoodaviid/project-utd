import { ForwardedRef, forwardRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Error } from "../components/Error";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
}

export const Input = forwardRef(
  (
    { id, label, type, register, errors, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const hasError = errors && errors;

    return (
      <div className="relative">
        <input
          type={type}
          id={id}
          className={`block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer ${
            hasError ? "invalid:border-b-1" : ""
          }`}
          placeholder=" "
          ref={ref}
          {...register}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${
            hasError ? "text-red-500" : ""
          }`}
        >
          {label}
        </label>
        {hasError && <Error />}
      </div>
    );
  }
);
