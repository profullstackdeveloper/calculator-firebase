import { IconButton, TableCell, TableRow, tableCellClasses } from "@mui/material";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import { HistoryDTO } from "../../utils/types";

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

interface HistoryRowProps {
    historyData: HistoryDTO,
    deleteHandler: (id: string) => void
}

export default function HistoryRow({historyData, deleteHandler}: HistoryRowProps) {

    return (
        <StyledTableRow>

            <StyledTableCell>
                {
                    historyData.createdAt
                }
            </StyledTableCell>
            <StyledTableCell>
                {
                    `${historyData.first} ${historyData.operator} ${historyData.second} = ${historyData.result.toFixed(2)}`
                }
            </StyledTableCell>
            <StyledTableCell>
                <IconButton onClick={() => deleteHandler(historyData.id)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </StyledTableCell>

        </StyledTableRow>
    )
}