import React from 'react';
import logo from './logo.svg';
import './App.css';

import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  NetworkStatus
} from "@apollo/client";

import Paper from '@material-ui/core/Paper';
import MaterialTable from './MaterialTable'; // компонент для главной таблицы с аккордионами
import EnhancedTableToolbar from './EnchancedTableToolbar'; // тулбар для главной таблицы 

import { unixToNormal, setTimestamp } from './timeConvert'; // функции для конвертации unix-формата времени в нормальный и 
import noDup from './Utils'; // функция для формирования объекта данных из данных, полученных при graphQL запросе
import useStyles from './styles'; // стили

// запрос к GraphQL для получения событий пополнения ликвидности
const Mint = gql`
  query GetMint($timestamp: Int!, $amount: String!) {
    mints(first:1000, where: {amountUSD_gt: $amount, timestamp_gt: $timestamp}, orderBy: to, orderDirection: desc) {
      timestamp
      to
      amountUSD
      pair {
        id
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      transaction {
        burns {
          amountUSD
          pair {
            token0 {
              symbol
            }
            token1 {
              symbol
            }
          }
        }
      }
    }
  }
`;


function App() {
  
  const classes = useStyles();
  const [timeStamp, setTimeStamp] = React.useState(setTimestamp(0));  // переменная времени (для периода с которого мы смотрим ликвидность) в unix-формате 
  const [amount, setAmount] = React.useState("1000000"); // минимальаня сумма в долларах 

  const { loading, error, data, refetch, networkStatus } = useQuery(Mint, {
    variables: { timestamp: timeStamp , amount: amount},
    notifyOnNetworkStatusChange: true,
    fetchPolicy:"cache-and-network"
  });

  const [tableData, setTableData] = React.useState([]);  // данные для вывода

  React.useEffect(() => {  // хук для обновления данны

    if (error) console.log(error);
    if (!loading) {
      console.log(noDup(data));
      setTableData(noDup(data));
    }
  
  },[data]);

  const handleToolbarChanged = (type, value) => {  //функция обратной связи для обновления периода и суммы (usd) по которым мы ищем

    if (type == "period") {
      setTimeStamp(parseInt(setTimestamp(value)));
    }

    if (type == "amount") {

      if (!value) setAmount("1000000");
      else if (value == 1) setAmount("500000");
      else if (value == 2) setAmount("100000");

    }

  };


  //выводит тулбар и таблицу
  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar onChange={handleToolbarChanged} />
          {!loading && (
            <MaterialTable rows = {tableData} classes={classes}>
            </MaterialTable>
            )
          }
        </Paper>
      </div>
    </div>
  );
}

export default App;
