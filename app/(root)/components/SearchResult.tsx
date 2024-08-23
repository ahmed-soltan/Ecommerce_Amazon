type SearchProps ={
    searchParams:{
      [key: string]:string| string[] | undefined;
    }
  }
const SearchResult = ({searchParams}:SearchProps) => {
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult