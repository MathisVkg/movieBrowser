   
const Home = (props) => {
    if(props.movies.length != 0) { 
        return (
            <main>
                <h1>Movie<span className="titleColor">Browser</span></h1>
                <h2>{ props.movies.results[0].title }</h2>
            </main>
        )
    } else {
        return( 
            <h2>Loading</h2>
        )
    }
}

export default Home
