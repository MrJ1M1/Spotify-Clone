import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader, Error, DetailsHeader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const {id: artistId}  = useParams();
    console.log(artistId);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
    if(isFetchingArtistDetails) return <Loader title="Loading artist details" />;
    if(error) return <Error />;

    return(
        <div className="flex flex-col">
            <DetailsHeader 
              artistId={artistId} 
              artistData={artistData} 
            />
           
            <RelatedSongs 
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    );
};

export default ArtistDetails;