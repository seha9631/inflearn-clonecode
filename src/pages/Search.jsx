import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [params, setParams] = useSearchParams();

    return <div>Search {params.get("s")}</div>
}

export default Search;