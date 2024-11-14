import Container from '@/components/Container'
import WishlistProducts from './_components/WishlistProducts'

const page = async() => {
  return (
    <div className='py-6'>
        <Container>
            <WishlistProducts/>
        </Container>
    </div>
  )
}

export default page