import Head from 'next/head'
import Navbar from '@/components/navbar'
import Movie_Image from '@/components/movie_image'

import { movieDetails } from '@/apis/tmdb'


export async function getServerSideProps({ query }){
    const id = query.id;
    let data = await movieDetails(id);

    console.log(data);

    return {props: {data}}
}

export default function Movie({ data }) {
    return (
        <div>
            <Head>
                <title></title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="movie-contents">
                <h2>{data.title}</h2>
                <div className="movie-details">
                    <Movie_Image className="movie-img" poster_path={data.poster_path}/>
                    <div className="movie-info border-primary mb-3 card card-body">
                        <h5 className="card-title">Rating</h5>
                        <p className="card-text">{data.vote_average}/10</p>
                        <h5 className="card-title">Overview</h5>
                        <p className="card-text">{data.overview}</p>
                        <h5 className="card-title">Release Date</h5>
                        <p className="card-text">{data.release_date}</p>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .movie-contents {
                    margin: 25px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .movie-details {
                    display: flex;
                    flex-wrap: wrap;
                }
                .movie-img {
                    display: block;
                    margin: 10px;

                    width: 25vw;
                    height: auto;

                    flex: 1;

                    filter: drop-shadow(0px 0px 10px #000);
                }
                .movie-info {
                    margin: 10px;
                    width: max(25rem, 40vw);
                }
            `}</style>
        </div>
    )
}
