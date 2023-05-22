import { InputForm } from "@/components/InputForm";
import { useRegisterMutation } from "@/graphql/generated";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

interface InputFormProps {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  state?: string;
  region?: string;
  mobile?: string;
}

export default function Registration() {
  const [inputForm, setInputForm] = useState<InputFormProps>();
  const [register] = useRegisterMutation();
  const router = useRouter();

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register({
      variables: {
        email: inputForm?.email!,
        password: inputForm?.password!,
        firstName: inputForm?.firstName!,
        lastName: inputForm?.lastName!,
        dateOfBirth: inputForm?.dateOfBirth!,
        streetName: inputForm?.streetName!,
        streetNumber: inputForm?.streetNumber!,
        postalCode: inputForm?.postalCode!,
        city: inputForm?.city!,
        state: inputForm?.state!,
        region: inputForm?.region!,
        mobile: inputForm?.mobile!,
      },
    })
      .then((response) => {
        console.log(response);
        router.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(inputForm);
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cadastre-se
        </h2>
      </div>

      <div className="mt-10 p-10 sm:mx-auto md:mx-auto md:min-w-[35rem] md:min-h-[25rem] sm:w-full sm:max-w-sm rounded-md bg-white shadow">
        <form className="space-y-6" onSubmit={handlerSubmit}>
          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              onChange={(e) =>
                setInputForm({ ...inputForm, firstName: e.target.value })
              }
              label="Nome"
              type="text"
              id="name"
            />
            <InputForm
              onChange={(e) =>
                setInputForm({ ...inputForm, lastName: e.target.value })
              }
              label="Sobre nome"
              type="text"
              id="lastName"
            />
          </div>

          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              onChange={(e) =>
                setInputForm({
                  ...inputForm,
                  dateOfBirth: e.target.value,
                })
              }
              label="Data de avniversário"
              type="date"
              id="date"
            />

            <InputForm
              onChange={(e) =>
                setInputForm({ ...inputForm, mobile: e.target.value })
              }
              label="Celular"
              type="number"
              id="cell"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              onChange={(e) =>
                setInputForm({ ...inputForm, postalCode: e.target.value })
              }
              label="CEP"
              type="text"
              id="postalcode"
            />

            <InputForm
              onChange={(e) =>
                setInputForm({ ...inputForm, state: e.target.value })
              }
              label="Estado"
              type="text"
              id="state"
            />
          </div>
          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, city: e.target.value })
            }
            label="Cidade"
            type="text"
            id="city"
          />
          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, region: e.target.value })
            }
            label="Bairro"
            type="text"
            id="neighborhood"
          />
          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, streetName: e.target.value })
            }
            label="Rua"
            type="text"
            id="street"
          />
          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, streetNumber: e.target.value })
            }
            label="Número"
            type="text"
            id="number"
          />

          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, email: e.target.value })
            }
            label="E-mail"
            type="email"
            id="email"
            autoComplete="email"
          />
          <InputForm
            onChange={(e) =>
              setInputForm({ ...inputForm, password: e.target.value })
            }
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <div className="text-sm justify-between flex">
            <InputForm
              type="checkbox"
              id="checkbox"
              className="cursor-pointer text-[#ee8726] w-5 h-5 ring-1 ring-inset ring-gray-300 rounded border-none shadow focus:ring-1 focus:ring-[#ee8726] "
            />
            <a className="ml-3 font-semibold text-[#ee8726] text-left">
              Autorizo o Commercetools a me enviar mensagens por e-mail ou SMS
              com promoções e informações de meu interesse.
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#1cb092] flex w-full justify-center rounded-md px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:opacity-75"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
