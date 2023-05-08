import { useGetProductsQuery } from "@/graphql/generated";
export default function Home() {
  const { data } = useGetProductsQuery();

  return (
    <div>
      {data?.products.results.map((data) => (
        <>
          <p>{data.masterData.current?.name}</p>
          <img src={data.masterData.current?.masterVariant.images[0].url} alt="" />
        </>
      ))}
    </div>
  );
}
