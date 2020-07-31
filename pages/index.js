import useSWR from 'swr';
import Layout from '../components/layout';
import DataRow from '../components/data-row';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error } = useSWR('/api/customers', fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Next Fauna CRUD</h1>

      <div className="table">
        <h2>Customer Data</h2>
        <Link href="/customers/create">
          <a className="createNew">Create New Customer</a>
        </Link>
        <div className="headerRow">
          <h4>name</h4>
          <h4>telephone</h4>
          <h4 className="creditCard">credit card</h4>
        </div>
        {data ? (
          data.map((d) => (
            <DataRow
              key={d.ref['@ref'].id}
              id={d.ref['@ref'].id}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
              creditCard={d.data.creditCard.number}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;