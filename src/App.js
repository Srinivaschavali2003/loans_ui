import React, { useState, useEffect } from 'react';
import { fetchData } from './apiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import Loader from './Loader';
import Navbar from './Navbar';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baseDomain, setBaseDomain] = useState('https://demo-apis.json-server.dev/loan-clos');
  const [success, setSuccess] = useState(false);

  const loadData = async () => {
    setData([]);
    setLoading(true);
    try {
      const result = await fetchData(baseDomain);
      const formattedData = Array.isArray(result) ? result : [result];
      setData(formattedData);
      setSuccess(true);
      if (result) {
        toast.success('Information retrieved', {
          autoClose: 3000,
        });
      } else {
        toast.info('No data available', {
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.message === 'Not Found') {
        toast.error('Data not found (404)', {
          autoClose: 3000,
        });
      } else if (error.message === 'Server Error') {
        toast.error('Server Error 500', {
          autoClose: 3000,
        });
      } else {
        toast.error('Network Error', {
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateBaseDomain = (newApi) => {
    setBaseDomain(newApi);
  };

  useEffect(() => {
    loadData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDomain]);

  return (
    <div>
      <Navbar handleUpdateBaseDomain={updateBaseDomain} loadData={loadData} />
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        data && (
          <>
            <Container>
              <br />
              <Table striped bordered hover size='sm' className='table-sm'> 
      <thead>
        <tr>
          <th style={{textAlign:'right'}}>Product</th>
          <th style={{textAlign:'right'}}>Spot Line</th>
          <th style={{textAlign:'right'}}>Loan Amount</th>
          <th style={{textAlign:'right'}}>Unpaid Amount</th>
          <th style={{textAlign:'right'}}>Interest Rate</th>
          <th style={{textAlign:'center'}}></th>
        </tr>
      </thead>
        <tbody>

        {data.map((item, index) => (
              <tr>
                <td style={{textAlign:'center'}}>{item.symbol}</td>
                <td style={{textAlign:'right'}}>Buy: {item.spotBuyLine} Sell: {item.spotSellLine}</td>
                <td style={{textAlign:'right'}}>{item.loanAmount}</td>
                <td style={{textAlign:'right'}}>{item.unpaidAmount}</td>
                <td style={{ textAlign: 'right' }}>{item.interestRate}</td>
                <td style={{textAlign:'center'}}>
                <ButtonGroup>
                <Button variant="info" size='sm'>Buy</Button>
                <Button variant="warning" size='sm'>Sell</Button>
                </ButtonGroup></td>
              </tr>
        ))}
        </tbody>

      </Table>
            </Container>
            <ToastContainer />
          </>
        )
      )}
    </div>
  );
};

export default App;








