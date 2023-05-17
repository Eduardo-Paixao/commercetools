import {
  useCreateCartMutation,
  useGetProductsQuery,
  useUpdateCartMutation,
} from "@/graphql/generated";
import { formatCurrency } from "../../util/formatCurrency";
import React from "react";
import Image from "next/image";


export const ProductList = () => {
  const [creatCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const { data } = useGetProductsQuery();

  const initialCart = async (sku: string) => {
    const data = JSON.parse(localStorage.getItem("Cart")!);
    if (localStorage.getItem("Cart")) {
      await updateCart({
        variables: {
          cartId: data.id,
          sku: sku,
          version: data.version,
        },
      })
        .then((response) => {
          localStorage.setItem(
            "Cart",
            JSON.stringify(response.data?.updateCart)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await creatCart({
        variables: {
          sku: sku,
        },
      })
        .then((response) => {
          localStorage.setItem(
            "Cart",
            JSON.stringify(response.data?.createCart)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bg-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Commercetools
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.products.results.map((product) => (
            <div className="flex-col">
              <div key={product.id} className="relative group">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={
                      product.masterData.current?.masterVariant.images[0].url
                    }
                    alt={product.masterData.current?.name!}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={"#"}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.masterData.current?.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(
                      product.masterData.current?.masterVariant.price?.value
                        .centAmount
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  initialCart(product.masterData.current?.masterVariant.sku!)
                }
                className="bg-[#1cb092] text-white font-bold py-1 px-2 rounded-md text-sm w-full h-9 mt-2 hover:opacity-75"
              >
                <Image
                  src="/images/cart-white.png"
                  alt="Add to Cart"
                  width={20}
                  height={20}
                  className="mr-2 inline-block"
                />
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
