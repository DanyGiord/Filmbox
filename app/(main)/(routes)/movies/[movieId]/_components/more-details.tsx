interface MovieDetailsProps {
    movie: any,
    director: string,
    producers: string[],
    screenplayer: string,
    writer: string
}

const MoreDetails = ({
    movie,
    director,
    producers,
    screenplayer,
    writer,
}: MovieDetailsProps) => {
    return (
        <div className="flex flex-col justify-between py-0.5 w-full">
            <h2 className="text-base text-white_text text-start">More details</h2>
            <div className="flex justify-between">
                <span className="text-white_text text-base">Revenue:</span>
                <span className="text-gray text-base text-right">$ {movie.movie.revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-white_text text-base">Directed by:</span>
                <span className="text-gray text-base text-right">{director}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-white_text text-base">Produced by:</span>
                <div className="text-gray text-base flex flex-col">
                    {producers.map((producer: any, i: number) => (
                        <span key={i} className="text-right">{producer}</span>
                    ))}
                </div>
            </div>
            <div className="flex justify-between">
                <span className="text-white_text text-base">Screenplay:</span>
                <span className="text-gray text-base text-right">{screenplayer}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-white_text text-base">Writers:</span>
                <span className="text-gray text-base text-right">{writer}</span>
            </div>
        </div>
    );
}

export default MoreDetails;