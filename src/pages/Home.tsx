import { ReactNode, useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { Button, Divider, Fab, ListItemIcon, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import axios from "axios";
import { Firebase, auth } from "../config/firebase";
import { addAPI, deductionAPI, divideAPI, multiplyAPI } from "../api";

interface Props { }

type OperatorComp = {
  symbol: string;
  comp: ReactNode
}

const Operators: OperatorComp[] = [
  {
    symbol: "+",
    comp: <AddIcon />
  },
  {
    symbol: "-",
    comp: <RemoveIcon />
  },
  {
    symbol: "*",
    comp: <CloseIcon />
  },
  {
    symbol: "/",
    comp: <div>&nbsp;/&nbsp;</div>
  }
]

const currencies = [
  {
    value: 'USD',
    label: '$    USD',
  },
  {
    value: "EUR",
    label: '€   EUR',
  }
]

const currencyMap = {
  USD: '$',
  EUR: '€'
}

export default function Home({ }: Props) {
  const [exchangeResult, setExchangeResult] = useState(0);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [calcResult, setCalcResult] = useState(0);
  const [op, setOp] = useState('+');
  const [selectedOpEle, setSelectedOpEle] = useState<ReactNode>(<AddIcon />)
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rate, setRate] = useState(1);
  const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorE1);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorE1(event.currentTarget);
  }

  const handleClose = async () => {
    setAnchorE1(null);
  }

  const getCurrencyRate = async () => {
    if (from === to) {
      setRate(1);
    } else {
      try {
        const result = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLocaleLowerCase()}.json`);
        setRate(result.data[from.toLocaleLowerCase()][to.toLocaleLowerCase()]);
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getCurrencyRate();
  }, [])

  useEffect(() => {
    getCurrencyRate();
    const id = setInterval(() => {
      getCurrencyRate()
    }, 10000);

    return () => {
      clearInterval(id);
    }
  }, [from, to])

  const handleConvert = () => {
    setExchangeResult(rate * calcResult);
  }

  const handleCurrency = (currency: string, isFrom: boolean) => {
    if (isFrom) {
      setFrom(currency)
    } else {
      setTo(currency)
    }
  }

  const handleSwitch = () => {
    const fromCurrency = from;
    const toCurrency = to;
    setFrom(to);
    setTo(from);
  }

  const handleNumber = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, isFirst: boolean) => {
    if (isFirst) {
      setFirst(Number(e.target.value));
    } else {
      setSecond(Number(e.target.value))
    }
  }

  const handleCalc = async () => {
    let result;
    const idToken = await auth.currentUser?.getIdToken();
    console.log(auth.currentUser?.providerData)
    switch (op) {
      case "+":
        result = await addAPI(first, second, idToken ?? "");
        setCalcResult(result.data.result);
        break;
      case "-":
        result = await deductionAPI(first, second, idToken ?? "");
        setCalcResult(result.data.result);
        break;
      case "*":
        result = await multiplyAPI(first, second, idToken ?? "");
        setCalcResult(result.data.result);
        break;
      case "/":
        result = await divideAPI(first, second, idToken ?? "");
        setCalcResult(result.data.result);
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Typography fontWeight={700} fontSize={40}>Calculation</Typography>
      <Paper elevation={3} className="flex lg:flex-row flex-col items-center w-3/4 p-4" variant="elevation">
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-center lg:pr-3 pr-0">
          <div className="w-full flex items-center justify-between">
            <TextField
              label={"First"}
              value={first}
              onChange={(e) => handleNumber(e, true)}
            />
            <div className="mx-4">
              <Fab onClick={handleClick} className="!w-[40px] !h-[40px]">
                {
                  selectedOpEle
                }
              </Fab>
            </div>
            <Menu
              anchorEl={anchorE1}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {
                Operators.map((operator, index) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        setOp(operator.symbol);
                        setSelectedOpEle(operator.comp);
                        handleClose();
                      }}
                      key={index}
                    >
                      <ListItemIcon>
                        {
                          operator.comp
                        }
                      </ListItemIcon>
                    </MenuItem>
                  )
                })
              }
            </Menu>
            <TextField
              label={"Second"}
              value={second}
              onChange={(e) => handleNumber(e, false)}
            />
          </div>
          <div className="mt-4">
            <TextField value={calcResult.toFixed(2)} disabled></TextField>
          </div>
          <Button variant="contained" className="!mt-3" onClick={handleCalc}>
            Calculate
          </Button>
        </div>
        <div className="lg:block hidden h-full">
          <Divider orientation="vertical">
            <CurrencyExchangeIcon />
          </Divider>
        </div>
        <div className="lg:hidden block w-full my-3">
          <Divider orientation="horizontal">
            <CurrencyExchangeIcon />
          </Divider>
        </div>
        <div className="lg:w-1/2 w-full lg:pl-3 pl-0">
          <div className="flex flex-row items-center justify-between">
            <TextField
              id="outlined-select-currency"
              select
              label="From"
              defaultValue="EUR"
              value={from}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleCurrency(option.value, true)}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Fab size="medium" color="secondary" onClick={handleSwitch}>
              <SwapHorizIcon />
            </Fab>
            <TextField
              id="outlined-select-currency"
              select
              label="To"
              defaultValue="EUR"
              value={to}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleCurrency(option.value, false)}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="w-full rounded-lg border-collapse border-2 border-black flex flex-col items-center justify-between mt-6">
            <Typography className="absolute -translate-y-3 bg-white">&nbsp;Result&nbsp;</Typography>
            <div className="h-16 mt-3">
              <Typography fontSize={40}>
                {
                  exchangeResult.toFixed(2) + ' ' + currencyMap[to as keyof typeof currencyMap]
                }
              </Typography>
            </div>
            <div className="flex flex-row mt-3">
              <Typography>Exchange Rate:&nbsp;&nbsp;</Typography>
              <Typography>{rate.toFixed(2)}</Typography>
            </div>
          </div>
          <div className="flex flex-row mt-3 justify-center items-center">
            <Button variant="outlined" onClick={handleConvert}>Convert</Button>
          </div>
        </div>
      </Paper>
      <Button variant="outlined" sx={{ marginTop: '16px' }}>Save</Button>
    </div>
  );
};
