import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import Navbar from '@/components/navbar'
import Movie_Image from '@/components/movie_image'

import { movieSearch } from '@/apis/tmdb';

export async function getServerSideProps( { query }) {
    const search = query.search;

    let data;

    try {
        data = await movieSearch(search);
    } catch (exceptionVar) {
        console.log(exceptionVar);
    }

    console.log(data)

    return { props: { data } }
}



export default function Search( {data} ) {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    let width;

    if (typeof window !== "undefined") {width = window.innerWidth; }


    return (
      <>
        <Head>
          <title>Movie Searcher | Search result for &quot;{search}&quot;</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="layout">
            <h6>Showing search results for: &quot;{search}&quot;</h6>
            <h7>Results: {data.total_results}</h7>
            <div className="results-container">
                {data.results.map((result) => 
                        <div key={result.id} className="movie-card card border-primary mb-3" >
                            <Link href={{pathname: '/movie', query: {id: result.id}}} style={{ textDecoration: 'none' }}>
                                <Movie_Image className="movie-img card-img-top" poster_path={result.poster_path} />
                                <div className="card-body">
                                    <h4 className="card-title">{result.title}</h4>
                                    <p className="card-text">{result.release_date.substring(0, result.release_date.indexOf('-'))}</p>
                                </div>
                            </Link>
                        </div>
                )}
            </div>
            <style jsx>{`
                .layout {
                    margin: 16px;
                }
                .movie-img {
                    height: auto;
                }
                .movie-card {
                    width: 20vw;
                    margin: 10px;
                    text-decoration: none;
                }
                .results-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
            `}</style>
        </div>
      </>
    )
  }
  