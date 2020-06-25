/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Elegant } from '../images';

import './style.css';
import { PatchLogo } from '../Components';

const TermsOfUse = ({ pageUpdate, loggedInUser }) => {
  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }} name="TopTerms">Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru Margins">


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Terms of Use</div>

            </div>

            <div className="MarginTop TextLeft Margins">


              <div className="WordSection1">

                <p className="MsoNormal" ><b><span>PreschoolPatch.com Terms of Use</span></b></p>

                <p
                  className="MsoNormal"><b><span>Last Updated: April 10, 2020</span></b><span
                  ></span></p>

                <p className="MsoNormal"><b><span
                >IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO
BINDING ARBITRATION AGREEMENT AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED
IN SECTION 13.</span></b><span
                ></span></p>

                <p className="MsoNormal"><span
                >These Terms of Use (the &quot;Terms&quot; or
&quot;Agreement&quot;) set forth the terms and conditions under which
individuals residing in the United States may use the PreschoolPatch.com Site
and/or the PreschoolPatch.com Services (as defined below). Certain PreschoolPatch.com
Services are subject to additional policies, rules and terms and conditions,
which you may be required to agree to as a condition of using those Services
(&quot;Additional Terms&quot;). In those cases, the applicable Additional Terms
are set forth in the printed or online Service materials relating to those
Services.</span></p>

                <ul type="disc">
                  <li
                    className="MsoNormal" ><span
                    >Please read these Terms and any
     applicable Additional Terms before using the Site or the Services. By
     using the Site or the Services, you hereby represent, warrant, understand,
     agree to and accept these Terms and any applicable Additional Terms in
     their entirety <span className="GramE">whether or not</span> you register as a
     user of the Site or Services (&quot;Registered Users&quot;).</span></li>
                  <li
                    className="MsoNormal" ><span
                    >This Agreement contains an
     Agreement to Arbitrate, which will, with limited exception, require you to
     submit claims you have against PreschoolPatch.com to binding and final
     arbitration, unless you opt out of the Agreement to Arbitrate (see Section
     13 &quot;Agreement to Arbitrate&quot;) no later than 30 days after the
     date you first use the PreschoolPatch.com Site or Services, or by June 1,
     2020, whichever is later. Unless you opt out: (1) you will only be
     permitted to pursue claims against PreschoolPatch.com on an individual
     basis, not as a plaintiff or class member in any class or representative
     action or proceeding, and (2) you will only be permitted to seek relief
     (including monetary, injunctive, and declaratory relief) on an individual
     basis.</span></li>
                  <li
                    className="MsoNormal" ><span
                    >These Terms include the PreschoolPatch.com&nbsp;</span><b><u><span
                    >Privacy Policy</span></u></b><span
                    >, which is incorporated herein. If you object to
     anything in these Terms, the Privacy Policy or any applicable Additional
     Terms, do not use the Site or the Services.</span></li>
                  <li
                    className="MsoNormal" ><span
                    >These Terms are subject to
     change by PreschoolPatch.com at any time, subject to the following
     notification process. We will notify you about material changes in these
     Terms by sending a notice to the email address registered in your account,
     or by placing a prominent notice on our Site, so that you can choose whether
     to continue using our Services. Material changes will go into effect no
     less than 30 days after we notify you. Non-material changes or
     clarifications will take effect immediately upon posting of the updated
     Terms on our Site. You should periodically check www.PreschoolPatch.com/terms
     for updates. Any use of the Site or the Services by you after the
     effective date of any changes will constitute your acceptance of such
     changes. These Terms supersede all prior versions of the Terms.</span></li>
                </ul>

                <p className="MsoNormal"><span
                >For purposes of these Terms, and except to the
extent expressly excluded below, the &quot;Site&quot; shall mean&nbsp;</span><span
                ><a
                    href="/" target="_blank" rel="noopener noreferrer"><span
                    >www.PreschoolPatch.com</span></a></span><span
                >&nbsp;and any other websites, web pages, mobile applications and
mobile websites operated by PreschoolPatch.com (&quot;PreschoolPatch.com&quot;
or &quot;we&quot;) in the United States</span></p>

                <p className="MsoNormal"><span
                ><a
                    href="#descOfServ"><b><span
                    >Description of Services; Limitations; User
Responsibilities</span></b></a></span><b><span
                ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >1.<span
                    > </span></span></span></b><span
                  ><a
                      href="#eligibility"><b><span
                      >Eligibility to Use the Site and Services</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    > </span></span></span></b><span
                  ><a
                      href="#rulesForConduct"><b><span
                      >Rules <span className="GramE">For</span> User
Conduct and Use of Services</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >3.<span
                    > </span></span></span></b><span
                  ><a
                      href="#backgroundChecks"><b><span
                      >Background and Verification Checks</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >4.<span
                    > </span></span></span></b><span
                  ><a
                      href="#termination"><b><span
                      >Termination</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >5.<span
                    > </span></span></span></b><span
                  ><a
                      href="#privacy"><b><span
                      >Privacy</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >6.<span
                    > </span></span></span></b><span
                  ><a
                      href="#linksToExternalSites"><b><span
                      >Links to External Sites</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >7.<span
                    > </span></span></span></b><span
                  ><a
                      href="#paymentAndRefund"><b><span
                      >Payment and Refund Policy</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >8.<span
                    > </span></span></span></b><span
                  ><a
                      href="#releaseOfLiability"><b><span
                      >Release of Liability for Conduct and Disputes</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >9.<span
                    > </span></span></span></b><span
                  ><a
                      href="#ageRestrictions"><b><span
                      >Age Restrictions</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >10.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#disclaimers"><b><span
                    >Disclaimers; Limitations; Waivers; and
Indemnification</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >11.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#copyright"><b><span
                    >Copyright Notices/Complaints</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >12.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#arbitrate"><b><span
                    >Agreement to Arbitrate</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >13.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#governingLaw"><b><span
                    >Governing Law and Jurisdiction</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >14.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span >
                    <a href="#ConsentToElectronicCommunication"><b><span
                    >Consent to Electronic Communication</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >15.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#misc"><b><span
                    >Miscellaneous</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >16.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#severability"><b><span
                    >Severability</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >17.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><span ><a
                    href="#contact"><b><span
                    >Contact Information</span></b></a></span><b><span
                  ></span></b></p>

                <p
                  className="MsoNormal" ><a id="descOfServ" href="/#"><b><span
                  ><span >1.<span >&nbsp;&nbsp;
                    </span></span></span></b><b><span
                  >Description of Services; Limitations; User Responsibilities</span></b></a></p>

                <p
                  className="MsoNormal"><b><span
                  ><span >1.<span
                    > </span></span></span></b><b><span
                  >1.1 About Our Services</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com offers various Services to
help its users find, coordinate, and maintain a quality Preschool environment.
The Services we offer include, among others:</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We enable individuals seeking preschool
services to search and contact established preschool providers on the Site, and
we enable individuals who provide Preschool services to post profiles on the
Site and communicate with registered (&quot;Preschool Providers&quot;).</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We provide search functionality on the Site to
allow Preschool Seekers to narrow the pool of Preschool Providers they are
interested in meeting based on their needs and preferences, and we provide a
communications platform that allows Preschool Seekers and Preschool Providers
to communicate without sharing contact information. </span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We provide tools and information to help
Preschool Seekers and Preschool Providers make more informed decisions, such as
(<span className="SpellE">i</span>) our safety center at&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >http://www.PreschoolPatch.com/safety-center-p1273.html</span></b></a></span><span
                  >&nbsp;which includes a safety guide and safety
resources, (ii) verification dashboards on Preschool Provider profiles, which
enable Preschool Seekers to check the status of a Preschool Provider's various
verifications, and (iii) a process for Preschool Seekers to obtain background
check reports from third-party consumer reporting agencies on individual
Preschool Providers who consent to the running and sharing of those reports.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We provide functionality on the Site to allow Preschool
Seekers to search for and message other Preschool Seekers in their geographic
area to help Preschool Seekers to facilitate shared preschool services.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >The Site enables Registered Users to
communicate and share information with other Registered Users within the same
enrolled preschool via a social media page, to include pictures, and comments.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We offer through <span className="SpellE">Paypal</span>,
Inc., (&quot;<span className="SpellE">Paypal</span>&quot;), a third party, a service
that facilitates the payment of Preschool Providers by Preschool Seekers via
credit card or debit card. These payment processing services are provided by <span
                      className="SpellE">Paypal</span> and are subject to the&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >Paypal Connected Account Agreement</span></b></a></span><span
                  >, which includes the&nbsp;</span><span
                  ><a
                      href="# "
                      target="_blank" rel="noopener noreferrer"><b><span
                      >Stripe Terms of
Service</span></b></a></span><span
                  >&nbsp;(collectively,
the &quot;Stripe Services Agreement&quot;). By agreeing to these Terms, Preschool
Providers that use the payment service also agree to be bound by the Stripe
Services Agreement, as the same may be modified by Stripe from time to time. As
a condition of PreschoolPatch.com enabling payment processing services through
Stripe, you agree to provide PreschoolPatch.com accurate and complete
information about you, and you authorize PreschoolPatch.com to share it and
transaction information related to your use of the payment processing services
provided by Stripe. PreschoolPatch.com assumes no liability or responsibility
for any payments you may make through this service, and all such payments are
non-refundable. Preschool Providers who elect to receive payments from Preschool
Seekers through this service can also qualify for certain benefits under a
program operated by PreschoolPatch.com.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Our Services continue to grow and change.
Please refer to our Site for further information about the Services we provide.</span></p>

                <p
                  className="MsoNormal"><b><span
                  ><span >2.<span
                    > </span></span></span></b><b><span
                  >1.2. Limitations of our Services</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >We offer a variety of Services to help our
users find, coordinate, and maintain in-home preschool enrollment for their children.
However, we do not employ any Preschool Providers. Further, we do not have
control over the quality, timing, or legality of the services actually
delivered by Preschool Providers, or of the integrity, responsibility or
actions of Preschool Seekers or Preschool Providers and we neither refer or
recommend Preschool Seekers or Preschool Providers nor make any representations
about the suitability, reliability, timeliness, or accuracy of the services
provided by Preschool Providers or the integrity, responsibility or actions of Preschool
Seekers or Preschool Providers whether in public, private or offline
interactions.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Preschool Provider content is primarily user
generated, and we do not control or vet user generated content for accuracy. PreschoolPatch.com
does not assume any responsibility for the accuracy or reliability of any
information provided by Preschool Providers or Preschool Seekers on or off this
Site. <b>PreschoolPatch.com is not responsible for the conduct, whether online
or offline, of any Preschool Seeker, Preschool Provider. Moreover, PreschoolPatch.com
does not assume and expressly disclaims any liability that may result from the
use of information provided on our Site. All users, including both Preschool
Seekers and Preschool Providers, hereby expressly agree not to hold PreschoolPatch.com
(or <span className="SpellE">PreschoolPatch.com's</span> officers, directors, shareholders,
employees, subsidiaries, other affiliates, successors, assignees, agents,
representatives, advertisers, marketing partners, licensors, independent
contractors, recruiters, corporate partners or resellers, hereinafter
&quot;Affiliates&quot;) liable for the actions or inactions of any Preschool
Seeker, Preschool Provider or other third party or for any information,
instruction, advice or services which originated through the Site, and, PreschoolPatch.com
and its Affiliates expressly disclaims any liability whatsoever for any damage,
suits, claims, and/or controversies that have arisen or may arise, whether
known or unknown therefrom.</b></span></p>

                <p
                  className="MsoNormal"><b><span
                  ><span >3.<span
                    > </span></span></span></b><b><span
                  >1.3. User Responsibilities</span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >Any screening of a Preschool Seeker or Preschool
Provider and his, her or its information by PreschoolPatch.com is limited and
should not be taken as complete, accurate, up-to-date or conclusive of the
individual's or entity's suitability as a Preschool Provider. Registered Users
are solely responsible for interviewing, performing background and reference
checks on, verifying information provided by, and selecting an appropriate Preschool
Provider for themselves and their children. </span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >Please visit our&nbsp;</span></b><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >Safety
Center</span></b></a></span><span
                  >&nbsp;<b>at&nbsp;</b></span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >www.PreschoolPatch.com/safety-center-p1273.html</span></b></a></span><span
                  >&nbsp;<b>for recommendations on how to make
more informed hiring and employment decisions, as well as for tips if you are a
Preschool Seeker looking to find another Preschool Seeker with whom to share preschool
services in your area. Each Preschool Seeker is responsible for complying with
all applicable employment and other laws in connection with any employment
relationship they establish, including verifying the age of the Preschool
Provider they select as well as that Preschool Provider's eligibility to work
in the US.</b></span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    >&nbsp;&nbsp; </span></span></span></b><b><span
                  >Eligibility to Use the Site and Services</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >By requesting to use, registering to use
and/or using the Site or the Services, you represent and warrant that you have
the right, authority and capacity to enter into these Terms and you commit to
abide by all of the terms and conditions hereof. You also represent and warrant
that you meet the following eligibility criteria:</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >Our Services are available only to individuals
who are eighteen (18) years of age or older; provided, however, that
individuals fourteen (14) through seventeen (17) years of age may join PreschoolPatch.com
as Preschool Providers subject to the terms set forth in Section 3.3 and any
applicable Additional Terms. If you do not meet the above age requirements, do
not register to use the Site or Services.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >The Site and the Services are currently
available only to individuals who are legally in the United States or the
territory of Puerto Rico. If you reside outside the United States or Puerto
Rico, visit our Site homepage for a listing of other countries where PreschoolPatch.com
subsidiaries or affiliates offer similar services.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >If you are registering to be a Preschool
Provider, you must be permitted to legally work within the United States or
Puerto Rico.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >Neither you nor any member of your household
may have ever been (<span className="SpellE">i</span>) the subject of a complaint,
restraining order or any other legal action involving, arrested for, charged
with, or convicted of any felony, any criminal offense involving violence,
abuse, neglect, fraud or larceny, or any offense that involves endangering the
safety of others, dishonesty, negligence or drugs, or (ii) registered, or
currently required to register, as a sex offender with any government entity.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >You must not be a competitor of PreschoolPatch.com
or using our Services for reasons that are in competition with PreschoolPatch.com.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >If you are an individual Preschool Seeker you
must not have had fifteen or more employees for each working day in each of
twenty or more calendar weeks in the current or preceding calendar year (or
five or more if you are seeking services in the State of California).</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >o<span >&nbsp;&nbsp; </span></span></span><span
                  >If you provide preschool services in the State
of Kansas, you must not be a licensed day Preschool Provider or provide your
services outside the child's home.</span></p>

                <p
                  className="MsoNormal" ><a
                    id="rulesForConduct" href="/#"><b><span
                    ><span >3.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Rules
for User Conduct and Use of Services</span></b></a></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >0.<span
                    > </span></span></span></b><b><span
                  >3.1. Registration, Posting, and Content
Restrictions</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >The following rules pertain to
&quot;Content&quot;, defined as any communications, images, sounds, videos, and
all the material, data, and information that you upload or transmit through the
Site or Services, or that other users upload or transmit, including without
limitation any content, messages, photos, audios, videos, reviews or profiles
that you publish or display (hereinafter, &quot;post&quot;). By posting any
Content while using our Service, you agree, represent and warrant as follows:</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >You are responsible for providing accurate,
current and complete information in connection with your registration for use
of the Site and the Services.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >You will register your account in your own
legal name, even if you are seeking Preschool for another individual or family
member.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >Unless otherwise permitted by PreschoolPatch.com,
all Content you post will be in English as the Site and Services generally are
not supported in any other languages.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >You are solely responsible for any Content
that you post on the <span className="GramE">Site, or</span> transmit to other users
of the Site. You will not post on the Site, or transmit to other users, any
defamatory, inaccurate, abusive, obscene, profane, offensive, sexually
oriented, threatening, harassing, defamatory, racially offensive, or illegal
material, or any material that infringes or violates another party's rights
(including, but not limited to, intellectual property rights, and rights of
privacy and publicity), or advocate, promote or assist any unlawful act such as
(by way of example only) copyright infringement or computer misuse, or give the
impression that any Content emanates from PreschoolPatch.com where this is not
the case. You will not provide inaccurate, misleading, defamatory or false
information to PreschoolPatch.com or to any other user of the Site, and all
opinions stated as part of Content must be genuinely held. Without limiting the
foregoing, you represent and warrant to us that you have the right and
authority to post all information you post about yourself or others, including
without limitation that you have authorization from a parent or guardian of any
minor who is the subject of any Content you post to post such Content.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >You understand and agree that PreschoolPatch.com
may, in its sole discretion, review, edit, and delete any Content, in each case
in whole or in part, that in the sole judgment of PreschoolPatch.com violates
these Terms or which PreschoolPatch.com determines in its sole discretion might
be offensive, illegal, or that might violate the rights, harm, or threaten the
safety of users of the Site or others.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >You have the right, and hereby grant, to PreschoolPatch.com,
its Affiliates, licensees and successors, an irrevocable, perpetual,
non-exclusive, fully paid-up, transferable, worldwide license to use, copy,
perform, display, reproduce, adapt, modify and distribute your Content and to
prepare derivative works of, or incorporate into other works, such Content, and
to grant and authorize sublicenses of the foregoing. You further represent and
warrant that public posting and use of your Content by PreschoolPatch.com will
not infringe or violate the rights of any third party.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >Your use of the Services, including but not
limited to the Content you post on the Site, must be in accordance with any and
all applicable laws and regulations.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >PreschoolPatch.com is not responsible for any
claims relating to any inaccurate, untimely or incomplete information provided
by users of the Site.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >We welcome your feedback and questions about
the Site and Services. However, you agree that any comments, ideas, messages,
questions, suggestions, or other communications you send to us or share with us
through any channel (including, without limitation, the Site, email, telephone,
surveys, and our social media accounts) shall be and remain the exclusive
property of PreschoolPatch.com and we may use all such communications, all
without notice to, consent from, or compensation to you.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Opinions, advice, statements, offers, or other
information or content made available on the Site or through the Site, but not
directly by PreschoolPatch.com, are those of their respective authors. Such
authors are solely responsible for such content. PreschoolPatch.com does not: (<span
                      className="SpellE">i</span>) guarantee the accuracy, completeness, or usefulness of
any information on the Site or available through the Service, or (ii) adopt,
endorse or accept responsibility for the accuracy or reliability of any
opinion, advice, or statement made by any party that appears on the Site or
through the Service. Under no circumstances will PreschoolPatch.com or its
Affiliates be responsible for any loss or damage resulting from: (a) your
reliance on information or other content posted on the Site or transmitted to
or by any user of the Site or Service; or (b) reviews or comments made about
you on the Site by other users.</span></p>

                <p
                  className="MsoNormal" ><span
                  >You agree that PreschoolPatch.com has no
obligation to remove any reviews or other information posted on the Site about
you or any other person or entity. If you disagree with a review, you may post
one rebuttal to the review, provided your rebuttal complies with these Terms.
You may not terminate your registration and re-register in order to prevent a
review from being associated with your account. The author of a review can
always <span className="GramE">remove</span> or request removal of a review they have
written.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  >PreschoolPatch.com disclaims any liability
whatsoever for any misstatements and/or misrepresentations made by any users of
the Site. Users hereby represent, understand and agree to hold PreschoolPatch.com
harmless for any misstatements and/or misrepresentations made by or on behalf
of them on this Site or in any other venue.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >1.<span
                    > </span></span></span></b><b><span
                  >3.2. Exclusive Use</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >If you are a Preschool Seeker, you may use
your account only to find Preschool for yourself, your parents, your children,
your grandchildren, individuals for whom you are otherwise the legal guardian
or another Preschool Seeker with whom you are entering a shared preschool
arrangement. If you are a Preschool Provider, you may use your account only to
find Preschool jobs for yourself. You are responsible for all activity on and
use of your account, and you may not assign or otherwise transfer your account
to any other person or entity.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    > </span></span></span></b><b><span
                  >3.3. Teen Providers, Parent Registered Users,
and Parent Monitored Accounts</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >If you are fourteen (14) through seventeen
(17) years of age and would like to participate in PreschoolPatch.com as a Preschool
Provider (a &quot;Teen Provider&quot;), you may register to use the Site and
Services but only if your parent or legal guardian consents to your
registration through the PreschoolPatch.com site and also becomes a registered
user (a &quot;Parent Registered User&quot;). Parent Registered Users will
receive a copy of all communications between the Teen Provider and other
Registered Users as well as a copy of all emails PreschoolPatch.com sends to
the Teen Provider. Parent Registered Users may respond to communications sent
by other Registered Users to the Teen Provider and may report inappropriate
message content to PreschoolPatch.com. Parent Registered Users may also log in
to, update the settings of and terminate their Teen Provider's account.</span></p>

                <p
                  className="MsoNormal" ><span
                  >For purposes of these Terms, Parent Registered
Users and their Teen Provider(s) are deemed to be Preschool Providers. By
registering as a Parent Registered User, you hereby represent, warrant,
understand, agree to and accept these Terms and any applicable Additional Terms
in their entirety on behalf of yourself and your Teen Provider whether or not
you use the Site or Services, including without limitation <span className="SpellE">PreschoolPatch.com's</span>
right to run the verification and background checks described in Section 4
below. You further understand and agree that you will ensure your Teen
Provider's compliance with these Terms and that you are responsible for any
noncompliance by your Teen Provider.</span></p>

                <p
                  className="MsoNormal" ><span
                  >If you are a Parent Registered User, you also
agree that you are responsible for monitoring the account of your Teen Provider
as well as your Teen Provider's activities both on and off of the Site, including
monitoring who your Teen Provider communicates with and meets both on and off
the Site and with whom he or she agrees to provide <span className="SpellE">Preschoolgiver</span>
services.</span></p>

                <p
                  className="MsoNormal" ><span
                  >If you register to use the Site as a Teen
Provider, the first time you try to log in to your account after you turn
eighteen (18), you will be required to agree to the Terms as in effect at the
time, including the consents to run the verification and background checks
described in Section 4 below. Once you accept the terms and log in, the parent
monitoring functionality of your account will be <span className="GramE">removed</span>
and your Parent Registered User will no longer have access to your account. If
you do not agree to the Terms after you turn eighteen (18), PreschoolPatch.com
may terminate your access to all or part of the PreschoolPatch.com Site, remove
your profile and/or any Content posted by or about you from the Site, and/or
terminate your registration in PreschoolPatch.com, with or without notice.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >3.<span
                    > </span></span></span></b><b><span
                  >3.4. Prohibited Uses</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >By using the Site or Services of PreschoolPatch.com,
you agree that you will not under any circumstances:</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >use the Site, Services, or any information
contained therein in any way that is abusive, threatening, obscene, defamatory,
libelous, or racially, sexually, religiously, or otherwise objectionable and
offensive;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >use the Site or Services for any fraudulent or
unlawful purpose, for any purpose not expressly intended by PreschoolPatch.com
or for the promotion of illegal activities;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >harass, abuse or harm another person or group,
or attempt to do so;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >use another user's PreschoolPatch.com account;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >provide false or inaccurate information when
registering an account on PreschoolPatch.com, using the Services or communicating
with other Registered Users;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >attempt to re-register with PreschoolPatch.com
if we have terminated your account for any or no reason or terminate your
registration and re-register in order to prevent a review from being associated
with your account;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >interfere or attempt to interfere with the
proper functioning of <span className="SpellE">PreschoolPatch.com's</span> Services;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >make any automated use of the system, or take
any action that we deem to impose or to potentially impose an unreasonable or
disproportionately large load on our servers or network infrastructure;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >bypass any robot exclusion headers or other
measures we take to restrict access to the Service or use any software,
technology, or device to scrape, spider, or crawl the Service or harvest or
manipulate data (whether manually or through automated means);</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >use the communication systems provided by or
contacts made on PreschoolPatch.com for any commercial solicitation purposes;</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span
                    >�<span >&nbsp; </span></span></span><span
                  >publish or link to malicious content intended
to damage or disrupt another user's browser or computer.</span></p>

                <p
                  className="MsoNormal" ><span
                  >In order to protect our users from prohibited
activity, we reserve the right to take appropriate actions, including but not
limited to restricting the amount of phone numbers a Preschool Seeker may view
or the amount of emails a user may send in any 24-hour period to an amount
which we deem appropriate in our sole discretion.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Should PreschoolPatch.com find that you
violated the terms of this Section or any terms stated herein, PreschoolPatch.com
reserves the right, at its sole discretion, to immediately terminate your use
of the Site and Services. By using the Site and/or Services, you agree that PreschoolPatch.com
may assess, and you will be obligated to pay, $10,000 per each day that you: (<span
                      className="SpellE">i</span>) maintain Preschool Provider or Preschool Seeker
information (including but not limited to, names, addresses, phone numbers, or
email addresses) or copyrighted material that you scraped (either directly or
indirectly in a manual or automatic manner) from the Site, or (ii) otherwise
mis-use or mis-appropriate Site Content, including but not limited to, use on a
&quot;mirrored&quot;, competitive, or third party site. This obligation shall
be in addition to any other rights PreschoolPatch.com may have under these Terms
or applicable law.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Further, in order to protect the integrity of
the Site and the Services, PreschoolPatch.com reserves the right at any time in
its sole discretion to block users from certain IP addresses from accessing the
Site.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="backgroundChecks" href="/#"><b><span
                    ><span >4.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Background
and Verification Checks</span></b></a></p>

                <p
                  className="MsoNormal"><span
                  ><span >0.<span
                    >&nbsp; </span></span></span><b><span
                  >4.1 Preschool Providers Can Order or Authorize
Background Checks about Themselves and Can Authorize the Sharing of Them with
Other Members</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com offers to individuals who
have registered as Preschool Providers and Preschool Seekers the following
background check services from third-party consumer reporting agencies:
Criminal Record Checks, Motor Vehicle Records (&quot;MVR&quot;) Checks,
Criminal + MVR Records Checks and Investigative Criminal Plus background checks
(collectively &quot;Background Checks&quot;). Criminal Records Checks may be
ordered by Preschool Providers about themselves or by Preschool Seekers,
subject to the authorization of the Preschool Provider who is the subject of
the check. MVR Checks only may be ordered by Preschool Providers about
themselves. Criminal + MVR Records Checks only may be ordered by Preschool
Seekers, subject to the authorization of the Preschool Provider who is the
subject of the check. Investigative Criminal Plus background checks may only be
ordered by Preschool Seekers subject to the written authorization of the Preschool
Provider who is the subject of the check. All background checks require payment
of a separate fee by the Member who is initiating the background check request
and are subject to the consent of the Preschool Provider on whom the check is
being performed.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Each of these Background Checks is regulated
by the Fair Credit Reporting Act (&quot;FCRA&quot;), and the background reports
resulting from these services are considered &quot;consumer reports&quot; under
FCRA. Consumer reports may contain information on your character, general
reputation, personal characteristics, and mode of living, including but not
limited to consumer credit, criminal history, workers' compensation, driving,
employment, military, civil, and educational data and reports.</span></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com will receive a copy of each
Background Check you order or authorize through PreschoolPatch.com. See Section
4.4 below for information regarding <span className="SpellE">PreschoolPatch.com's</span>
use of these Background Checks. You are responsible for making sure that the
email address you provide to PreschoolPatch.com is correct, knowing that
sensitive information will be sent to it.</span></p>

                <p
                  className="MsoNormal" ><span
                  >If you authorize a Criminal Records Check or
Criminal + MVR Records Check in response to a request by a Preschool Seeker who
is considering hiring you, we will provide both you and the Preschool Seeker
who ordered the check the ability to retrieve the report from the consumer
reporting agency that performed the check. If a Preschool Seeker orders an
Investigative Criminal Plus background check pursuant to your written
authorization, the consumer reporting agency that performed the check will
provide it directly to you and to the Preschool Seeker who ordered it based on
your written authorization.&nbsp;<b>The results of any check ordered pursuant
to your written authorization will be shared directly with requesting Preschool
Seeker regardless of its contents.</b></span></p>

                <p
                  className="MsoNormal" ><span
                  >If you are a Preschool Provider and you have
ordered a Background Check from a third-party consumer reporting agency through
PreschoolPatch.com, we may indicate in your profile that you have completed
that check. However, we will not share the results with any other site visitor
or Registered User without your specific authorization.</span></p>

                <p
                  className="MsoNormal"><span
                  ><span >1.<span
                    >&nbsp; </span></span></span><b><span
                  >4.2. Background Check Offerings Available to
Individuals Who May Not Have Registered <span className="GramE">As</span> Preschool
Providers or Preschool Seekers</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >Through certain pages of the Site, we may from
time to time offer to individuals who may or may not be registered as Preschool
Seekers the opportunity to purchase Investigative Criminal or Investigative
Criminal Plus background checks on <span className="SpellE">Preschoolgivers</span> who
are not necessarily registered on PreschoolPatch.com. These background checks
are performed by a third-party consumer reporting agency and are subject to the
terms of Section 4.1 pertaining to Investigative Criminal Plus checks
generally, and to Sections 4.3 and 4.7 except that (<span className="SpellE">i</span>)
references to Preschool Seekers shall refer to individuals who order the checks
regardless of whether they are registered as Preschool Seekers, (ii) references
to Preschool Providers shall refer to individuals who authorize the check to be
performed on themselves regardless of whether they are registered as Preschool
Providers, and (iii) PreschoolPatch.com does not view the results of these
checks regardless of whether the <span className="SpellE">Preschoolgiver</span> on
whom the check is performed is registered as a Preschool Provider.</span></p>

                <p
                  className="MsoNormal"><span
                  ><span >2.<span
                    >&nbsp; </span></span></span><b><span
                  >4.3. Special Responsibilities of Users of
Background Check under FCRA</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >The use of any background check reports
obtained through the Site is governed by the federal Fair Credit Reporting Act
(&quot;FCRA&quot;) and certain state laws. If you order or request access to
background check on a Preschool Seeker, you are considered an end user of the
check, and must agree to a required End User Certification before the check
will be processed. This End User Certification requires you to certify that you
will comply with the FCRA and any applicable state <span className="GramE">laws, and</span>
summarizes key legal obligations. A summary of your responsibilities in using
the information contained the background check can be found&nbsp;</span><span
                  ><a
                      href="http://www.ftc.gov/tips-advice/business-center/guidance/using-consumer-reports-what-employers-need-know"
                      target="_blank" rel="noopener noreferrer"><b><span
                      >http://www.ftc.gov/tips-advice/business-center/guidance/using-consumer-reports-what-employers-need-know</span></b></a></span><span
                  >. If there is negative data in a check you
receive, and you choose to take &quot;adverse action&quot; (i.e. if you choose
to pass on that individual's candidacy) on the basis of this negative data, you
must agree to take certain procedural steps, which can be found at&nbsp;</span><span
                  ><a
                      href="http://www.ftc.gov/tips-advice/business-center/guidance/using-consumer-reports-what-employers-need-know"
                      target="_blank" rel="noopener noreferrer"><b><span
                      >http://www.ftc.gov/tips-advice/business-center/guidance/using-consumer-reports-what-employers-need-know</span></b></a></span><span
                  >. These include notifying the individual who
is the subject of the report of your decision to take adverse action based on
information contained in the report and the subject's right to contest the
accuracy or completeness of the report. If you have ordered a Criminal Records
Check or a Criminal+ MVR Records Check, PreschoolPatch.com will provide a
mechanism for you to request that the consumer reporting agency who performed
the check complete these steps on your behalf. If the subject contests the
report with the consumer reporting agency, you are required to suspend the
hiring process while the agency researches the accuracy and completeness of the
report.</span></p>

                <p
                  className="MsoNormal"><span
                  ><span >3.<span
                    >&nbsp; </span></span></span><b><span
                  >4.4 PreschoolPatch.com May Review and Use
Background Checks You Order or Authorize About Yourself</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><b><span
                  >By registering for and using the Site or
Services as an individual Preschool Provider, and subject to your
authorization, you acknowledge and agree that PreschoolPatch.com may review and
use any Background Checks you have ordered or authorized about yourself for the
purpose of protecting the safety and integrity of our Site and its users, which
may, in the case of certain Preschool Providers, be considered an employment
purpose pursuant to the FCRA. PreschoolPatch.com reserves the right to
terminate your membership based on the information contained in such report,
even if such information was subsequently dismissed.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >If PreschoolPatch.com terminates your
membership or access to the Site <span className="GramE">on the basis of</span>
information in a Background Check, we will notify you and provide you the name
and contact information of the consumer reporting agency that created the
report. We will also provide you a copy of the report unless the consumer
reporting agency has already provided you a copy or access to it. You hereby
represent, understand and expressly agree that PreschoolPatch.com does not have
control over or assume any responsibility for the quality, accuracy, or
reliability of the information included in these Background Checks.
Furthermore, any inaccuracies in the report must be addressed with the consumer
reporting agency that issued it and not PreschoolPatch.com.</span></p>

                <p
                  className="MsoNormal"><span
                  ><span >4.<span
                    >&nbsp; </span></span></span><b><span
                  >4.5 PreschoolPatch.com May Order and Use
Background Screenings About You</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >By registering for and using the Site or
Services as a Preschool Seeker or Preschool Provider, you hereby acknowledge
and agree that PreschoolPatch.com has the right, but not the obligation, to use
a third-party consumer reporting agency on an ongoing basis to use your
personal information to run periodic background screenings on you for the
purpose of protecting the safety and integrity of our Site and its users
(&quot;Preliminary Membership Screens&quot;), which may, in the case of certain
Preschool Providers, be deemed to be an employment purpose under the FCRA.
Subject to certain additional disclosures and authorizations, if applicable to
you as a Preschool Provider, PreschoolPatch.com may order these screenings when
you register with PreschoolPatch.com and thereafter in connection with your
continued use of our Services and/or interaction with our Site (such as by
contacting or communicating with other members, posting or updating a job or
profile, ordering or authorizing a Background Check, etc.).</span></p>

                <p
                  className="MsoNormal" ><span
                  >These Internal Background Checks are also
regulated by FCRA, and the background reports resulting from these services are
considered &quot;consumer reports&quot; under FCRA.</span></p>

                <p
                  className="MsoNormal" ><span
                  >You understand and agree that PreschoolPatch.com
may review the information provided by the third-party consumer reporting
agency and that PreschoolPatch.com retains the right to terminate your PreschoolPatch.com
registration based on the information it receives from these checks, even if
such information was subsequently changed or corrected. If PreschoolPatch.com
terminates your membership or access to the Site <span className="GramE">on the basis
of</span> information in a background report, we will notify you and provide
you the name and contact information of the consumer reporting agency that
created the report. We will also provide you a copy of the report unless the
consumer reporting agency has already provided you a copy or access to it. You
hereby represent, understand and expressly agree that PreschoolPatch.com does
not have control over or assume any responsibility for the quality, accuracy,
or reliability of the information included in these checks. Furthermore, any
inaccuracies in the report must be addressed with the consumer reporting agency
that issued it (and not PreschoolPatch.com) within the time period specified in
your notice. Notwithstanding this, you agree that PreschoolPatch.com is under
no obligation to reinstate any accounts it may have terminated even if the
information that led to the termination is subsequently changed or corrected.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  >BY AGREEING TO THESE TERMS AND USING OUR SITE,
AND, IF APPLICABLE TO YOU AS A PRESCHOOL PROVIDER, SUBJECT TO YOUR ADDITIONAL
AUTHORIZATION, YOU AGREE TO ALLOW PRESCHOOLPATCH.COM TO PERFORM THESE INTERNAL
BACKGROUND CHECKS FOR THE PURPOSES DESCRIBED ABOVE. IF YOU DO NOT WANT THESE
INTERNAL BACKGROUND CHECKS TO BE PERFORMED, YOU SHOULD NOT USE PRESCHOOLPATCH.COM.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal"><span
                  ><span >5.<span
                    >&nbsp; </span></span></span><b><span
                  >4.6. PreschoolPatch.com May Regularly Verify
Your Identity and the Accuracy of Your Representations and Warranties</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >By registering as a Preschool Provider or Preschool
Seeker, and, if applicable to you as a Preschool Provider, subject to your
additional authorization, you authorize PreschoolPatch.com, and acknowledge
that for purposes of promoting the safety and integrity of its Site and
Service, PreschoolPatch.com reserves the right, but not the obligation, to
utilize third party service providers to verify on an ongoing basis that your
registration data is accurate and that the representations and warranties in
Section 2 above addressing legal matters such as complaints, arrests, sex
offender status, etc. are also true (&quot;Verification Checks&quot;). These
third parties may use data from a variety of sources, under a variety of
circumstances, for these site safety purposes including, without limitation,
information from national criminal databases, sex offender registries, certain
media streams, terrorist watch lists, criminal and fugitive watch lists, fraud
watch lists, law enforcement reports, and other data.</span></p>

                <p
                  className="MsoNormal" ><span
                  >You agree that PreschoolPatch.com may take
such action in response to Verification Checks as it deems appropriate in its
sole discretion, including without limitation suspending and/or terminating
your membership, should it determine that you have violated any representation
or warranty or any other provision of these Terms or are otherwise unsuitable
for PreschoolPatch.com.</span></p>

                <p
                  className="MsoNormal" ><span
                  >You also hereby represent, understand and
expressly agree that PreschoolPatch.com does not have control over or assume
any responsibility for the quality, accuracy, or reliability of the information
included in a Verification Check. We do not typically communicate the results
of a Verification Check to any third party, though we reserve the right to do
so for law enforcement or other safety-related purposes in accordance with
applicable laws.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  >BY AGREEING TO THESE TERMS, AND, IF APPLICABLE
TO YOU AS A PRESCHOOL PROVIDER SUBJECT TO YOUR ADDITIONAL AUTHORIZATION, YOU
AGREE TO ALLOW PRESCHOOLPATCH.COM TO PERFORM THE VERIFICATION CHECKS DESCRIBED
ABOVE. IF YOU DO NOT WANT THESE VERIFICATION CHECKS TO BE PERFORMED, YOU SHOULD
NOT USE PRESCHOOLPATCH.COM.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal"><span
                  ><span >6.<span
                    >&nbsp; </span></span></span><b><span
                  >4.7 Important Limitations About Background
Checks; Release of Liability for Results of Background Checks, Internal
Background Checks, and Verification Checks</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><b><span
                  >SPECIAL NOTICE FOR MASSACHUSETTS AND NEW
HAMPSHIRE:</span></b><span
                  >&nbsp;Criminal County
Searches conducted in Massachusetts and New Hampshire as part of the Criminal
Records Check and the <span className="SpellE">Criminal+MVR</span> Records Check (for
individuals who are believed to have lived in one or both of these states
during the seven years preceding the background check request) search only the
Superior Court and a single District Court in the county seat or its equivalent
for each county listed below. Criminal records (including misdemeanors and
felonies) from other courts in these states will not be searched.</span></p>

                <p
                  className="MsoNormal" ><span
                  >This is an illustrative, non-comprehensive,
list of certain state and county limitations of the background checks offered
through PreschoolPatch.com; additional limitations may apply in certain
jurisdictions, including on the federal level. For example, for many states
only certain registered sex offender information is reported, and for many
states, only a subset of felony convictions <span className="GramE">are</span>
reported (and not any misdemeanors, charges or arrest records).</span></p>

                <p
                  className="MsoNormal" ><span
                  >In addition to legal and reporting system
limitations of background checks, each check is performed with the
authorization of the person being checked, using information he or she
provides, such as home address, social security number, date of birth, and
name. If a candidate provides incorrect information, the check might be run
with inaccurate identifying data, which can impact the validity of the criminal
check. Finally, criminal records are not always reported accurately or
promptly, and human and electronic error can result in inaccurate or incomplete
reporting. Consequently, even the most comprehensive background check offered
may not disclose the existence of all criminal records in all jurisdictions.</span></p>

                <p
                  className="MsoNormal" ><span
                  >If you decide to access, use, or share
information provided by a Background Check, you agree to do so in accordance
with applicable law. You also agree to release, indemnify and hold harmless PreschoolPatch.com
from any loss, liability, injury, death, damage, or costs that may result from
your use of, reliance on, or sharing of the information contained in a
Background Check regardless of the cause, including, without limitation, due to
the inaccuracy or incompleteness of any such information.</span></p>

                <p
                  className="MsoNormal" ><span
                  >You expressly acknowledge that PreschoolPatch.com
has no obligation to perform Background Checks, Internal Background Checks, or
Verification Checks on any Registered Users. To the extent PreschoolPatch.com
performs such checks on certain Registered Users, the checks are limited and
should not be taken as complete, accurate, up-to-date or conclusive evidence of
the accuracy of any information those users have provided or of their
eligibility to use the Services.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="termination" href="/#"><b><span
                    ><span >5.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Termination</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com reserves the right, in its
sole discretion, to immediately terminate your access to all or part of the PreschoolPatch.com
Site and/or Services, to remove your profile and/or any content posted by or
about you from the Site, and/or to terminate your account with PreschoolPatch.com,
with or without notice for any reason or no reason in its sole discretion,
including without limitation if PreschoolPatch.com should determine that you
are not eligible to use the Services, have violated any terms stated herein or
in any of the Additional Terms, are not suitable for participation as a
Registered User, have mis-used or mis-appropriated Site content, including but
not limited to use on a &quot;mirrored,&quot; competitive, or third-party site.
Upon termination, PreschoolPatch.com shall be under no obligation to provide
you with a copy of any content posted by or about you on the Site. If we
terminate your registration, we have no obligation to notify you of the reason,
if any, for your termination.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  >Following any termination of any individual's
use of the Site or the Services, PreschoolPatch.com reserves the right to send
a notice thereof to other Registered Users with whom we believe the individual
has corresponded.&nbsp;</span></b><span
                  >Our
decision to terminate an individual's registration and/or to notify other
Registered Users with whom we believe the individual has corresponded does not <span
                      className="GramE">constitute, and</span> should not be interpreted or used as
information bearing on, the individual's character, general reputation,
personal characteristics, or mode of living.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="privacy" href="/#"><b><span
                    ><span >6.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Privacy</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com uses the information you
provide on the Site or via the Services or in accordance with our&nbsp;</span><span
                  ><a href="# " target="_blank" rel="noopener noreferrer"><b><span
                    >Privacy Policy</span></b></a></span><span
                  >. For more information, see our full Privacy
Policy, the terms of which are incorporated herein.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="linksToExternalSites" href="/#"><b><span
                    ><span >7.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Links
                      <span className="GramE">To</span> External Sites</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >Links from the Site to external sites
(including external sites that are framed by PreschoolPatch.com) or inclusion
of advertisements and other third-party content do not constitute an
endorsement by PreschoolPatch.com of such sites or the content, products,
advertising and other materials presented on such sites or of the products and
services that are the subject of such third-party content, but are for users'
reference and convenience.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Users access them at their own risk. It is the
responsibility of the user to evaluate the content and usefulness of the
information obtained from other sites. PreschoolPatch.com does not control such
                    <span className="GramE">sites, and</span> is not responsible for their content.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Users further acknowledge that use of any site
or content controlled, owned or operated by third parties is governed by the
terms and conditions of use for those sites, and not by <span className="SpellE">PreschoolPatch.com's</span>
Terms of Use and Privacy Policy. PreschoolPatch.com expressly disclaims any
liability derived from the use and/or viewing of links that may appear on this
Site. All users hereby agree to hold PreschoolPatch.com harmless from any
liability that may result from the use of links that may appear on the Site.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="paymentAndRefund" href="/#"><b><span
                    ><span >8.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Payment
                      <span className="GramE">And</span> Refund Policy</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >In order to utilize some PreschoolPatch.com
Services or product offerings, the user of such Services or product offerings
must pay PreschoolPatch.com either a recurring subscription, one-time, or other
fees. In addition, the user is responsible for any state or local sales taxes
associated with the Services or product offerings purchased. Notwithstanding
the foregoing, for certain Preschool Seekers who enroll in PreschoolPatch.com
and receive access to a paid membership subscription through their employer's
benefits program, the related subscription fee is paid by their employer, and
the Preschool Seeker has no obligation to pay the automatically renewing
subscription fee associated with such subscription so long as the subscription
remains part of the employer's benefits program.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >0.<span
                    > </span></span></span></b><b><span
                  >8.1 Billing and Payment</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >If you sign up for a PreschoolPatch.com paid
membership subscription, you agree to pay PreschoolPatch.com all subscription
charges associated with the plan you subscribe to as described on the Site at
the time you subscribe and provide your payment information. You also authorize
PreschoolPatch.com, or a third-party payment processor that works on our
behalf, to charge your chosen payment method according to the terms of the plan
to which you subscribe. The subscription period and the amount and frequency of
the charges will vary depending on the subscription plan you select. PreschoolPatch.com
reserves the right to correct any errors or mistakes that it makes even if it
has already requested or received payment.</span></p>

                <p
                  className="MsoNormal" ><span
                  >To the extent you elect to purchase other
Services or product offerings we may offer for a fee, you authorize PreschoolPatch.com
to charge your chosen payment provider for the Services and/or products you
purchase. You agree that if PreschoolPatch.com already has your credit card on
file as a result of prior purchases you have made, we may charge that credit
card for the additional Services/products you purchase.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >1.<span
                    > </span></span></span></b><b><span
                  >8.2 Automatic Subscription Renewal and
Cancellation</span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >PRESCHOOLPATCH.COM PAID MEMBERSHIP SUBSCRIPTIONS
WILL CONTINUE INDEFINITELY UNTIL CANCELLED BY THE USER. AFTER YOUR INITIAL
SUBSCRIPTION COMMITMENT PERIOD, AND AGAIN AFTER ANY SUBSEQUENT SUBSCRIPTION
PERIOD, YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW FOR AN ADDITIONAL EQUIVALENT
PERIOD AS THE SUBSCRIPTION TERM YOU ORIGINALLY SELECTED AND AT THE SUBSCRIPTION
RATE AND FREQUENCY DISCLOSED TO YOU ON THE SITE WHEN YOU ORIGINALLY SUBSCRIBED,
UNLESS OTHERWISE PROVIDED AT THE TIME YOU SUBSCRIBED. IF YOU SIGN UP FOR A
PAYMENT PLAN THAT ALLOWS YOU TO BE CHARGED MONTHLY OVER THE SUBSCRIPTION PERIOD
AND YOU DECIDE TO CANCEL YOUR SUBSCRIPTION DURING THE SUBSCRIPTION PERIOD, YOU
ACKNOWLEDGE AND AGREE THAT YOU WILL CONTINUE TO BE BILLED FOR THE SUBSCRIPTION
ON A MONTHLY BASIS UNTIL ITS ORIGINALLY SCHEDULED EXPIRATION DATE.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >You may cancel your paid membership
subscription at any time by following the instructions on your&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >account settings</span></b></a></span><span
                  >&nbsp;page or contacting <span className="SpellE">PreschoolPatch.com's</span>
customer service department at&nbsp;</span><span
                  ><a href="tel:+8772273115"><b><span
                    >(877) 227-3115</span></b></a></span><span
                  >&nbsp;or&nbsp;</span><span
                  ><a href="mailto:careteam@care.com"><b><span
                    >Preschoolteam@PreschoolPatch.com</span></b></a></span><span
                  >. If you cancel your subscription, you
typically will be permitted to use your subscription until the end of your
then-current subscription term. Your subscription will not be renewed after
your then-current term expires, but your payment method will be charged, and
you will be required to pay, any cancellation or other fees associated with
your early termination and disclosed to you at the time you signed up for the
subscription plan.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    > </span></span></span></b><b><span
                  >8.3 Free Trial Offers</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com may offer limited-time free
trial subscriptions to certain users from time-to-time. Users who sign up for a
PreschoolPatch.com Service on a free trial basis may have limited access to the
Service and/or features of the Site. If a user signs up for a free trial
subscription, unless he or she cancels before the expiration of the free trial
period, the user will be charged the price then in effect for a subscription to
the Service, unless otherwise informed by PreschoolPatch.com at the time of
original subscription. If a user does not want to continue with the Service
after the expiration of the free trial period, the Preschool Seeker or Preschool
Provider must downgrade or cancel their subscription, and request a refund of
the subscription fee within thirty (30) days of being charged the subscription
fee for the Service. Upon cancellation, the Preschool Seeker or Preschool
Provider's credit card will be refunded <span className="GramE">for the amount of</span>
the most recent subscription charge so long as he or she has not used the
subscription after the expiration of the free trial period.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >3.<span
                    > </span></span></span></b><b><span
                  >8.4 Credits</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >If you are a Preschool Provider, you may
purchase or receive credits (&quot;Credits&quot;) to be used where required to
apply for or enhance your application to certain jobs posted by certain Preschool
Seekers, or for other goods or services as described on the Site. If you
purchase Credits, you agree to pay PreschoolPatch.com the price indicated on
the Site at the time you make your purchase. Credits have no monetary or cash
value, and your purchase or receipt of Credits does not represent a pre-funding
of stored value that can be accessed or used in the future for any purpose.
Credits cannot be sold, transferred or exchanged for &quot;real world&quot;
money or cash. You agree that all sales of Credits are final and <span
                      className="GramE">non-refundable</span> and you are not entitled to a refund of any
unused Credits, including in the event that you close your account or your
registration is terminated by us in accordance with Section 5 above. Credits
expire as described on the Site at the time you purchase or receive them. Upon
expiration, we have the right but not the obligation to redeem any remaining
Credits for other goods or services, which shall be identified at our sole
discretion.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >4.<span
                    > </span></span></span></b><b><span
                  >8.5 Refund Policy</span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >Except as set forth in these Terms or as
described on the Site at the time you make a purchase, all payments for
services/products are non-refundable and there are no refunds or credits for
unused or partially used services/products or service/product
cancellations.&nbsp;</span></b><span
                  >Notwithstanding the
foregoing, if you have a paid membership subscription that is automatically
renewed, we will refund the most recent charge to your credit card if: (<span
                      className="SpellE">i</span>) you have not used your subscription during the current
subscription renewal period and (ii) you downgrade or cancel your membership
and request a refund of the most recent charge to your credit card within
thirty (30) days of the most recent charge. Any such refunds will apply only to
the most recent charge, regardless of how such refund request is made, for example,
whether to PreschoolPatch.com or to your credit card company. Additionally, if
you are a Preschool Seeker and you post a bona fide job during your initial
paid membership subscription period, we will refund your initial paid
membership subscription charge if: (a) you do not receive any responses to your
first job posting within three (3) days of posting and (b) you contact us
within thirty (30) days of your initial subscription charge to downgrade or
cancel your membership and have not continued to use your account within that
period. In addition, PreschoolPatch.com reserves the right to immediately
downgrade or cancel your membership after payment of your refund. PreschoolPatch.com
does not provide refunds or credits under any other circumstances, unless it
determines in its sole discretion that a refund or credit is warranted due to
extenuating circumstances, such as a duplicate account.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="releaseOfLiability" href="/#"><b><span
                    ><span >9.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Release of Liability for Conduct and Disputes</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com is not an employer of Preschool
Providers. Preschool Seekers may seek the services of a Preschool Provider <span
                      className="GramE">through the use of</span> the Site or Services, and Preschool
Providers may post profiles and submit proposals to Preschool Seekers regarding
their services.</span></p>

                <p
                  className="MsoNormal" ><span
                  >In some instances, such as through the
Assisted Search and Senior Preschool Planning Services, we or Preschool
Concierge may provide Preschool Seekers a customized list of potential
individuals, companies and/or agencies to consider based on the information the
Preschool Seeker provides us regarding their and their loved one's needs and
preferences. However, if a Preschool Seeker agrees on the provision of services
from an individual, company or agency we or Preschool Concierge identifies
through any of those Services, such agreement is solely between the Preschool
Seeker and the Preschool Provider; neither PreschoolPatch.com nor Preschool
Concierge is a party to any such agreement.</span></p>

                <p
                  className="MsoNormal" ><span
                  >In some instances, such as through the Backup Preschool
Service, the third parties we or Preschool Concierge contract with to provide
services in support of that Service select the individual Backup Preschool
Providers from their agency who provide the backup or senior Preschool service.
We and Preschool Concierge contract with reputable agencies that have entered
into an agreement with us pursuant to which they represent that each of their
individual Backup Preschool Providers has passed a screening process including
background and reference checks. However, each such agency operates
independently of PreschoolPatch.com and is not under our control. Any issues
concerning the conduct of a Preschool Seeker or Preschool Provider including,
without limitation, the services received by the Preschool Seeker or payment
due to the Preschool Provider, must be resolved directly by the Preschool
Seeker and the Preschool Provider. PreschoolPatch.com will not be held
responsible and expressly disclaims any liability whatsoever for any claims,
demands or damages direct or indirect of every kind and nature, known and
unknown, suspected and unsuspected, disclosed and undisclosed, arising out of
or in any way connected with such issues.</span></p>

                <p
                  className="MsoNormal" ><span
                  >By using this Site or our Services, you hereby
represent, understand, and expressly agree to hold PreschoolPatch.com harmless
for any claim or controversy that may arise out of the actions of or
relationship between you and any Preschool Seeker, Preschool Provider or other
user(s) of the Site that are not Backup Preschool Providers employed by our
subsidiary, Preschool Concierge. You agree to take reasonable precautions in
all interactions with Preschool Seekers, Preschool Providers or other users of
the Site or the Services, particularly if you decide to meet offline. In
addition, you agree to visit the PreschoolPatch.com&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >Safety Center</span></b></a></span><span
                  >&nbsp;at&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >www.PreschoolPatch.com/safety-center-p1273.html</span></b></a></span><span
                  >&nbsp;prior to using the Service for
additional helpful information. By using the Site or the Services, you agree to
report any alleged improprieties of any users therein to PreschoolPatch.com
immediately by notifying PreschoolPatch.com of the same via electronic
correspondence.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="ageRestrictions" href="/#"><b><span
                    ><span >10.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Age
Restrictions</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >Except with respect to Teen Providers (as
described in Section 3.3), PreschoolPatch.com is intended for people 18 or
over. PreschoolPatch.com will not knowingly collect any information from
individuals under 13. Should we determine that you do not meet the age
requirements for using our Site or Services, your registration will be
terminated immediately.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="disclaimers" href="/#"><b><span
                    ><span >11.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Disclaimers; Limitations; Waivers; Indemnification</span></b></a></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >0.<span
                    > </span></span></span></b><b><span
                  >11.1. No Warranty</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >The information and materials contained on the
Site, including text, graphics, information, links or other items are provided
&quot;as is,&quot; &quot;as available.&quot; Further, opinions, advice,
statements, offers, or other information or content made available through the
Services, but not directly by PreschoolPatch.com, are those of their respective
authors, and should not necessarily be relied upon. Such authors are solely
responsible for such content.&nbsp;<b>PRESCHOOLPATCH.COM DOES NOT: (1) WARRANT
THE ACCURACY, ADEQUACY OR COMPLETENESS OF THIS INFORMATION AND MATERIALS; (2)
ADOPT, ENDORSE OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY
OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY OTHER THAN PRESCHOOLPATCH.COM;
(3) WARRANT THAT YOUR USE OF THE SITE OR SERVICES WILL BE SECURE, FREE FROM
COMPUTER VIRUSES, UNINTERRUPTED, ALWAYS AVAILABLE, ERROR-FREE OR WILL MEET YOUR
REQUIREMENTS, OR THAT ANY DEFECTS IN THE SERVICES WILL BE CORRECTED; OR (4)
GIVE ANY WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT OF
THIRD PARTY RIGHTS. TO THE EXTENT PERMITTED BY APPLICABLE LAW, PRESCHOOLPATCH.COM
EXPRESSLY EXCLUDES ALL CONDITIONS, WARRANTIES AND OTHER TERMS WHICH MIGHT
OTHERWISE BE IMPLIED BY STATUTE, COMMON LAW OR THE LAW OF EQUITY AND DISCLAIMS
LIABILITY FOR ERRORS OR OMISSIONS IN THIS INFORMATION AND MATERIALS.</b></span></p>

                <p
                  className="MsoNormal" ><b><span
                  >IN ADDITION, AND WITHOUT LIMITING THE
FOREGOING, PRESCHOOLPATCH.COM MAKES NO REPRESENTATION OR WARRANTIES OF ANY KIND
WHETHER EXPRESS OR IMPLIED REGARDING THE SUITABILITY OF ANY USER OF OUR SITE TO
PROVIDE SERVICES AS A PRESCHOOL PROVIDER OR TO EMPLOY THE SERVICES OF A PRESCHOOL
PROVIDER.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><b><span
                  >WITH RESPECT TO CORPORATE PRESCHOOL SEEKERS,
THE INFORMATION AND MATERIAL CONTAINED ON THE SITE IS PROVIDED FOR YOUR
INTERNAL USE ONLY AND MAY NOT BE COPIED OR REDISTRIBUTED FOR ANY REASON. THIS
INFORMATION IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. THE
INFORMATION IS THE INTELLECTUAL PROPERTY OF THE CORPORATE PRESCHOOL SEEKER, PRESCHOOLPATCH.COM
OR ITS INFORMATION PROVIDERS. IN NO EVENT WILL PRESCHOOLPATCH.COM OR ITS
INFORMATION PROVIDERS BE LIABLE IN ANY WAY WITH REGARD TO SUCH INFORMATION.
YOUR USE OF THE INFORMATION MUST IN ALL CASES COMPLY WITH ALL APPLICABLE LAWS
AND REGULATIONS.</span></b><span
                  ></span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >1.<span
                    > </span></span></span></b><b><span
                  >11.2. Assumption of Risk</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >You assume all risk when using the Site and
the Services, including but not limited to <span className="GramE">all of</span> the
risks associated with any online or offline interactions with users of the Site
or the Services. You agree to take all necessary precautions, including but not
limited to reviewing the recommendations set forth in <span className="SpellE">PreschoolPatch.com's</span>&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >Safety Center</span></b></a></span><span
                  >&nbsp;at&nbsp;</span><span
                  ><a
                      href="# " target="_blank" rel="noopener noreferrer"><b><span
                      >www.PreschoolPatch.com/safety-center-p1273.html</span></b></a></span><span
                  >, when interacting with other site visitors or
Registered Users.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    > </span></span></span></b><b><span
                  >11.3. Limitation of Liability</span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >Incidental Damages and Aggregate Liability.</span></b><span
                  >&nbsp;In no event will PreschoolPatch.com be
liable for any indirect, special, incidental, or consequential damages, losses
or expenses arising out of or relating to the use or inability to use the Site
or Services, including without limitation damages related to any information
received from the Site or Services, removal of content from the Site, including
profile information, any email distributed to any user or any linked web site
or use thereof or inability to use by any party, or in connection with any termination
of your subscription or ability to access the Site or Services, failure of
performance, error, omission, interruption, defect, delay in operation or
transmission, computer virus or line or system failure, even if PreschoolPatch.com,
or representatives thereof, are advised of the possibility of such damages,
losses or expenses. UNDER NO CIRCUMSTANCES WILL PRESCHOOLPATCH.COM'S AGGREGATE
LIABILITY, IN ANY FORM OF ACTION WHATSOEVER IN CONNECTION WITH THIS AGREEMENT
OR THE USE OF THE SERVICES OR THE SITE, EXCEED THE PRICE PAID BY YOU FOR YOUR
ACCOUNT, OR, IF YOU HAVE NOT PAID PRESCHOOLPATCH.COM FOR THE USE OF ANY
SERVICES, THE AMOUNT OF $25.00.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  >No Liability for non-PreschoolPatch.com
Actions.</span></b><span
                  >&nbsp;IN NO EVENT WILL
PRESCHOOLPATCH.COM BE LIABLE FOR ANY DAMAGES WHATSOEVER, WHETHER DIRECT,
INDIRECT, GENERAL, SPECIAL, COMPENSATORY, AND/OR CONSEQUENTIAL, ARISING OUT OF
OR RELATING TO THE CONDUCT OF YOU OR ANYONE ELSE IN CONNECTION WITH THE USE OF
THE SITE OR THE SERVICES OR ANY AGREEMENT OR RELATIONSHIP FORMED USING THE SITE
OR SERVICE, INCLUDING WITHOUT LIMITATION, BODILY INJURY, EMOTIONAL DISTRESS,
AND/OR ANY OTHER DAMAGES RESULTING FROM ANYONE'S RELIANCE ON INFORMATION OR
OTHER CONTENT POSTED ON THE SITE, OR TRANSMITTED TO OR BY ANY USERS OR ANY
OTHER INTERACTIONS WITH OTHER REGISTERED USERS OF THE SITE OR SERVICES, WHETHER
ONLINE OR OFFLINE. THIS INCLUDES ANY CLAIMS, LOSSES OR DAMAGES ARISING FROM THE
CONDUCT OF USERS WHO HAVE REGISTERED UNDER FALSE PRETENSES OR WHO ATTEMPT TO
DEFRAUD OR HARM YOU.</span></p>

                <p
                  className="MsoNormal" ><span
                  >In addition to the preceding paragraphs of
this section and other provisions of these Terms, any advice that may be posted
on the Site is for informational purposes only and is not intended to replace
or substitute for any professional financial, medical, legal, or other advice. PreschoolPatch.com
makes no representations or warranties and expressly disclaims any and all
liability concerning any treatment, action by, or effect on any person
following the information offered or provided within or through the Site. If
you have specific concerns or a situation arises in which you require
professional or medical advice, you should consult with an appropriately
trained and qualified specialist.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >3.<span
                    > </span></span></span></b><b><span
                  >11.4. Indemnification</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >By agreeing to these Terms, users of the Site
and Services agree to indemnify, defend and hold harmless PreschoolPatch.com
and its Affiliates from and against any and all claims, losses, expenses or
demands of liability, including reasonable attorneys' fees and costs incurred
by PreschoolPatch.com and its Affiliates in connection with any claim by a
third party (including an intellectual property claim) arising out of (<span
                      className="SpellE">i</span>) materials and content you submit, post or transmit
through the Site, (ii) use of the Site or Services by you in violation of these
Terms of Use or in violation of any applicable law, or (iii) any relationship
or agreement formed with a Preschool Seeker or Preschool Provider using the
Site or Services. Users further agree that they will cooperate as reasonably
required in the defense of such claims. PreschoolPatch.com and its Affiliates
reserve the right, at their own expense, to assume the exclusive defense and
control of any matter otherwise subject to indemnification by users, and users
shall not, in any event, settle any claim or matter without the written consent
of PreschoolPatch.com. Users further agree to hold harmless PreschoolPatch.com
and its Affiliates from any claim arising from a third party's use of
information or materials of any kind that users post to the Site.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="copyright" href="/#"><b><span
                    ><span >12.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Copyright Notices/Complaints</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >It is <span className="SpellE">PreschoolPatch.com's</span>
policy to respond to notices of alleged copyright infringement with the Digital
Millennium Copyright Act (&quot;DMCA&quot;). If you believe any materials
accessible on or from our Site infringe your copyright, you may request removal
of those materials (or access thereto) from the Site by contacting <span
                      className="SpellE">PreschoolPatch.com's</span> copyright agent (identified below) and
providing the following information:</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >0.<span
                    > </span></span></span><span
                  >Identification of the copyrighted work that
you believe to be infringed. Please describe the work, and where possible
include a copy or the location (e.g., URL) of an authorized version of the
work.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >1.<span
                    > </span></span></span><span
                  >Identification of the material that you
believe to be infringing and its location. Please describe the <span
                      className="GramE">material, and</span> provide us with its URL or any other pertinent
information that will allow us to locate the material.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >2.<span
                    > </span></span></span><span
                  >Your name, address, telephone number and (if
available) e-mail address.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >3.<span
                    > </span></span></span><span
                  >A statement that you have a good faith belief
that the complained of use of the materials is not authorized by the copyright
owner, its agent, or the law.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >4.<span
                    > </span></span></span><span
                  >A statement that the information that you have
supplied is accurate, and indicating that &quot;under penalty of perjury,&quot;
you are the copyright owner or are authorized to act on the copyright owner's
behalf.</span></p>

                <p
                  className="MsoNormal" ><span
                  ><span >5.<span
                    > </span></span></span><span
                  >A signature or the electronic equivalent from
the copyright holder or authorized representative.</span></p>

                <p
                  className="MsoNormal" ><span
                    className="SpellE"><span
                    >PreschoolPatch.com's</span></span><span
                  > agent for copyright issues relating to this
Site is as follows:</span></p>

                <p
                  className="MsoNormal" ><span
                  >Copyright Agent<br/>
Legal Department<br/>
PreschoolPatch.com, Inc.<br/>
77 Fourth Avenue, 5</span><sup><span
                  >th</span></sup><span
                  >&nbsp;Floor<br/>
Waltham, MA 02451 USA</span></p>

                <p
                  className="MsoNormal" ><span
                  ><a href="mailto:copyright@care.com"><b><span
                    >copyright@PreschoolPatch.com</span></b></a></span><span
                  ></span></p>

                <p
                  className="MsoNormal" ><span
                  >Phone: 781-642-5900<br/>
Fax: 781-899-1294</span></p>

                <p
                  className="MsoNormal" ><span
                    className="GramE"><span
                    >In an effort to</span></span><span
                  > protect the rights of copyright owners, PreschoolPatch.com
maintains a policy for the termination, in appropriate circumstances, of
Members and other users of this Site who are repeat infringers.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="arbitrate" href="/#"><b><span
                    ><span >13.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Agreement to Arbitrate</span></b></a></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >0.<span
                    > </span></span></span></b><b><span
                  >13.1 Agreement to Arbitrate</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >This Section 13 is referred to in these Terms
as the &quot;Arbitration Agreement&quot;. Unless you opt-out in accordance with
the opt-out procedures set forth in Section 13.8 below, you agree that all
claims relating to or arising out of these Terms or the breach thereof, whether
sounding in contract, tort, or otherwise that have arisen or may arise between
you and PreschoolPatch.com or a PreschoolPatch.com Affiliate, whether relating
to these Terms (including any alleged breach thereof), the Services, the Site,
or otherwise, shall be resolved exclusively through&nbsp;<b>final and binding
arbitration, rather than a court,</b>&nbsp;in accordance with the terms of this
Arbitration Agreement, except you may assert individual claims in small claims
court, if your claims qualify. Your rights will be determined by a&nbsp;<b>neutral
arbitrator, not a judge or jury</b>. The Federal Arbitration Act governs the
interpretation and enforcement of this Arbitration Agreement.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >1.<span
                    > </span></span></span></b><b><span
                  >13.2 Prohibition of Class and Representative
Actions and Non-Individualized Relief</span></b></p>

                <p
                  className="MsoNormal" ><b><span
                  >YOU AND PRESCHOOLPATCH.COM AGREE THAT EACH OF
US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A
PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ARBITRATION,
ACTION OR PROCEEDING. UNLESS BOTH YOU AND PRESCHOOLPATCH.COM EXPRESSLY AGREE
OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON'S OR
PARTY'S CLAIMS AGAINST PRESCHOOLPATCH.COM AND MAY NOT OTHERWISE PRESIDE OVER
ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR
MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY
IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT
NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY'S INDIVIDUAL CLAIM(S).
ANY RELIEF AWARDED CANNOT AFFECT OTHER PRESCHOOLPATCH.COM USERS.&nbsp;</span></b><span
                  >If any court or arbitrator determines that the
class action waiver set forth in this paragraph is void or unenforceable for
any reason or that an arbitration can proceed on a class basis, then the
arbitration provision set forth above shall be deemed null and void in its
entirety and the parties shall be deemed to have not agreed to arbitrate
disputes.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >2.<span
                    > </span></span></span></b><b><span
                  >13.3 Pre-Arbitration Dispute Resolution</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >PreschoolPatch.com is always interested in
resolving disputes amicably and efficiently. <span className="GramE">So</span> before
you commence arbitration, we suggest that you contact us to explain your
complaint, as we may be able to resolve it without the need for arbitration.
You may contact us via email at&nbsp;</span><span
                  ><a href="mailto:careteam@care.com"><b><span
                    >Preschoolteam@PreschoolPatch.com</span></b></a></span><span
                  >&nbsp;or at PreschoolPatch.com, Inc., Attn:
Legal Department, 77 Fourth Avenue, 5</span><sup><span
                  >th</span></sup><span
                  >&nbsp;Floor, Waltham,
MA 02451.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >3.<span
                    > </span></span></span></b><b><span
                  >13.4 Arbitration Procedures</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >If we cannot resolve a Claim informally, any
Claim either of us asserts will be resolved&nbsp;<b>only by binding arbitration
and not in courts of general jurisdiction</b>. Arbitration will be conducted by
a neutral arbitrator in accordance with the rules of JAMS that are in effect at
the time the arbitration is initiated (collectively referred to as the
&quot;JAMS Rules&quot;), as modified by this Arbitration Agreement, and
excluding the JAMS Class Action Procedures. For information on JAMS, please
visit its website,&nbsp;</span><span ><a
                    href="https://www.jamsadr.com/" target="_blank" rel="noopener noreferrer"><b><span
                    >https://www.jamsadr.com/</span></b></a></span><span
                  >. Information about JAMS's Rules and fees for
consumer disputes can be found at the JAMS consumer arbitration page,&nbsp;</span><span
                  ><a
                      href="https://www.jamsadr.com/rules-comprehensive-arbitration/" target="_blank" rel="noopener noreferrer"><b><span
                      >https://www.jamsadr.com/rules-comprehensive-arbitration/</span></b></a></span><span
                  >. If there is any inconsistency between the
JAMS Rules and this Arbitration Agreement, the terms of this Arbitration
Agreement will control unless the arbitrator determines that the application of
the inconsistent Arbitration Agreement terms would not result in a fundamentally
fair arbitration. The arbitrator must also follow the provisions of these Terms
as a court would, including without limitation, the limitation of liability
provisions in Section 11. Although arbitration proceedings are usually simpler
and more streamlined than trials and other judicial proceedings, the arbitrator
can award the same damages and relief on an individual basis that a court can
award to an individual under the Terms and applicable law. Decisions by the
arbitrator are enforceable in court and may be overturned by a court only for
very limited reasons.</span></p>

                <p
                  className="MsoNormal" ><span
                  >To commence an arbitration against PreschoolPatch.com,
you must write a demand for arbitration that includes a description of the
dispute and the amount of damages sought to be recovered. You can find a copy
of a Demand for Arbitration at&nbsp;</span><span
                  ><a href="http://www.jamsadr.com/" target="_blank" rel="noopener noreferrer"><b><span
                    >www.jamsadr.com</span></b></a></span><span
                  >. You should send three copies of the Demand,
plus the appropriate filing fee, to JAMS at 500 North State College Blvd.,
Suite 600, Orange, CA 92868, and send one copy to PreschoolPatch.com at PreschoolPatch.com,
Inc., Attn: Legal Department, 77 Fourth Avenue, 5</span><sup><span
                  >th</span></sup><span
                  >&nbsp;Floor, Waltham, MA 02451. For more information, see the
JAMS arbitration rules and forms,&nbsp;</span><span
                  ><a
                      href="https://www.jamsadr.com/rules-download/"
                      target="_blank" rel="noopener noreferrer"><b><span
                      >https://www.jamsadr.com/rules-download/</span></b></a></span><span
                  >. You may represent yourself in the
arbitration or be represented by an attorney or another representative. Once we
receive your arbitration claim, we may assert any counterclaims we may have
against you.</span></p>

                <p
                  className="MsoNormal" ><span
                  >The arbitration shall be held in the county in
which you reside or at another mutually agreed location. If the value of the
relief sought is $10,000 or less you or PreschoolPatch.com may elect to have the
arbitration conducted by telephone or based solely on written submissions,
which election shall be binding on you and PreschoolPatch.com subject to the
arbitrator's discretion to require an in-person hearing, if the circumstances
warrant. Attendance at any in-person hearing may be made by telephone by you
and/or PreschoolPatch.com, unless the arbitrator requires otherwise.</span></p>

                <p
                  className="MsoNormal" ><span
                  >The arbitrator, and not any federal, state or
local court or agency, shall have exclusive authority to resolve all claims
relating to or arising out of this contract, or the breach thereof, whether
sounding in contract, tort, or otherwise and all disputes arising out of or
relating to the interpretation, applicability, enforceability or formation of
these Terms, including, but not limited to any claim that all or any part of
these Terms are void or voidable, or whether a claim is subject to arbitration.
The arbitrator shall be empowered to grant whatever relief would be available
in a court under law or in equity. The arbitrator's award shall be written, and
binding on the parties and may be entered as a judgment in any court of
competent jurisdiction.</span></p>

                <p
                  className="MsoNormal" ><span
                  >The arbitrator will decide the substance of
all claims in accordance with the laws of the State of Delaware, including
recognized principles of equity, and will honor all claims of privilege
recognized by law. The arbitrator shall not be bound by rulings in prior
arbitrations involving different PreschoolPatch.com <span className="GramE">users,
but</span> is bound by rulings in prior arbitrations involving the same PreschoolPatch.com
user to the extent required by applicable law.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >4.<span
                    > </span></span></span></b><b><span
                  >13.5 Costs of Arbitration</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >Payment of all filing, administration, and
arbitrator fees (collectively, the &quot;Arbitration Fees&quot;) will be
governed by the JAMS Rules, unless otherwise provided in this Agreement to
Arbitrate. If you demonstrate to the arbitrator that you are economically
unable to pay your portion of the Arbitration Fees or if the arbitrator
otherwise determines for any reason that you should not be required to pay your
portion of the Arbitration Fees, PreschoolPatch.com will pay your portion of
such fees. In addition, if you demonstrate to the arbitrator that the costs of
arbitration will be prohibitive as compared to the costs of litigation, PreschoolPatch.com
will pay as much of the Arbitration Fees as the arbitrator deems necessary to
prevent the arbitration from being cost-prohibitive. Each party will be
responsible for all other fees it incurs in connection with the arbitration,
including without limitation, all attorney fees. In the event the arbitrator
determines the claim(s) you assert in the arbitration to be frivolous, you
agree to reimburse PreschoolPatch.com for all fees associated with the
arbitration paid by PreschoolPatch.com on your behalf that you otherwise would
be obligated to pay under the JAMS rules.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >5.<span
                    > </span></span></span></b><b><span
                  >13.6 Confidentiality</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >All aspects of the arbitration proceeding, and
any ruling, decision or award by the arbitrator, will be strictly confidential
for the benefit of all parties.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >6.<span
                    > </span></span></span></b><b><span
                  >13.8 Opt-Out Procedure</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >You can choose to reject this Arbitration
Agreement by mailing us a written opt-out notice (&quot;Opt-Out Notice&quot;)
in accordance with the terms of this Section. For new PreschoolPatch.com users,
the Opt-Out Notice must be postmarked no later than 30 Days after the date you
use our Site or Services for the first time. If you are already a current PreschoolPatch.com
user and previously accepted the PreschoolPatch.com Terms prior to the
introduction of this Arbitration Agreement, the Opt-Out Notice must be
postmarked no later than January 17, 2017. You must mail the Opt-Out Notice to PreschoolPatch.com,
Inc., Attn: Legal Department, 77 Fourth Avenue, 5th Floor, Waltham, MA 02451.
The Opt-Out Notice must state that you do not agree to the Arbitration
Agreement and must include your name, address, phone number, and the email
address(es) used to log in to the PreschoolPatch.com account(s) to which the
opt-out applies. You must sign the Opt-Out Notice for it to be effective. This
procedure is the only way you can opt out of the Arbitration Agreement. If you
opt out of the Arbitration Agreement, PreschoolPatch.com will likewise not be
bound by these arbitration provisions. All other terms of these Terms will
continue to apply. Opting out of the Arbitration Agreement has no effect on any
previous, other, or future arbitration agreements that you may have with us. PreschoolPatch.com
users who accepted a previous version of these Terms that included an
arbitration agreement, and who did not timely opt out of that arbitration
agreement, remain bound by the last arbitration agreement that they accepted.
Upon receipt of a valid Opt-Out Notice, PreschoolPatch.com will provide the
opting out user with a copy of the arbitration agreement from the last version
of the Terms that the user accepted, if any exists.</span></p>

                <p
                  className="MsoNormal" ><b><span
                  ><span >7.<span
                    > </span></span></span></b><b><span
                  >13.9 Future Changes to this Arbitration
Agreement</span></b></p>

                <p
                  className="MsoNormal" ><span
                  >Notwithstanding any provision in these Terms
to the contrary, you and we agree that if we make any change to this
Arbitration Agreement (other than a change to any notice address or website
link provided herein) in the future, such change shall not be effective until
at least 60 days from the date of posting, and shall not apply to any claim
that was filed in a legal proceeding against PreschoolPatch.com prior to the
effective date of the change. Moreover, if we seek to terminate this
Arbitration Agreement from these Terms, such termination shall not be effective
until 30 days after the version of these Terms not containing the Arbitration
Agreement is posted to the Site, and shall not be effective as to any claim
that was filed in a legal proceeding against PreschoolPatch.com prior to the
effective date of removal.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="governingLaw" href="/#"><b><span
                    ><span >14.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Governing Law and Jurisdiction</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >These Terms, and all claims relating to or
arising out of this contract, or the breach thereof, whether sounding in
contract, tort, or otherwise, shall be governed by the laws of the State of
Delaware, including Delaware's statutes of limitations governing your claim,
without giving effect to its principles of conflicts of law, provided that the
Federal Arbitration Act shall govern the interpretation and enforcement of
Section 13, the Arbitration Agreement.</span></p>

                <p
                  className="MsoNormal" ><span
                  >Unless you and we agree otherwise, in the
event that the Arbitration Agreement is found not to apply to you or to a
particular claim or dispute (except for small-claims court actions), either as
a result of your decision to opt-out of the Arbitration Agreement or as a
result of a decision by the arbitrator or a court order, you agree that any
claim or dispute that has arisen or may arise between you and PreschoolPatch.com
must be resolved exclusively by a state or federal court located in the State
of Delaware. You and PreschoolPatch.com agree to submit to the personal
jurisdiction of the courts located within the State of Delaware for the purpose
of litigating all such claims or disputes.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="ConsentToElectronicCommunication" href="/#"><b><span
                    ><span >15.<span
                      >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Consent to Electronic Communication</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >By using the Site or Services of PreschoolPatch.com,
you agree to allow PreschoolPatch.com to communicate with you electronically,
and you consent to electronic delivery of notices, documents, or products
(including, without limitation, reports or copies of Background Checks and
Preliminary Membership Screens) from PreschoolPatch.com via the PreschoolPatch.com
Site, mobile application, online messaging platform, or e-mail. You also agree
to check your PreschoolPatch.com account, alerts, and messages, and the e-mail
account reflected on your PreschoolPatch.com on a reasonably regular basis to
stay apprised of important notices and information about your account.</span></p>

                <p
                  className="MsoNormal" ><a name="misc" href="/#"><b><span
                  ><span >16.<span
                    >&nbsp;&nbsp;
                    </span></span></span></b><b><span
                  >Miscellaneous</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >Nothing in this Agreement shall be construed
as making either party the partner, joint <span className="SpellE">venturer</span>,
agent, legal representative, employer, contractor or employee of the other.
Neither party shall have, or hold itself out to any third party as having any
authority to make any statements, representations or commitments of any kind,
or to take any action, that shall be binding on the other, except as provided
for herein or authorized in writing by the party to be bound. The invalidity,
illegality or unenforceability of any term or provision of these Terms shall in
no way effect the validity, legality or enforceability of any other term or
provision of these Terms. Each Affiliate (as defined in Section 1.2) is
expressly made a <span className="GramE">third party</span> beneficiary of this
Agreement and may enforce this Agreement directly against you. This Agreement
will be binding on and will inure to the benefit of the legal representatives,
successors and assigns of the parties hereto.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="severability" href="/#"><b><span
                    ><span >17.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Severability</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >If a court decides that any term or provision of
these Terms other than Section 13.2 is invalid or unenforceable, the parties
agree to replace such term or provision with a term or provision that is valid
and enforceable and that comes closest to expressing the intention of the
invalid or unenforceable term or provision, and these Terms shall be
enforceable as so modified. If a court decides that any of the provisions of
Section 13.2 are invalid or unenforceable, then the entirety of Section 13
shall be null and void. The remainder of the Terms will continue to apply.</span></p>

                <p
                  className="MsoNormal" ><a
                    name="contact" href="/#"><b><span
                    ><span >18.<span >&nbsp;&nbsp;
                      </span></span></span></b><b><span
                    >Contact
Information</span></b></a></p>

                <p
                  className="MsoNormal" ><span
                  >If you have any questions or need further
information as to the Site or Services provided by PreschoolPatch.com, or need
to notify PreschoolPatch.com as to any matters relating to the Site or Services
please contact PreschoolPatch.com at:</span></p>

                <p
                  className="MsoNormal" ><span
                  >Legal Department<br/>
PreschoolPatch.com, Inc.<br/>
1000 Seagull Ct<br/>
Chesapeake, VA 23322 USA</span></p>


              </div>
              <a href="#TopTerms">Return to Top</a>
            </div>

          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />

      </div>

      <PatchLogo />

      <Footer />
    </div>
  );
};
export default TermsOfUse;
