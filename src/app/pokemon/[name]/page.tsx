import { PokemonDetailPage } from "@/components/PokemonDetailPage";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;
  return <PokemonDetailPage name={name} />;
}
