import { fetchSerie } from "@/tmdb-api/api";
import Serie from "./_components/serie";

const SeriePage = async ({ params }: { params: { serieId: string } }) => {
    const serie = await fetchSerie(Number(params.serieId));

    return (
        <div>
            <Serie serie={serie} />
        </div>
    );
}

export default SeriePage;