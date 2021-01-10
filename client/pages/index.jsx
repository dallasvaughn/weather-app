import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const LandingPage = ({ currentUser, locations }) => {
  if (!currentUser) {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>First time here? Begin by signing up!</p>
          <Link href="/auth/signup">
            <Button
              className="signup-button"
              variant="primary"
              href="/auth/signup"
            >
              Sign Up!
            </Button>
          </Link>
          <p>
            Already a user? Sign in{' '}
            <Link href="/auth/signin">
              <a>here</a>
            </Link>
            !
          </p>
        </Jumbotron>
      </div>
    );
  }

  return (
    <div>
      <Jumbotron className="jumbotron">
        <h1>Ready to check the weather?</h1>
        <p>
          Begin searching weather results or view the weather for your saved
          locations.
        </p>
        <p>
          <Link href="/weather/search">
            <Button
              className="home-button"
              variant="primary"
              href="/weather/search"
            >
              Search
            </Button>
          </Link>
          <Link href="/weather/saved">
            <Button
              className="home-button"
              variant="primary"
              href="/weather/saved"
            >
              My Weather
            </Button>
          </Link>
        </p>
      </Jumbotron>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/locations/saved');

  return { locations: data };
};

export default LandingPage;
