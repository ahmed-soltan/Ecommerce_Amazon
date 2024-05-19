import Container from "@/components/Container"
import Section1 from "./_components/Section1"
import Section2 from "./_components/Section2"
import Section3 from "./_components/Section3"
import Section4 from "./_components/Section4"


const Sell = () => {
  return (
    <div className="py-8 h-full">
        <Container>
            <div className="flex flex-col gap-16">
            <Section1/>
            <Section2/>
            <Section3/>
            <Section4/>
            </div>
        </Container>
    </div>
  )
}

export default Sell


