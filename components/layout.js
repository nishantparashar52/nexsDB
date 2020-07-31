// components/layout.js

import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna CRUD</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;