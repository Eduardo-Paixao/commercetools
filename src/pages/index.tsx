import { useGetProductsQuery } from '@/graphql/generated';
export default function Home() {
  const { data } = useGetProductsQuery();

  return <div>{!data}</div>;
}
