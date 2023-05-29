import { InputForm } from "@/components/InputForm";
import { useRegisterMutation } from "@/graphql/generated";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { errorMessage } from "@/components/Toasts";
import { ObjectSchema } from "yup";

interface InputFormProps {
  email?: string;
  password?: string;
  name?: string;
  dateOfBirth?: Date | string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  region?: string;
  mobile?: string;
}

export default function Registration() {
  const [inputForm] = useState<InputFormProps>({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    state: "",
    region: "",
    mobile: "",
  });
  const [register, { error }] = useRegisterMutation();
  const router = useRouter();

  const schema: ObjectSchema<InputFormProps> = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail invalido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "No minimo 8 caracteres"),
    name: yup.string().required("Nome obrigatório"),
    dateOfBirth: yup.date().required("Data de nascimento obrigatória"),
    // .test('menorIdade', "Menor de idade", (value) => {
    //   const idade = new Date().getFullYear() - value.getFullYear()
    //   idade > 18 ? false : true
    // }),
    streetName: yup.string().required("Rua obrigatório"),
    streetNumber: yup.string().required("Número obrigatório"),
    postalCode: yup.string().required("Cep obrigatório"),
    city: yup.string().required("Cidade obrigatório"),
    state: yup.string().required("Estado obrigatório"),
    region: yup.string().required("Bairro obrigatório"),
    mobile: yup.string().required("Celular obrigatório"),
  });

  const handlerSubmit = async (values: InputFormProps) => {
    await register({
      variables: {
        email: values?.email!,
        password: values?.password!,
        firstName: values?.name!,
        dateOfBirth: values?.dateOfBirth!,
        streetName: values?.streetName!,
        streetNumber: values?.streetNumber!,
        postalCode: values?.postalCode!,
        city: values?.city!,
        state: values?.state!,
        region: values?.region!,
        mobile: values?.mobile!,
      },
    })
      .then((response) => {
        console.log(response.errors);
        // router.push('/')
      })
      .catch(() => {
        errorMessage(error?.message!);
      });
  };
  const formik = useFormik({
    initialValues: inputForm,
    onSubmit: handlerSubmit,
    validationSchema: schema,
  });
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cadastre-se
        </h2>
      </div>
      <div className="mt-10 p-10 sm:mx-auto md:mx-auto md:min-w-[35rem] md:min-h-[25rem] sm:w-full sm:max-w-sm rounded-md bg-white shadow">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              label="*Nome completo"
              type="text"
              {...formik.getFieldProps("name")}
              error={formik.errors.name}
              touched={formik.touched.name}
            />
            <InputForm
              error={formik.errors.dateOfBirth}
              touched={formik.touched.dateOfBirth}
              {...formik.getFieldProps("dateOfBirth")}
              label="*Data de nascimento"
              type="date"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              error={formik.errors.mobile}
              touched={formik.touched.mobile}
              {...formik.getFieldProps("mobile")}
              label="*Celular"
              type="text"
              mask="(11) 11111-1111"
            />
            <InputForm
              error={formik.errors.postalCode}
              touched={formik.touched.postalCode}
              {...formik.getFieldProps("postalCode")}
              label="*CEP"
              type="text"
              mask="11-111111"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0">
            <InputForm
              error={formik.errors.state}
              touched={formik.touched.state}
              {...formik.getFieldProps("state")}
              label="*Estado"
              type="text"
            />
            <InputForm
              error={formik.errors.city}
              touched={formik.touched.city}
              {...formik.getFieldProps("city")}
              label="*Cidade"
              type="text"
            />
          </div>
          <InputForm
            error={formik.errors.region}
            touched={formik.touched.region}
            {...formik.getFieldProps("region")}
            label="*Bairro"
            type="text"
          />
          <InputForm
            error={formik.errors.streetName}
            touched={formik.touched.streetName}
            {...formik.getFieldProps("streetName")}
            label="*Rua"
            type="text"
          />
          <InputForm
            error={formik.errors.streetNumber}
            touched={formik.touched.streetNumber}
            {...formik.getFieldProps("streetNumber")}
            label="*Número"
            type="text"
          />
          <InputForm
            error={formik.errors.email}
            touched={formik.touched.email}
            {...formik.getFieldProps("email")}
            label="*E-mail"
            type="email"
            autoComplete="email"
          />
          <InputForm
            error={formik.errors.password}
            touched={formik.touched.password}
            {...formik.getFieldProps("password")}
            label="*Senha"
            type="password"
            autoComplete="current-password"
          />
          <div className="text-sm justify-between flex">
            <InputForm
              type="checkbox"
              name="checkbox"
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
