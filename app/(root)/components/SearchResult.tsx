type SearchProps ={
    searchParams:{
      [key: string]:string| string[] | undefined;
    }
  }
const SearchResult = ({searchParams}:SearchProps) => {
    console.log(searchParams)
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult