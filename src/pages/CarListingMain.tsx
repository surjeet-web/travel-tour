import FeatureFour from "../components/features/feature-four"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const CarListingMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Car Rental Listing'} />
         <FeatureFour />
      </Wrapper>
   )
}

export default CarListingMain