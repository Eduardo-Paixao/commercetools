import {
  useSignInAnonymousCartIdMutation,
  useSignInMutation,
} from "@/graphql/generated";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useSignInMutation();
  const [signInAnonymousCartI] = useSignInAnonymousCartIdMutation();
  const router = useRouter();

  const getCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem("Cart")!);
    if (data.customerEmail !== "") {
      await login({
        variables: {
          email: email,
          password: password,
        },
      })
        .then((response) => {
          localStorage.setItem(
            "Cart",
            JSON.stringify(response.data?.customerSignIn.cart)
          );
          localStorage.setItem(
            "Customer",
            JSON.stringify(response.data?.customerSignIn.customer)
          );
          router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      await signInAnonymousCartI({
        variables: {
          email: email,
          password: password,
          anonymousCartId: data.id,
        },
      })
        .then((response) => {
          localStorage.setItem(
            "Cart",
            JSON.stringify(response.data?.customerSignIn.cart)
          );
          localStorage.setItem(
            "Customer",
            JSON.stringify(response.data?.customerSignIn.customer)
          );
          router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100 h-[71vh] ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 p-10 sm:mx-auto md:mx-auto md:min-w-[30rem] md:min-h-[25rem] sm:w-full sm:max-w-sm rounded-md bg-white shadow">
        <form className="space-y-6" onSubmit={getCredentials}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onBlur={(e) => {
                  setEmail(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ee8726] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ee8726] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="text-sm justify-between flex">
            <input
              type="checkbox"
              className="text-[#ee8726] w-5 h-5 ring-1 ring-inset ring-gray-300 rounded border-none shadow focus:ring-1 focus:ring-[#ee8726] "
            />

            <a
              href="#"
              className="font-semibold text-[#ee8726] hover:opacity-75 "
            >
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#1cb092] flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-[#ee8726] hover:opacity-75 "
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
