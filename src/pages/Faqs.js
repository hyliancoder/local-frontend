import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
const Faqs = () => (
  <>
    <div className='stunning-header bg-primary-opacity'>
      {/* <div className='header-spacer--standard'></div> */}

      <div className='stunning-header-content'>
        <h1 className='stunning-header-title'>Frequently Asked Questions</h1>
      </div>

      <div className='content-bg-wrap stunning-header-bg1'></div>
    </div>

    <section className='mb60'>
      <div className='container'>
        <div className='row'>
          <div className='col col-xl-8 m-auto col-lg-10 col-md-12 col-sm-12 col-12'>
            <div
              id='accordion'
              role='tablist'
              aria-multiselectable='true'
              className='accordion-faqs'
            >
              <Accordion defaultActiveKey='0'>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      What is Local Social?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <p>
                        Local Social is THE online community for local lovers
                        just like yourself! Here, sharing your local-love is
                        rewarded! The more you discover, explore, share, and
                        interact with content on the site, the more points and
                        badges you get. When you hit 1,000 points, you can
                        exchange those points for prizes!
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                      Where do I find my points?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>
                      <p>
                        You can find your points status{' '}
                        <a href='/rewards'>Link</a> here. You can get to this
                        page by going to the dropdown menu in the top right
                        corner.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                      What are badges and how do you get them?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='2'>
                    <Card.Body>
                      <p>
                        Badges are the Local Social way of saying thank you and
                        congrats for certain accomplishments as a member. The
                        more you participate the more you’ll earn. You can see
                        the full list <a href='/badges'>here</a>.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='3'>
                      How do I unfollow someone?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='3'>
                    <Card.Body>
                      <p>
                        To unfollow someone, just click the FOLLOWING button on
                        their profile. When you click it, it turns gray and says
                        FOLLOW.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='4'>
                      How can I update my profile?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='4'>
                    <Card.Body>
                      <p>
                        Easy! Just go to the “Account Settings” section in the
                        dropdown menu in the top right corner. There, you can
                        upload your profile picture, header image, personal
                        blurb, etc.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='5'>
                      Who is Admin Local?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='5'>
                    <Card.Body>
                      <p>
                        Admin Local is an animated expert and super fan of
                        locals and she helps run the Local Social. She’ll
                        deliver some key tips and content to the site to enhance
                        your experience.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='5'>
                      Someone posted something that doesn’t fall in line with
                      the Community Guidelines. How can I report that?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='6'>
                    <Card.Body>
                      <p>
                        Oh no! We want to build a community helps share the
                        local love. To let me know about something, click on the
                        SUBMIT button in the dropdown menu in the top right
                        corner and tell me about it. I’ll take care of it within
                        48 hours.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='6'>
                      How do I tell my friends about Local Social and get points
                      for it?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='7'>
                    <Card.Body>
                      <p>
                        Click on the REFER A FRIEND box on the right column of
                        your newsfeed, or on the right column of your profile.
                        You will get a unique link that you can share with them.
                        When they join from that link, you’ll get your points
                        after they have verified their profile through their
                        email.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='7'>
                      ~ DOES THIS STAY WITH IDEAS OUT? ~ I have a great idea!
                      How can I tell you about it?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='8'>
                    <Card.Body>
                      <p>
                        I would love to hear your ideas! Go to the dropdown menu
                        in the top right corner and click on SUBMIT. Tell me all
                        about it.
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default Faqs;
