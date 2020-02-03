import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from 'utils/routes'

// styles
import { DisclaimerWrapper } from './styles'

const Disclaimer = () => (
  <DisclaimerWrapper>
    <h1>Disclaimer</h1>

    <p>Valid from: January 01, 2020</p>

    <p>
      The information contained on{' '}
      <Link to={routes.landing}>https://www.flagis.com</Link> website and Flagis
      mobile app (the "Service") is for general information purposes only.
    </p>

    <p>
      Flagis s.r.o. assumes no responsibility for errors or omissions in the
      contents on the Service.
    </p>

    <p>
      In no event shall Flagis s.r.o. be liable for any special, direct,
      indirect, consequential, or incidental damages or any damages whatsoever,
      whether in an action of contract, negligence or other arising out of or in
      connection with the use of the Service or the contents of the Service.
      Flagis s.r.o. reserves the right to make additions, deletions, or
      modification to the contents on the Service at any time without prior
      notice.
    </p>

    <p>
      Flagis s.r.o. does not warrant that the Service is free of viruses or
      other harmful components.
    </p>

    <h2>External links disclaimer</h2>

    <p>
      <Link to={routes.landing}>https://www.flagis.com</Link> website and Flagis
      mobile app may contain links to external websites that are not provided or
      maintained by or in any way affiliated with Flagis s.r.o.
    </p>

    <p>
      Please note that the Flagis s.r.o. does not guarantee the accuracy,
      relevance, timeliness, or completeness of any information on these
      external websites.
    </p>
  </DisclaimerWrapper>
)

export default Disclaimer
