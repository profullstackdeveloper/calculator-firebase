import { ReactNode, useEffect } from "react";
import { Divider, Paper, SpeedDial, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface Props {}

type OperatorComp = {
  symbol: string;
  comp: ReactNode
}

const Operators: OperatorComp[] = [
  {
    symbol: "+",
    comp: AddIcon
  }
]

export default function  Home ({}: Props) {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <Paper elevation={3} className="flex flex-row items-center w-3/4 p-4">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-between">
            <TextField
              label={"First"}
            />
            <TextField
              label={"Second"}
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem/>
        <div className="w-1/2 ">
          part2
        </div>
      </Paper>
    </div>
  );
};
