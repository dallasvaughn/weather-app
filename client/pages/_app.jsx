import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import Footer from '../components/footer';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  // pass currentUser to all child components
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>

      <Footer />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
    // build client and call child component's getInitialProps function
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
