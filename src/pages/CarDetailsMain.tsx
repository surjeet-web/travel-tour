import FeatureDetailsTwo from "../components/features/feature-details-two"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const CarDetailsMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Car Rental Details'} />
         <FeatureDetailsTwo />
      </Wrapper>
   )
}

export default CarDetailsMain