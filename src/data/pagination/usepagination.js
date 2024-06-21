import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (newPage) => {
        setPage(() => newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(() => parseInt(event.target.value, 10));
        setPage(() => 0);
    };

    return [
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage
    ];
};
