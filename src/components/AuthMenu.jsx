import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, db, updateDoc, doc } from '../firebase/init';
import {
  DataGrid,
  GridToolbar,
  esES,
} from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthMenuChart from './AuthMenuChart';
import '../../src/App.css';

const AuthMenu = () => {
  const [data, setData] = useState([]);

  const dummy = [
    {
      amount: 'CLP 23.000.000',
      company: 'Inversiones Latinoamericanas',
      date: '02-01-2022 09:00 Hrs',
      docId: 'Vo812X6EJTkmaSVcQQDh',
      id: '4f3c79526c34',
      isAuthorized: false,
      isRejected: false,
      origen: '229435678',
      solution: 'Pago de Tesoreria Gral. Republica',
      status: 'pendiente',
    },
    {
      amount: 'CLP 450.000',
      company: 'Inversiones Latinoamericanas',
      date: '03-01-2022 15:56 Hrs',
      docId: 'bPwlEp0Sf34WybbQ4ihX',
      id: '27574c139db3b',
      isAuthorized: false,
      isRejected: false,
      origen: '229435678',
      solution: 'Transferencias entre Cuentas',
      status: 'pendiente',
    },
    {
      amount: 'CLP 6.000.000',
      company: 'MegaHold Prime',
      date: '02-01-2022 09:00 Hrs',
      docId: 'cvCvIaztpJYzOS6OGDlF',
      id: 'dde458581a341',
      isAuthorized: false,
      isRejected: false,
      origen: '210456783',
      solution: 'Boleta de Garantia',
      status: 'pendiente',
    },
    {
      amount: 'USD 10,000,000',
      company: 'MegaHold Prime',
      date: '03-01-2022 11:11 Hrs',
      docId: 'eKWOh6yP4SIc6Xe7qDDa',
      id: '30bf5ef80813b',
      isAuthorized: false,
      isRejected: false,
      origen: '210456783',
      solution: 'Pago de Impuestos Dolares',
      status: 'pendiente',
    },
  ];

  const columns = [
    {
      field: 'date',
      headerName: 'Fecha y Hora',
      width: 150,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'justify',
    },
    {
      field: 'company',
      headerName: 'Empresa',
      width: 200,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'justify',
    },
    {
      field: 'origen',
      headerName: 'Cuenta Origen',
      width: 130,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'center',
    },
    {
      field: 'solution',
      headerName: 'Solución',
      width: 130,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'justify',
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 170,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'center',
    },
    {
      field: 'details',
      headerName: 'Detalles',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'center',
      renderCell: params => {
        return (
          <div>
            {data ? (
              <div>
                <Checkbox
                  size="small"
                  icon={<ExpandMoreIcon />}
                  checkedIcon={<ExpandMoreIcon />}
                  sx={{
                    '&.Mui-checked': {
                      color: '#F1AE2F',
                    },
                  }}
                />
              </div>
            ) : (
              <p>Data is loading...</p>
            )}
          </div>
        );
      },
    },
    {
      field: 'autorize',
      headerName: 'Autorizar',
      width: 190,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'center',
      renderCell: (params) => {
        return (
          <div>
            {data ? (
              <div>
                <Checkbox
                  onChange={e => handleChangeAuthorized(e, params.row.docId)}
                  checked={params.row.isAuthorized}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: '#5db761',
                    },
                  }}
                />
              </div>
            ) : (
              <p>Data is loading...</p>
            )}
          </div>
        );
      },
    },
    {
      field: 'reject',
      headerName: 'Rechazar',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'itau-app',
      align: 'center',
      renderCell: params => {
        return (
          <div>
            {data ? (
              <div>
                <Checkbox
                  onChange={e => handleChangeRejected(e, params.row.docId)}
                  checked={params.row.isRejected}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: '#f44336',
                    },
                  }}
                />
              </div>
            ) : (
              <p>Data is loading...</p>
            )}
          </div>
        );
      },
    },
  ];

  //GETTING DATA FROM FIREBASE
  useEffect(() => {
    onSnapshot(collection(db, 'transaction'), snapshot => {
      const dataFromFirestore = snapshot.docs.map(doc => {
        return {
          docId: doc.id,
          isAuthorized: false,
          isRejected: false,
          ...doc.data(),
        };
      });
      setData(dataFromFirestore);
    });
  }, []);

  //HANDLECHANGE AUTHORIZE
  const handleChangeAuthorized = (e, docId) => {
    setData(prevState => [
      ...prevState.map(element => {
        return element.docId === docId
          ? {
              ...element,
              isAuthorized: !element.isAuthorized,
            }
          : element;
      }),
    ]);
  };

  //HANDLECHANGE REJECT
  const handleChangeRejected = (e, docId) => {
    setData(prevState => [
      ...prevState.map(element => {
        return element.docId === docId
          ? {
              ...element,
              isRejected: !element.isRejected,
            }
          : element;
      }),
    ]);
  };

  //FILTERING PENDING
  const pendingTransactions = data.filter(item => {
    return item.status === 'pendiente';
  });

  //EXECUTE TRANSACTION
  const sendTransaction = () => {
    const authorizeTransactions = data.filter(
      item => item.isAuthorized === true
    );
    const rejectedTransactions = data.filter(item => item.isRejected === true);

    if (authorizeTransactions) {
      const authorizeArr = authorizeTransactions.map(item => {
        const sendTransaction = doc(db, 'transaction', item.docId);

        updateDoc(sendTransaction, {
          status: 'aprobada',
        });
      });
    }

    if (rejectedTransactions) {
      const rejectedArr = rejectedTransactions.map(item => {
        const sendTransaction = doc(db, 'transaction', item.docId);
        updateDoc(sendTransaction, {
          status: 'rechazada',
        });
      });
    }
  };

  return (
    <div>
      <h2>Autorizar Transacciones Multiempresa: </h2>
      <div className="flex flex-row justify-evenly">
        <button>Aceptar Todo</button>
        <button>Rechazar Todo</button>
      </div>
      <div style={{ height: 450, width: '72%' }}>
        <DataGrid
          rowHeight={25}
          columns={columns}
          rows={pendingTransactions}
          pageSize={12}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            boxShadow: 2,
            fontSize: 12,
            border: 2,
            m: 2,
            textAlign: 'center',
            borderColor: '#ffb64c',
            '& .MuiDataGrid-cell:hover': {
              color: '#ffb64c',
            },
            '& .itau-app-USD': {
              bgcolor: '#B4B4B4',
            },
          }}
          getRowClassName={params => `itau-app-${params.row.amount}`}
        />
      </div>
      <button onClick={() => sendTransaction()}>Ejecutar</button>
      <div>
        <AuthMenuChart data={data} />
      </div>
    </div>
  );
};

export default AuthMenu;
