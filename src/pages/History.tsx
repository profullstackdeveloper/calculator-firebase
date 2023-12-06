import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#e0e0e0',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));

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
    'From',
    'To',
    'Result',
    'Rate'
]

const tableRows = [
    {
        date: '2023-01-02',
        equation: '100 + 200 = 300',
        from: 'usd',
        to: 'eur',
        result: 330,
        rate: 1.1
    },
    {
        date: '2023-01-02',
        equation: '100 + 200 = 300',
        from: 'usd',
        to: 'eur',
        result: 330,
        rate: 1.1
    },
    {
        date: '2023-01-02',
        equation: '100 + 200 = 300',
        from: 'usd',
        to: 'eur',
        result: 330,
        rate: 1.1
    }
]

export default function History () {
    return (
        <div className='w-full h-full box-border p-3 font-extrabold text-[40px]'>
            Calculation History
            <TableContainer component={Paper} sx={{marginTop: '20px'}}>
                <Table sx={{minWidth: 700}}>
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
                            tableRows.map((row, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        {
                                            Object.keys(row).map((key, idx) => {
                                                return (
                                                    <StyledTableCell key={idx}>
                                                        {
                                                            row[key as keyof typeof row]
                                                        }
                                                    </StyledTableCell>
                                                )
                                            })
                                        }
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}