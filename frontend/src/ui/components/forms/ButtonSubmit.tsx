import { Button } from '@mui/material'

interface Props {
 isSubmitting?:boolean;
}
export const ButtonSubmit = ({isSubmitting}:Props) => {



        return (
            <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={isSubmitting}
            >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        )
    


}
