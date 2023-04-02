// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = ({ theInvoice }) => {

  const handleSaveInvoice = async () => {
    const response = await fetch('http://localhost:4003/api/invoices', {
      method: 'POST',
      body: JSON.stringify(theInvoice),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      console.log(json.error)
    }
    if(response.ok) {
      console.log('New house invoice added : ', json);
    }

    console.log(theInvoice)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Send Invoice
            </Button>
            <Button
              fullWidth
              sx={{ mb: 2 }}
              component={Link}
              color='secondary'
              variant='outlined'
              href='/apps/invoice/preview/4987'
            >
              Preview
            </Button>
            <Button onClick={handleSaveInvoice} fullWidth variant='outlined' color='secondary'>
              Save
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id='payment-select'>Accept payments via</InputLabel>
          <Select fullWidth labelId='payment-select' label='Accept payments via' defaultValue='Internet Banking'>
            <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
            <MenuItem value='Debit Card'>Debit Card</MenuItem>
            <MenuItem value='Credit Card'>Credit Card</MenuItem>
            <MenuItem value='Paypal'>Paypal</MenuItem>
            <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
          </Select>
        </FormControl>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer' }} htmlFor='invoice-add-payment-terms'>
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-add-payment-terms' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer' }} htmlFor='invoice-add-client-notes'>
            Client Notes
          </InputLabel>
          <Switch id='invoice-add-client-notes' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer' }} htmlFor='invoice-add-payment-stub'>
            Payment Stub
          </InputLabel>
          <Switch id='invoice-add-payment-stub' />
        </OptionsWrapper>
      </Grid>
    </Grid>
  )
}

export default AddActions
