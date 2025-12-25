import FeatureDetailsOne from "../components/features/feature-details-one"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const PackageDetailsMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Package Details'} />
         <FeatureDetailsOne />
      </Wrapper>
   )
}

export default PackageDetailsMain