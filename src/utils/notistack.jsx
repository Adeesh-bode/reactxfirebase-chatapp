import { useSnackbar } from 'notistack';

export default function useCustomSnackbar( text , duration=3000, Variant) {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (text, duration=3000, Variant ='Default') => {
        enqueueSnackbar(text,{
            variant: Variant,
            autoHideDuration: duration,
            anchorOrigin:{ horizontal:'center', vertical:'top'},
            dense:true,
        })
    }

    return showSnackbar;
}


