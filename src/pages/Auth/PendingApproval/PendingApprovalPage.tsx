import React from 'react'
import { navigate, RouteComponentProps } from '@reach/router'

import PendingApprovalTemplate from './components/PendingApprovalTemplate'
import PendingApprovalWrapper from './components/PendingApprovalWrapper'
import Image from '../../../assets/images/frozen-icon.svg'
import { LOGIN } from '../../../constants/pagesPath'

const PendingApprovalPage: React.FC<RouteComponentProps> = () => (
  <>
    <PendingApprovalTemplate>
      <PendingApprovalWrapper
        title="Your Account Is Pending Approval"
        subTitle="Our team is reviewing your account and will notify you via email once it is approved."
        message="Only approved brands, manufacturers, and brands have access to our platform. Our approval process is meant to reduce risk for all in the ecosystem and to help you build relationships with like minded brands so you can grow your business faster."
        image={Image}
        buttonDescription="While you wait, enjoy browsing our business directory"
        buttonTitle="Browse Now"
        onClick={() => navigate(LOGIN)}
      />
    </PendingApprovalTemplate>
  </>
)

export default PendingApprovalPage
