
const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='max-w-[1920px] mx-auto xl:px-20 md:px-2 px-2 '>
        {children}
    </div>
  )
}

export default Container