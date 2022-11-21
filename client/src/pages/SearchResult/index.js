import styles from './style.module.css'
import FavouriteItem from '../../components/FavouriteItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CircularProgress, Divider } from '@mui/material'
import { useSnackbar } from 'notistack';
import { UserState } from '../../Context/UserProvider'
import { useEffect, useState } from 'react';
import axios from 'axios';
function SearchResult({}) {
    return (    
        <p> Search Result</p>
    );
}

export default SearchResult;