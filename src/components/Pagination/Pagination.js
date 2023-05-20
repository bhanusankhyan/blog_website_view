import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PageCount = ( {page, setPage, pageCount} ) => {

  const handleChange = (event, pageNumber) => {
    // console.log(pageNumber)
    setPage(pageNumber)
  }

  return(
    <Stack spacing={2} alignItems="center">
      <Pagination count={pageCount} page={page} variant="outlined" shape="rounded" onChange={(event, pageNumber) => handleChange(event, pageNumber)}/>
    </Stack>
  )
}

export default PageCount;
