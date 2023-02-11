import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Error, DetailsHeader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({songid});

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    
    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
    };

    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;
    if(error) return <Error />;

    return(
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />
            <div className="mb-10">
                <h1 className="font-bold text-3xl text-white">Lyrics:</h1>
                <div className="mt-3">
                    { songData?.sections[1].type === 'LYRICS' 
                        ? songData?.sections[1].text.map((line, i) => (<p className="text-gray-400 text-base my-1">{line}</p>))
                        :<p className="text-gray-400 text-base my-1">Sorry, No LYRICS Found!...</p>
                    }
                </div>
            </div>
            <RelatedSongs 
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};


export default SongDetails;