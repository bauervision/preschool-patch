/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Logo, Elegant } from '../images';

import './style.css';

const PrivacyPolicy = ({ pageUpdate, loggedInUser }) => {
  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }} name="TopPrivacy">Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru "
          style={{
            justifyContent: 'space-evenly',

          }}
        >


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Privacy Policy</div>

            </div>

            <div className="MarginTop TextLeft Margins">


              <div className="WordSection1">

                <p className="MsoNormal"><b><span>PreschoolPatch.com Privacy Policy</span></b></p>

                <p className="MsoNormal" ><b><span>Last Updated: April 11, 2020</span></b><span ></span></p>

                <p className="MsoNormal">PreschoolPatch.com
offers various services to help its users find, coordinate, and maintain
quality Preschool. <span className="SpellE">{"PreschoolPatch.com's"}</span> Privacy
Policy (&quot;Privacy Policy&quot;) is designed to explain the information we
collect and how we use it to provide our services and give users a better
experience. It applies to any users of www.PreschoolPatch.com and any web
pages, mobile applications and mobile websites operated by PreschoolPatch.com
(collectively, the &quot;Site&quot;), including those who are seeking to find preschool
service providers through PreschoolPatch.com (&quot;Preschool Seekers&quot;) as
well as those who are looking to promote their services through PreschoolPatch.com
(&quot;Preschool Providers. </p>

                <p className="MsoNormal">For purposes of this
Privacy Policy, the terms &quot;PreschoolPatch.com,&quot; &quot;we,&quot;
&quot;us,&quot; and &quot;our&quot; refer to PreschoolPatch.com, Inc. &quot;You&quot;
refers to you, as a visitor or user or the Site or the Services. This Privacy Policy
does not apply to third party entities that may use the Site or Services. Such
entities' use of the Site and Services are subject to separate terms that they
agreed to when they registered or otherwise contracted with PreschoolPatch.com.
Other capitalized terms that are not expressly defined in this Privacy Policy
have the same meaning as set forth in the PreschoolPatch.com&nbsp;<span
                ><a href="/terms"><span>Terms of Use</span></a></span><span>.</span></p>

                <p className="MsoNormal">By using the Site
and/or the Services, you consent to our collection, storage, use and disclosure
of your information as described in this Privacy Policy</p>

                <p className="MsoNormal" ><b><span><span>I.<span>
                </span></span></span></b><span ><a
                  href="#infoWeCollect"><b><span
                  >Information We Collect and their Sources</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal"><b><span
                ><span><span
                  >&nbsp;
                  </span>A.<span >
                  </span></span></span></b><span ><a
                  href="#infoYouProvide"><b><span
                  >Information you provide</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal"><b><span
                ><span><span
                  >&nbsp;
                  </span>B.<span >
                  </span></span></span></b><span ><a
                  href="#infoProvidedByOthers"><b><span
                  >Information provided by others</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal"><b><span
                ><span><span
                  >&nbsp;
                  </span>C.<span >
                  </span></span></span></b><span ><a
                  href="#infoAuthorized"><b><span
                  >Information you expressly authorize us to
collect</span></b></a></span><b><span ></span></b></p>

                <p className="MsoNormal"><b><span
                ><span><span
                  >&nbsp;
                  </span>D.<span >
                  </span></span></span></b><span ><a
                  href="#infoAuto"><b><span
                  >Automatically collected information</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span></span>II.<span>
                  </span></span></span></b><span ><a
                  href="#howWeUseInfo"><b><span
                  >Purposes <span className="GramE">For</span> Which We Use Information</span></b></a></span><b><span></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span
                  >&nbsp; </span>III.<span >
                  </span></span></span></b><span ><a
                  href="#howWeShareInfo"><b><span
                  >How We Share and Categories of Third Parties <span
                      className="GramE">With</span> Whom We Share Information</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span></span>IV.<span
                  >
                  </span></span></span></b><span ><a
                  href="#yourChoices"><b><span
                  >Your Choices Regarding the Sharing of your
Information</span></b></a></span><b><span></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span
                  > </span>V.<span
                  >
                  </span></span></span></b><span ><a
                  href="#yourCommChoices"><b><span
                  >Your Communication Choices</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span
                  ></span>VI.<span
                  >
                  </span></span></span></b><span ><a
                  href="#editPersonalInfo"><b><span
                  >Changing or Removing your Information and
Closing your Account</span></b></a></span><b><span></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span>VII.<span
                  >
                  </span></span></span></b><span ><a
                  href="#collectChildInfo"><b><span
                  >Collection of Information from Children</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span>VIII.<span
                  >
                  </span></span></span></b><span ><a
                  href="#protection"><b><span
                  >How We Protect Information</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span
                  ></span>IX.<span
                  >
                  </span></span></span></b><span ><a
                  href="#linksToOtherSites"><b><span
                  >Links to other Websites</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span
                  > </span>X.<span
                  >
                  </span></span></span></b><span ><a
                  href="#changesToPrivacy"><b><span
                  >Changes to our Privacy Policy</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span><span></span>XI.<span
                  >
                  </span></span></span></b><span ><a
                  href="#caliRights"><b><span
                  >Privacy Information for California Residents</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span><span>XII.<span>
                </span></span></span></b><span ><a
                  href="#nevadaRights"><b><span
                  >Privacy Information for Nevada Residents</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal" ><b><span
                ><span>XIII.<span
                  >
                  </span></span></span></b><span ><a
                  href="#contactUs"><b><span
                  >Contact Us</span></b></a></span><b><span
                ></span></b></p>

                <p className="MsoNormal"><a name="infoWeCollect" href="/#"><b><span><span>I.<span
                >
                </span></span></span></b><b><span>Information
We Collect and their Sources</span></b></a></p>

                <p className="MsoNormal">How we collect and
store information depends on the Services you use and the activities in which
you participate. You can use some of the Site and Services without providing
any information other than that automatically collected as described below.</p>

                <p className="MsoNormal">Visitors who access
and browse the Site without registering are &quot;Site Visitors.&quot; In order
to utilize some of the Services offered by PreschoolPatch.com, you must
register with PreschoolPatch.com. All users who register with PreschoolPatch.com
are &quot;Registered Users.&quot;</p>

                <p className="MsoNormal"><a name="infoYouProvide" href="/#"><b><span
                ><span>A.<span
                  >
                  </span></span></span></b><b><span >Information
you provide</span></b></a></p>

                <p className="MsoNormal">Regardless of whether
you are a Site Visitor or a Registered User, all information that you provide
to us when registering, posting a profile, communicating through the Site,
discussing Preschool options over the phone, utilizing our mobile applications
or that you otherwise provide on the Site or by phone, email, postal mail or
otherwise, will be stored by us. You represent and warrant to us that you have
the right and authority to provide us all information you provide about yourself
or others. You may provide us with information in various ways, including:</p>

                <p className="MsoNormal"><b><span ><span>1.<span
                >&nbsp;
                </span></span></span></b><b><span >When registering</span></b></p>

                <p className="MsoNormal">When you register
directly through PreschoolPatch.com, we will collect and store the information
that you provide to us on our online registration forms. This may include,
among other information, your:</p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >first and last name</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >email address</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >home address</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >gender</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >birthday</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >phone number</span></p>

                <p className="MsoNormal">Some users may have
the opportunity to register with PreschoolPatch.com by connecting through
Facebook's application programming interface (API). Please see Section I.B.4
below to learn about the information we access, collect and store if you
register with PreschoolPatch.com through Facebook.</p>

                <p className="MsoNormal"><b><span ><span>2.<span
                >&nbsp;
                </span></span></span></b><b><span >When posting a profile</span></b></p>

                <p className="MsoNormal">If you are a Preschool
Provider, we collect and store <span className="GramE">all of</span> the additional
information that you provide to us in your profile. This may include, among
other information:</p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >details on the Preschool
you offer, including for example the type of Preschool you provide, your
availability, your location, your level of education, languages you speak, your
ability to drive</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >related services you
provide</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >pictures you choose to post</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your phone numbers</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >references, if you choose to provide them</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >any other information you choose to include in your profile</span></p>

                <p className="MsoNormal"><b><span ><span>3.<span
                >&nbsp;
                </span></span></span></b><b><span >By telephone</span></b></p>

                <p className="MsoNormal">Both Site Visitors and
Registered Users may provide information to PreschoolPatch.com when they
contact Member Preschool or utilize certain Services PreschoolPatch.com may
offer by telephone. For example, if you call PreschoolPatch.com to discuss Preschool
options over the phone, we will collect and store all of the information you
chose to provide to us, including but not limited to financial information,
information about the Preschool you need, health information about the child
you seek Preschool for, your contact information, etc. If you provide
information about someone other than yourself, you represent that you have
authority to do so.</p>

                <p className="MsoNormal"><b><span ><span>4.<span
                >&nbsp;
                </span></span></span></b><b><span >Otherwise through the Site or by telephone, email, postal
mail or chat</span></b></p>

                <p className="MsoNormal">Certain Registered
Users may provide additional information on the Site through other Site
features and offerings such as our online communication platforms, groups and
payment platforms and our senior Preschool offerings. In some cases, Site
Visitors may have the ability to provide us information through the Site, such
as contact information. In addition, both Registered Users and Site Visitors
may choose to provide information by phone, email, postal mail, or chat. We
collect and store <span className="GramE">all of</span> the information you provide
us through these channels. Moreover, if you provide information about someone
other than yourself through any of these channels, you represent that you have
authority to do so.</p>

                <p className="MsoNormal"><a name="infoProvidedByOthers" href="/#"><b><span
                ><span>B.<span
                  >
                  </span></span></span></b><b><span >Information
provided by others</span></b></a></p>

                <p className="MsoNormal"><b><span ><span>1.<span
                >&nbsp;
                </span></span></span></b><b><span >By Site Visitors, Registered Users and others</span></b></p>

                <p className="MsoNormal">PreschoolPatch.com
also captures and collects information that Site Visitors, Registered Users and
others provide about one another. For example, Preschool Providers may invite
Site Visitors, Registered Users or others to rate and indicate their relationship
to the Preschool Provider on the Site. Additionally, certain Registered Users
may post reviews about individual Preschool Providers. PreschoolPatch.com may
also obtain and post audio recordings of Preschool Provider references, which
may also be accessed from the Site. In addition, certain Registered Users may
communicate directly with one another through PreschoolPatch.com platforms.
Site Visitors, Registered Users and others also may provide us information
about Registered Users by phone, email or postal mail. PreschoolPatch.com
captures and stores all information it receives from Site Visitors, Registered
Users and others about other Registered Users and Site Visitors.</p>

                <p className="MsoNormal"><b><span ><span>2.<span
                >&nbsp;
                </span></span></span></b><b><span >By third parties to verify your information and
representations</span></b></p>

                <p className="MsoNormal">In order to promote the
safety and integrity of the Site and Service, you authorize PreschoolPatch.com,
as provided in the Terms of Use, to utilize third party service providers to
check your information on an ongoing basis against a variety of sources, which
may include, but are not limited to, national criminal databases, sex offender
registries, certain media streams, terrorist watch lists, criminal and fugitive
watch lists, fraud watch lists, law enforcement reports, and other data to
assist us in verifying the information you provide us (such as your name,
address, email address, etc.) and the representations and warranties you make
in the Terms of Use and on the Site (such as representations regarding your
criminal background) (&quot;Preliminary Membership Screens&quot;). The results
of any Preliminary Membership Screens will be made available to PreschoolPatch.com.</p>

                <p className="MsoNormal"><b><span ><span>3.<span
                >&nbsp;
                </span></span></span></b><b><span >By third parties that perform background checks</span></b></p>

                <p className="MsoNormal">As provided in the
Terms of Use, we may provide some or all Registered Users and Site Visitors
with the ability to request from a third-party consumer reporting agency that a
background check be run on themselves or on Preschool Providers they are
considering hiring using information that they and any subject Preschool
Providers may provide. Any such background checks will be subject to the terms
we establish for such checks on the Site pages where they are requested or
authorized, the terms of this Privacy Policy, and our Terms of Use. PreschoolPatch.com
may receive a copy of, or otherwise have access to, any such background check,
unless otherwise specified in this Privacy Policy or the Terms of Use.</p>

                <p className="MsoNormal"><b><span ><span>4.<span
                >&nbsp;
                </span></span></span></b><b><span >By Facebook if you connect to PreschoolPatch.com through
Facebook</span></b></p>

                <p className="MsoNormal">You may have the
opportunity to connect to PreschoolPatch.com through Facebook's API when you
register for PreschoolPatch.com or after you have registered for PreschoolPatch.com.
If you connect to PreschoolPatch.com through Facebook, either when you register
or after you have registered, we will collect, store, and use in accordance
with this Privacy Policy any and all information you agreed that Facebook could
provide to PreschoolPatch.com through its API. Your agreement (and our access
to your information) takes place when you instruct, accept or allow Facebook to
register you for a PreschoolPatch.com account or otherwise connect to PreschoolPatch.com
through Facebook. The information PreschoolPatch.com may access, collect and
store may include the following, among other information, as allowed by you,
Facebook's API, and your Facebook privacy settings:</p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your name</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your profile <span
                  className="GramE">picture</span></span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your email <span
                  className="GramE">address</span></span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your gender</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your birthday</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your location (i.e.
city)</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >the names and pictures
of your Facebook friends</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >your interests and
affinity networks</span></p>

                <p className="MsoNormal" ><span ><span><span
                >&nbsp; </span>�<span >
                </span></span></span><span >other information you
make publicly available via Facebook</span></p>

                <p className="MsoNormal"><b><span ><span>5.<span
                >&nbsp;
                </span></span></span></b><b><span >By other sources</span></b></p>

                <p className="MsoNormal">In addition, we may
obtain information about you from other sources (e.g., partners, researchers,
marketers, etc.), such as demographic data, and other information to enable us
to comply with regulatory requirements, ensure the accuracy of data, better
understand your likely interests, prevent fraud, etc. We may combine
information that we collect from you with information about you from such other
sources and use it in accordance with this Privacy Policy.</p>

                <p className="MsoNormal"><a name="infoAuthorized" href="/#"><b><span
                ><span>C.<span
                  >
                  </span></span></span></b><b><span >Information
you expressly authorize us to collect</span></b></a></p>

                <p className="MsoNormal">We may from time to
time request permission to collect certain information from or about you. For
example, if you use a PreschoolPatch.com mobile application, we may request
permission to access information about the contacts listed in your mobile
device phone book when you initiate an address book search for friends who have
downloaded the application. We may also request permission to access and store
your location (e.g., your precise GPS-based functionality on the mobile devices
used to access the Site and Services). If you grant your permission, we will
access and/or store such information unless you subsequently opt out by
adjusting the settings in your mobile device. See your device manufacturer's
instructions for further details.</p>

                <p className="MsoNormal"><a name="infoAuto" href="/#"><b><span
                ><span>D.<span
                  >
                  </span></span></span></b><b><span >Automatically
collected information</span></b></a></p>

                <p className="MsoNormal">We may automatically
collect certain information about the computer or devices (including mobile
devices) you use to access the Site and Services as described in this section
below.</p>

                <p className="MsoNormal"><b><span ><span>1.<span
                >&nbsp;
                </span></span></span></b><b><span >Log files, IP addresses and information about your
computer and mobile device</span></b></p>

                <p className="MsoNormal">When you visit the
Site, PreschoolPatch.com receives the internet protocol (&quot;IP&quot;)
address of your computer (or the proxy server you use to access the internet),
your computer operating system, the type of web browser you are using, and browser
language. If you are using a mobile device, PreschoolPatch.com may also receive
unique device identifiers and other information about your mobile or other
device(s), and mobile operating system. We may correlate this information with
other information we have about you. We may also automatically collect
information related to the ways in which you interact with the Site and the
Services, such as referring and exit pages, URLs, platform type, the number of
clicks, domain names, landing pages, pages and content viewed (including ads
viewed) and the order of such views, the amount of time spent on particular
pages, the date and time you use the Services, error logs, and other similar
information.</p>

                <p className="MsoNormal"><b><span ><span>2.<span
                >&nbsp;
                </span></span></span></b><b><span >Cookies and other technologies</span></b></p>

                <p className="MsoNormal">A cookie is a tiny
data file that resides on your computer, mobile phone, or other device, and
allows us to recognize you when you return to the Site using the same computer
(or mobile device) and web browser. Like most websites, we use cookies, and
tracking pixels to track Site usage and trends, evaluate the effectiveness of
our ads both on and off our Site, customize your experience on the Site and
improve the quality of our Services. For example, using these technologies we
can determine, among other things, which pages of our Site you visit and which
ads you click on. Most browsers automatically accept cookies, but you can
modify your browser settings to decline cookies. In some cases, however, doing
so may impact your ability to use PreschoolPatch.com. Tracking pixels do not
identify individual users, and the analysis of data obtained by tracking pixels
is performed on an aggregate basis.</p>

                <p className="MsoNormal"><b><span ><span>3.<span
                >&nbsp;
                </span></span></span></b><b><span >Online analytics and advertising</span></b></p>

                <p className="MsoNormal">When you visit our
Site or open one of our emails, we may allow authorized third parties, such as
ad servers, ad agencies, ad exchanges, ad technology vendors, and research
firms, to place or recognize a unique cookie, pixel, and/or similar
technologies on your browser in order to provide you relevant PreschoolPatch.com
advertisements as you surf the Internet. These advertisements may be targeted
to you based on information these authorized third parties know or infer about
you and include in the cookies placed on your browser, and/or on information
about your Internet browsing activities gathered through your browser. If you
prefer not to receive these online behavioral advertisements, you may
opt-out&nbsp;
                <a href="http://www.networkadvertising.org/managing/opt_out.asp">
                  <span>here&nbsp;</span>
                </a>
                <span>or&nbsp;</span>
                <span >
                  <a href="http://www.aboutads.info/choices/">
                    <span>here</span>
                  </a>
                </span>

                <span className="GramE">In order for</span> the opt-out to work,
your browser must be set to accept third party cookies. Furthermore, if you buy
a new computer or mobile device, change web browsers or delete the opt-out
cookie, you will need to perform the opt-out task again. Please note that if
you opt-out you may continue to receive PreschoolPatch.com advertisements as
you surf the Internet, including contextual ads based on the content on a
webpage you are visiting. However, these advertisements will not be displayed
based on information contained in, or collected by, cookies or other
technologies placed on your browser when you visit our Site or open our emails.</p>

                <p className="MsoNormal">We also use Google
Analytics to measure Site usage and improve our visitor experience. The
relevant data is provided to us by Google in the aggregate (i.e., individual
users are not identified) and allows us to better understand our Site audience.
The Google Analytics features implemented by us allow us (<span className="SpellE">i</span>)
to evaluate and generate reports on certain demographic, behavioral, and
interest metrics of users collected by Google, and (ii) to create advertising
remarketing audiences and campaigns based on such metrics, which may be
segmented into aggregated groups.</p>

                <p className="MsoNormal">Visitors can opt-out
of Google Analytics for Display Advertising and customize Google Display
Network ads using the Ads Settings form at&nbsp;
                <span>
                  <a href="https://www.google.com/settings/ads">
                    <span>https://www.google.com/settings/ads</span>
                  </a>
                </span>
                </p>

                <p className="MsoNormal" ><b><span >Do Not Track Notice.</span></b><span
                >&nbsp;Some browsers used to access the
Internet may give you the option through &quot;Do Not Track&quot; settings
associated with such browsers to request that a website operator not track your
information across its website or other websites. We engage in such tracking in
order to optimize and/or customize our Services, detect and respond to
allegations of fraud, and to otherwise ensure the safety of our Registered
Users and Site Visitors. While we do not currently honor such browser requests,
we will not use your information in a manner that violates this Privacy Policy.
In addition, you retain the ability to opt out of certain online analytics and
advertising activities as discussed in this section above.</span></p>

                <p className="MsoNormal"><b><span ><span>4.<span
                >&nbsp;
                </span></span></span></b><b><span >Social media features and widgets</span></b></p>

                <p className="MsoNormal">Our Site includes
social media features and widgets, such as the Facebook &quot;Like&quot; button
and the Facebook &quot;Share&quot; button. These features may collect your IP
address, the URL of the page you are visiting on our <span className="GramE">Site,
and</span> may set a cookie to enable the feature to function properly. Social
media features and widgets are either hosted by a third party or hosted
directly on our Site. Your interactions with these features are governed by the
privacy policy of the company providing it.</p>

                <p className="MsoNormal"><a name="howWeUseInfo" href="/#"><b><span><span>II.<span
                >
                </span></span></span></b><b><span>Purposes
                  <span className="GramE">For</span> Which We Use Information</span></b></a></p>

                <p className="MsoNormal">In general, the
information we collect is used for our business purposes: (1) to improve our
Services and enhance your experience with PreschoolPatch.com, (2) to enable us
to provide a safer community for all of our Registered Users, and (3) to help
us communicate with you. For example, we may use your information to:</p>

                <p className="MsoNormal" ><span ><span>1.<span >&nbsp;
                </span></span></span><span >register and service
your account;</span></p>

                <p className="MsoNormal" ><span ><span>2.<span >&nbsp;
                </span></span></span><span >include in Preschool
Seeker profiles and Preschool Provider profiles;</span></p>

                <p className="MsoNormal" ><span ><span>3.<span >&nbsp;
                </span></span></span><span >contact you in
response to questions and solicit feedback and input from you;</span></p>

                <p className="MsoNormal" ><span ><span>4.<span >&nbsp;
                </span></span></span><span >notify you about new
features of the Services, special events, or products, services, and special
offers, or other information that we believe will be of interest to you via
email, SMS messages, or other media or networks;</span></p>

                <p className="MsoNormal" ><span ><span>5.<span >&nbsp;
                </span></span></span><span >administer sweepstakes
and contests;</span></p>

                <p className="MsoNormal" ><span ><span>6.<span >&nbsp;
                </span></span></span><span >enable Preschool
Seekers with each other and with Preschool Providers to search based on the
information the other has made available on the Site, and information others
have provided about them;</span></p>

                <p className="MsoNormal" ><span ><span>7.<span >&nbsp;
                </span></span></span><span >connect Preschool
Seekers with Preschool Providers that appear to meet their needs and
preferences;</span></p>

                <p className="MsoNormal" ><span ><span>8.<span >&nbsp;
                </span></span></span><span >enable Registered
Users to search for, find, interact, connect and share information with other
Registered Users they may have an interest in interacting with;</span></p>

                <p className="MsoNormal" ><span ><span>9.<span >&nbsp;
                </span></span></span><span >enable Registered
Users who connect to PreschoolPatch.com through Facebook to see which of their
Facebook friends who have connected to PreschoolPatch.com through Facebook are
Registered Users or friends with other Registered Users who have connected to PreschoolPatch.com
through Facebook;</span></p>

                <p className="MsoNormal" ><span ><span>10.<span >
                </span></span></span><span >verify information you
provide us as well as the representations and warranties you make to us in the
Terms of Use or on the Site;</span></p>

                <p className="MsoNormal" ><span ><span>11.<span >
                </span></span></span><span >perform analytics and
research aimed at improving the accuracy, effectiveness, usability, or
popularity of the Services;</span></p>

                <p className="MsoNormal" ><span ><span>12.<span >
                </span></span></span><span >generate and review
reports and data about our user base and usage patterns, including to improve
the content and features of the Services or develop new Services;</span></p>

                <p className="MsoNormal" ><span ><span>13.<span >
                </span></span></span><span >otherwise help protect
the safety and integrity of the Site and PreschoolPatch.com users; and</span></p>

                <p className="MsoNormal" ><span ><span>14.<span >
                </span></span></span><span >personalize
promotional messages or content on the Site, via email or other ads on PreschoolPatch.com
or <span className="GramE">third party</span> sites.</span></p>

                <p className="MsoNormal">We may aggregate
and/or de-identify information collected by the Site, the Services, or via
other means so that the information is not intended to identify you. Our use
and disclosure of aggregated and/or de-identified information is not subject to
any restrictions under this Privacy Policy, and we may disclose it to others
without limitation for any purpose.</p>

                <p className="MsoNormal"><a name="howWeShareInfo" href="/#"><b><span><span>III.<span
                >
                </span></span></span></b><b><span>How
We Share and Categories of Third Parties <span className="GramE">With</span> Whom We
Share Information</span></b></a></p>

                <p className="MsoNormal">In addition to using
the information collected by PreschoolPatch.com for the purposes described
above, we may also share your information with various third parties, as
described below. Please review our sharing policy closely. By using our Site or
our Services, you agree to allow us to share the information you provide to us
in the ways described below. Your ability to make changes to what information
is shared is described below in Section IV.</p>

                <p className="MsoNormal"><b><span
                ><span>A.<span
                  >&nbsp;
                  </span></span></span></b><b><span >With All Site Visitors and Registered Users</span></b></p>

                <p className="MsoNormal">If you are a Preschool
Seeker or a Preschool Provider, in order to increase your chances of finding a
job or finding the Preschool you need, we share with Site Visitors and
Registered Users the information that is included in your profile, aside from
your contact information, as well as the following registration information,
which we may include in your profile: your first name, first initial of your
last name, city, state, profile picture, and if you are a Preschool Provider,
your gender and, unless you opt-out, your age. With certain exceptions, you
choose how much detail you want to include in either your job posting or your
profile. We may also share on your profile or job posting any company reviews
you have posted on our Site, whether you have connected to PreschoolPatch.com
through Facebook, and any connections you have with other PreschoolPatch.com
members, including the nature of those connections. If you are a Preschool
Provider and have elected to verify certain information with PreschoolPatch.com
or to have a background check performed, we may also disclose that information
in your profile as a Registered User in addition to your response rate and any
payment or payroll preferences you have indicated.</p>

                <p className="MsoNormal">We may display
personal testimonials of Registered Users and other endorsements on our Site or
in other marketing materials. These testimonials or endorsements may include
information such as the Registered User's first name, first initial of last
name, town and state. With a Registered User's consent, we may include their
full name.</p>

                <p className="MsoNormal"><b><span
                ><span>B.<span
                  >&nbsp;
                  </span></span></span></b><b><span >With other Registered Users and corporate providers</span></b></p>

                <p className="MsoNormal">In addition to the
information that is provided to all Registered Users and Site Visitors, Preschool
Provider reviews and references are made available to certain Registered Users.
If you are a Preschool Provider, your phone number may be visible to certain
Registered Users if you elect to share it in your profile. In addition, your
approximate residential location (through Google map plotting) is made
available to certain Registered Users and Site Visitors unless you elect to
keep that information confidential.</p>

                <p className="MsoNormal">If you are a Preschool
Seeker or a Preschool Provider, you will appear in search result listings if
you match the search criteria used by a Preschool Provider or Preschool Seeker,
as applicable. Similarly, you may appear in emails sent to Preschool Providers
or Preschool Seekers in your area. Preschool Seekers may opt-out of being
included in Preschool Provider search results and in certain emails sent to Preschool
Providers. In addition, if you are a Preschool Seeker and you view the profile
of certain Preschool Providers, those Preschool Providers will be able to see
that you have viewed their profiles unless you opt-out of that information
sharing.</p>

                <p className="MsoNormal">If you are a
Registered User, your PreschoolPatch.com online status may be made available to
other Registered Users unless you elect to keep that information confidential.</p>

                <p className="MsoNormal">If you connect to PreschoolPatch.com
through Facebook, we may allow any of your Facebook friends who have connected
to PreschoolPatch.com through Facebook to see that you are a Registered User.
In addition, other Registered Users who have connected to PreschoolPatch.com
through Facebook will be able to see if you are friends with any of their
Facebook friends or if you share certain affinities or interests with them.</p>

                <p className="MsoNormal" ><b><span >If we terminate your
registration for any reason, we reserve the right to send a notice of your
termination to other Registered Users with whom we believe you have
corresponded.</span></b><span ></span></p>

                <p className="MsoNormal"><b><span
                ><span>C.<span
                  >&nbsp;
                  </span></span></span></b><b><span >With vendors/service providers</span></b></p>

                <p className="MsoNormal">We also share
information with vendors with whom we have a contractual relationship and who
perform services for PreschoolPatch.com including, without limitation, vendors
who provide email, demographic information, or geo-location information
services, vendors who perform background checks or Preliminary Membership
Screens, vendors who process or accept credit card payments, vendors who run
classified advertising businesses, vendors who send SMS messages to Registered
Users' mobile phone numbers, vendors who provide services that enable us and
other third parties to detect and prevent fraud, in each case to the extent
applicable. In certain cases (such as for vendors who help facilitate our
online communication services or provide fraud detection and prevention
services), the information we share may include the contents of written and
audio messages you send through our online communication platforms.</p>

                <p className="MsoNormal" ><b>With listings in and through Google and other
public search engines, social media sites (e.g. Facebook, Google+), and on
other <span className="GramE">third party</span> websites)</b></p>

                <p className="MsoNormal">In an effort to
further facilitate the ability of Preschool Providers to find a students,
selected information contained in Preschool Provider profiles, which may
include photo, first name, first initial of last name, city, state, and
job/provider description, may also be shared with third party search engines,
social media sites, and other third party websites or vendors who run
classified advertising and other businesses, and thus may be listed in third
party web site search results and on third party websites, which would make
that information available to the public and allow them to link to your PreschoolPatch.com
posting. If you post information in a PreschoolPatch.com online group forum,
such as the Working Moms Group, your content, including your name as the
contributor, may be displayed in third party search engine results and
available to the public.</p>

                <p className="MsoNormal"><b><span
                ><span>D.<span
                  >&nbsp;
                  </span></span></span></b><b><span >With Facebook if you connect to PreschoolPatch.com through
Facebook</span></b></p>

                <p className="MsoNormal">If you connect to PreschoolPatch.com
through Facebook's API, you may elect to post certain of your activities on PreschoolPatch.com
back to your Facebook account. You will be prompted to decide <span
                  className="GramE">whether or not</span> to share those PreschoolPatch.com activities
back to your Facebook account.</p>

                <p className="MsoNormal"><b><span
                ><span>E.<span
                  >&nbsp;
                  </span></span></span></b><b><span >As required by law or for reasons of safety</span></b></p>

                <p className="MsoNormal">We may disclose your
information when we believe in good faith that such disclosure is appropriate
in order to investigate, prevent, or take action regarding possible illegal
activities, suspected fraud, situations involving potential threats to the
health or physical safety of any person, violations of this Privacy Policy, the
Terms of Use, and/or to protect the rights and property of PreschoolPatch.com,
our employees, users, and the public. This may involve the sharing of your
information with law enforcement, government agencies, courts, and/or other
organizations.</p>

                <p className="MsoNormal"><b><span
                ><span>F.<span
                  >&nbsp;
                  </span></span></span></b><b><span >With our affiliates</span></b></p>

                <p className="MsoNormal">You acknowledge and
agree that we may disclose any of the information we've collected about you to
any of our affiliates or subsidiaries for the purposes of providing you with
the Services, operating the Site, soliciting you for potential employment
opportunities with those affiliates or subsidiaries, and our other commercial
purposes, including those of our affiliates and subsidiaries.</p>

                <p className="MsoNormal"><b><span
                ><span>G.<span
                  >
                  </span></span></span></b><b><span >With Your Consent</span></b></p>

                <p className="MsoNormal">We also may share your
information with a third party if you consent to the sharing.</p>

                <p className="MsoNormal"><b><span
                ><span>H.<span
                  >&nbsp;
                  </span></span></span></b><b><span >Background Checks</span></b></p>

                <p className="MsoNormal">PreschoolPatch.com
offers various background check services from consumer reporting agencies. A Preschool
Provider can authorize a Motor Vehicle Records Check, Criminal Records Check,
Criminal+ MVR Check, or an Investigative Criminal Plus check in response to a
request by a Preschool Seeker who is considering hiring him or her. If you
authorize a background check to be run on you in response to a request by a Preschool
Seeker who is considering hiring you, the results of the check will be shared
directly with the Preschool Seeker. If you are a Registered User who has
requested a background check through PreschoolPatch.com, a statement may be
included in your profile to confirm that you have completed that check. The
service provider who completes the background check may also send the results
to you by email or postal mail.&nbsp;<b>You acknowledge that sensitive material
may be included in your background check, and that you are responsible for
providing us and our service provider (if applicable) with correct information.</b></p>

                <p className="MsoNormal"><b><span
                ><span>I.<span
                  >&nbsp;
                  </span></span></span></b><b><span >Business transactions</span></b></p>

                <p className="MsoNormal">In the event we go
through a business transition such as a merger, acquisition by another company,
or sale of all or a portion of our assets, your information may be among the
assets transferred. You acknowledge and consent that such transfers may occur
and are permitted by this Privacy Policy, and that any acquirer of ours or that
acquirer's affiliates may continue to process your information as set forth in
this Privacy Policy</p>

                <p className="MsoNormal"><a name="yourChoices" href="/#"><b><span><span>IV.<span
                >
                </span></span></span></b><b><span>Your
Choices Regarding the Sharing of your Personal Information</span></b></a></p>

                <p className="MsoNormal">Registered Users have
control over what optional information they choose to share with us when
utilizing our Services (such as pictures, certain details in a job description
or profile, etc.).</p>

                <p className="MsoNormal">In addition,
Registered Users have the following opt out choices with respect to the sharing
of their information:</p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Registered Users who have connected to PreschoolPatch.com
through Facebook may subsequently opt out of having certain of their Facebook
information shared with PreschoolPatch.com and certain of their PreschoolPatch.com
information shared with Facebook by disabling Facebook Connect in their&nbsp;</span><u><span>account settings</span></u><span
                >.</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Preschool Providers who have chosen to have
their phone number made available to other Registered Users can later change
their election so that their number is no longer visible.</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Users of a PreschoolPatch.com mobile
application, who have given PreschoolPatch.com permission to access certain
information from their mobile device such as their location or contacts, may
subsequently opt out of that information sharing by adjusting the settings in
their mobile device.</span></p>

                <p className="MsoNormal"><a name="yourCommChoices" href="/#"><b><span><span>V.<span
                >
                </span></span></span></b><b><span>Your
Communication Choices</span></b></a></p>

                <p className="MsoNormal">By becoming a
Registered User, you are consenting to receive certain email communications
from us, such as special offers, tips and advice, notifications of new Preschool
Seekers or Preschool Providers in your area, customer surveys and
administrative notices.</p>

                <p className="MsoNormal">You have a choice at
any time to stop us from sending you emails for marketing purposes by adjusting
your settings in your&nbsp;
                <u>
                  <span >account settings</span>
                </u>
                <span >. You can also opt out
of commercial email messages by following the &quot;unsubscribe&quot; link
included in these messages. Please note that despite any indicated email
marketing preferences, we may continue to send you administrative emails
regarding PreschoolPatch.com, including, for example, notices of updates to our
Privacy Policy, notifications of new Preschool Seekers or Preschool Providers
in your area, responses to job postings from Preschool Providers, and responses
to job applications from Preschool Providers, if we choose to provide such
notices to you in this manner</span></p>

                <p className="MsoNormal"><a name="editPersonalInfo" href="/#"><b><span><span>VI.<span
                >
                </span></span></span></b><b><span>Changing or Removing your Personal Information and Closing your Account</span></b></a></p>

                <p className="MsoNormal">You can update certain
of your information by logging into your account and accessing your&nbsp;account
settings. If you would like to remove some of the information you have posted
on the Site, such as information you posted in profiles, you may do so by
editing or deleting that item in your My Profile. To request removal of other
information you have voluntarily posted on our Site, such as information you
may have posted in online group forums, contact&nbsp;<span
                ><a
                    href="mailto:admin@PreschoolPatch.com"><span >admin@PreschoolPatch.com</span></a></span><span
                >. In some cases, we may not be able to
reasonably accommodate your request to remove your information, in which case
we will let you know if we are unable to do so and why.</span></p>

                <p className="MsoNormal">If you no longer wish
to participate in our Services, you may close your account directly through
your account settings.</p>

                <p className="MsoNormal">If you close your PreschoolPatch.com
account, we will remove your name and other contact and identifiable
information from our publicly viewable database. If you close your account, we
have no obligation to retain your information, and may delete any or <span
                  className="GramE">all of</span> your account information without liability. However,
we may retain information related to you if we believe it may be necessary to
prevent fraud or future abuse, or for legitimate business purposes, such as
analysis of aggregated, de-identified information, account recovery, auditing
our records, enforcing our rights and obligations under our agreements, or if
required by law. PreschoolPatch.com may also retain and use your information if
                <span className="GramE">necessary</span> to provide the Services to other Registered
Users. For example, just as an email you may send to another person through an
email service provider resides in that person's inbox even after you delete it
from your sent files or close your account, emails you send through PreschoolPatch.com
to other Users, as well as your contributions to PreschoolPatch.com groups, may
remain visible to others after you have closed your account. Similarly, other
information you have shared with others, or that others have copied, may also
remain visible. PreschoolPatch.com disclaims any liability in relation to the
deletion or retention (subject to the terms herein) of information, or any
obligation not to delete the information. PreschoolPatch.com does not control
when search engines update their search index or cache, which may contain
certain profiles or other information that have since been removed from <span
                  className="SpellE">PreschoolPatch.com's</span> Site.</p>

                <p className="MsoNormal"><a name="collectChildInfo" href="/#"><b><span><span>VII.<span
                >
                </span></span></span></b><b><span>Collection of Information from Children</span></b></a></p>

                <p className="MsoNormal" >
                  <span className="SpellE"><span >PreschoolPatch.com's</span></span><span
                  > Site and Services are not intended for
individuals under the age of 14. Moreover, if we become aware that we have
collected personal information (as defined by the Children's Online Privacy
Protection Act) from children under the age of 13, we will take reasonable
steps to delete it as soon as practicable.</span></p>

                <p className="MsoNormal"><a name="protection" href="/#"><b><span><span>VIII.<span
                >
                </span></span></span></b><b><span>How We Protect Information</span></b></a></p>

                <p className="MsoNormal">We have implemented a
variety of administrative, technical, and physical security measures to protect
against the unauthorized access, destruction, or alteration of your
information. These safeguards vary based on the sensitivity of information that
we collect, process, and store and the current state of technology.</p>

                <p className="MsoNormal">Although we take
appropriate measures to safeguard against unauthorized disclosures of
information, we cannot guarantee that information that we collect will never be
disclosed in a manner that is inconsistent with this Privacy Policy.</p>

                <p className="MsoNormal"><a name="linksToOtherSites" href="/#"><b><span><span>IX.<span
                >
                </span></span></span></b><b><span>Links to Other Websites</span></b></a></p>

                <p className="MsoNormal">The Site and Services
may contain links to third-party websites and services. However, we are not
responsible for the privacy practices employed by those web sites or services,
nor are we responsible for the information or content they contain. This
Privacy Policy applies solely to information collected by us through the Site
and Services; thus when you use a link to go from the Site or Services to a
third-party web site or service, this policy is no longer in effect and the
privacy policy of such third-party site or service will govern.</p>

                <p className="MsoNormal"><a name="changesToPrivacy" href="/#"><b><span><span>X.<span
                >
                </span></span></span></b><b><span>Changes to Our Privacy Policy</span></b></a></p>

                <p className="MsoNormal">PreschoolPatch.com
reserves the right to change this Privacy Policy and our Terms of Use at any
time. We will notify you about and provide you with choice about material
changes to this Privacy Policy or in our practices as required by applicable
law. Material changes will go into effect 30 days after we notify. Non-material
changes or clarifications will take effect immediately upon posting of the
updated policy on our Site. You should periodically check&nbsp;<span
                ><a href="/"><span >www.PreschoolPatch.com</span></a></span><span
                >&nbsp;for updates. for updates. Your use of
the Site or the Services after such effective date will constitute acceptance
by you of such changes.</span></p>

                <p className="MsoNormal"><a name="caliRights" href="/#"><b><span><span>XI.<span
                >
                </span></span></span></b><b><span>Privacy
Information for California Residents</span></b></a></p>

                <p className="MsoNormal">If you are a California
resident, California law requires us to provide you with some additional
information regarding how we collect, use, and share your &quot;personal
information&quot; (as defined in the California Consumer Privacy Act
(&quot;CCPA&quot;)).</p>

                <p className="MsoNormal">Categories of personal
information we collect.</p>

                <p className="MsoNormal"><span>&nbsp;Throughout
this Policy, we discuss in detail the specific pieces of personal information
we collect from and about our users. Under the CCPA, we are also required to
provide you with the &quot;categories&quot; of personal information we collect
as defined by California law. The categories we collect depending on the types
of services you use are:</span></p>

                <p className="MsoNormal"><span><span >o</span></span><span
                >identifiers (such as name, address, email
address);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >commercial information (such as transaction
data);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >financial data (such as payment method details
and billing address);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >internet or other network or device activity
(such as browsing history or usage information);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >geolocation information (e.g., your
approximate location based on IP address, or precise location with your
consent);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >inference data about you (e.g., the additional
services or advertising we think would be of most interest to you based on your
interactions with us);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >professional or employment-related data (e.g.,
if you are a Preschool Provider, your references and employment history);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >education information (e.g., if you are a Preschool
Provider, your level of education);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >legally protected classifications (such as
gender or information obtained from a background check, where applicable);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >physical characteristics or description (e.g.,
photos you choose to upload to your job postings or profile);</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >sensory or visual information (e.g. if you
provide us this information in connection with senior Preschool planning or
child Preschool)</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >medical information (e.g. if you provide us
this information in connection with senior Preschool planning or child Preschool);
and</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >other information that identifies or can be
reasonably associated with you (e.g., registration and log-in information).</span></p>

                <p className="MsoNormal">Please note that
specific pieces of your personal information may belong to more than one of the
above referenced categories.</p>

                <p className="MsoNormal">How we source, use, and
share these categories of personal information.</p>

                <p className="MsoNormal"><span>&nbsp;We
source, use, and share with third parties the categories of personal
information we collect from and about you consistent with the various business
and operational purposes we discuss throughout this Policy and for the business
and operational purposes of our service providers in accordance with the CCPA.
See the&nbsp;</span><span ><a
                  href="l#infoWeCollect"><span>&quot;Information We Collect And their
Sources&quot;</span></a></span><span >,&nbsp;</span><span
                ><a
                    href="#howWeUseInfo"><span>&quot;Purposes For Which We Use
Information&quot;</span></a></span><span>&nbsp;and&nbsp;</span><span
                ><a
                    href="#howWeShareInfo"><span>&quot;How We Share and Categories of Third
Parties with Whom We Share Information&quot;</span></a></span><span
                >&nbsp;section(s) above for more information.</span></p>

                <p className="MsoNormal">Please note that the
CCPA sets forth certain obligations for businesses that &quot;sell&quot;
personal information to third parties. We do not engage in such activity and
have not engaged in such activity in the past twelve months from the effective
date of this Policy.</p>

                <p className="MsoNormal">CCPA Rights Disclosure.</p>

                <p className="MsoNormal"><span>&nbsp;If
you are a California resident, the CCPA allows you (or an authorized agent acting
on your behalf) to make certain requests related to your personal information.
Specifically, the CCPA allows you to request us to:</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Inform you about the categories of personal
information we collect or disclose about you; the categories of sources of such
information; the business or commercial purpose for collecting your personal
information; and the categories of third parties with whom we share/disclose
personal information. Such information is also set forth in this Policy.</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Provide access to and/or a copy of certain
personal information we hold about you.</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Delete certain personal information we have about you.</span></p>

                <p className="MsoNormal"><span
                ><span >o<span > </span></span></span><span
                >Provide you with information about the
financial incentives that we offer to you, if any.</span></p>

                <p className="MsoNormal">The CCPA further
provides you with the right to not be discriminated against (as provided for in
applicable law) for exercising your rights. Please note that certain
information may be exempt from such requests under California law. For example,
we need certain information in order to provide the Services to you. We also
will take reasonable steps to verify your identity before responding to a
request. In doing so, we may use one or more of the following methods: (<span
                  className="SpellE">i</span>) using your login credentials to verify you (it being
understood that we may also ask you to reauthenticate yourself), or (ii)
matching two or more data points provided by you with data points maintained by
us. If we are unable to verify you through the foregoing methods, we shall have
the right, but not the obligation, to request additional information from you.
If you would like further information regarding your legal rights under
California law or would like to exercise any of them, or if you are an
authorized agent making a request on a user's behalf, please contact us
at&nbsp;<span ><a
                  href="mailto:admin@preschoolpatch.com?subject=CCPA%20Privacy%20Request"><span>privacy-ccpa@PreschoolPatch.com</span></a></span><span
                >&nbsp;.</span></p>

                <p className="MsoNormal">Shine the Light Disclosure.</p>

                <p className="MsoNormal"><span>&nbsp;The
California &quot;Shine the Light&quot; law gives residents of California the
right under certain circumstances to request information from us regarding the
manner in which we share certain categories of personal information (as defined
in the Shine the Light law) with third parties for their direct marketing
purposes. We do not share your personal information with third parties for
their own direct marketing purposes.</span></p>

                <p className="MsoNormal"><a name="nevadaRights" href="/#"><b><span><span>XII.<span
                >
                </span></span></span></b><b><span>Privacy
Information for Nevada Residents</span></b></a></p>

                <p className="MsoNormal">Under Nevada law,
certain Nevada consumers may opt out of the sale of &quot;personally
identifiable information&quot; for monetary consideration (as such terms are
defined under Nevada law) to a person for that person to license or sell such
information to additional persons. If you are a Nevada resident and you have
purchased services or products from us, you may submit a request to opt out of
any potential future sales under Nevada law by contacting us via e-mail
at&nbsp;<span ><a
                  href="mailto:admin@preschoolpatch.com?subject=Nevada%20OptOut"><span>Admin@PreschoolPatch.com</span></a></span><span
                >. Please note we may take reasonable steps to verify your identity and the authenticity of the request.</span></p>

                <p className="MsoNormal"><a name="contactUs" href="/#"><b><span><span>XIII.<span
                >
                </span></span></span></b><b><span>Contact Us</span></b></a></p>

                <p className="MsoNormal">If you have any questions on our Privacy Policy, you can contact us via email at&nbsp;<span
                ><a
                    href="mailto:admin@preschoolpatch.com?subject=Nevada%20OptOut"><span>Admin@PreschoolPatch.com</span></a></span><u><span> </span></u><span>or at:</span></p>

                <p className="MsoNormal">Legal Department<br/>
PreschoolPatch.com, Inc.<br/>
77 Fourth Avenue, 5<sup><span>th</span></sup><span
                  >&nbsp;Floor<br/>
Waltham, MA 02451 USA</span></p>


              </div>

              <a href="#TopPrivacy" >Return to Top</a>

            </div>


          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>

      <Footer />
    </div>
  );
};
export default PrivacyPolicy;
