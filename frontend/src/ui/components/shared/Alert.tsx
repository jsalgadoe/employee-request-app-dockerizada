import { SxProps, Theme } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';


interface Props {
    message:string,
    severity:AlertColor
    variant?:"standard" | "filled" | "outlined"
    icon?:React.ReactNode,
    styles?:SxProps<Theme>
    setError?:any
}

export const AlertMuiComponent = ({message,icon,styles,severity,variant,setError}:Props) => {

   const close = () => {
     setError('')
   }


  return (
        <Alert 
        onClose={ close }
        icon={icon} 
        severity={severity} 
        sx={styles} 
        variant={variant}>
        {message}
       </Alert>
  )
}
