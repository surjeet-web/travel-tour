import HomeFour from "../components/homes/home-four"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const CarRentalHomeMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Car Rental Home'} />
         <HomeFour />
      </Wrapper>
   )
}

export default CarRentalHomeMain