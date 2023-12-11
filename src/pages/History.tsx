import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../config/firebase';
import { HistoryDTO } from '../utils/types';
import HistoryRow from '../components/history/HIstoryRow.component';


const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'black',
        color: 'white'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

const tableColumns = [
    'Date',
    'Equation',
    'Edit',
]

export default function History() {

    const [calcHistory, setCalcHistory] = useState<HistoryDTO[]>([]);

    const getHistory = async () => {
        const idToken = await auth.currentUser?.getIdToken();
        const result = await axios.get('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/history', {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        });
        setCalcHistory(result.data)
    }

    const deleteHandler = async (historyId: string) => {
        const idToken = await auth.currentUser?.getIdToken();
        const result = await axios.delete(`http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/history/${historyId}`, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        });

        if(result.data.result) {
            getHistory();
        }
    }

    useEffect(() => {
        getHistory();
    }, [])

    return (
        <div className='w-full h-full box-border p-3 font-extrabold text-[40px]'>
            Calculation History
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            {
                                tableColumns.map((column, index) => {
                                    return (
                                        <StyledTableCell key={index}>
                                            {
                                                column
                                            }
                                        </StyledTableCell>
                                    )
                                })
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            calcHistory.map((historyItem, index) => {
                                return (
                                    <HistoryRow historyData={historyItem} deleteHandler={deleteHandler} key={index} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
