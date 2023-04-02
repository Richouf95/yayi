// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  company: yup.string(),
  contact: yup.string().min(8).max(8),
  address: yup.string().max(120),

  bankname: yup.string().max(120),
  bankcountry: yup.string().max(120),
  bankcoordonnee: yup.string().max(120)
})

const AddNewCustomer = ({ open, toggle, setSelectedClient, clients, setClients }) => {

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [tel, setTel] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankCountry, setBankCountry] = useState('')
  const [bankCoordonnee, setCankCoordonnee] = useState('')

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', company: '', address: '', country: 'USA', contact: '', bankname: '', bankcountry: '', bankcoordonnee: '' }
  })

  const onSubmit = async (data) => {
    const { address, company, contact, country, email, name, bankname, bankcountry, bankcoordonnee } = data

    const finalData = {
      name: name,
      tel: contact,
      company: company,
      adress: address,
      email: email,
      bank: {
        bankName: bankname,
        bankCountry: bankcountry,
        bankCoordonnee: bankcoordonnee
      }
    }

    const response = await fetch('http://localhost:4003/api/clients', {
      method: 'POST',
      body: JSON.stringify(finalData),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      console.log(json.error)
    }
    if(response.ok) {
      console.log('New house Customer added : ', json);
    }

    if (clients !== undefined) {
      setClients([...clients, finalData])
    }
    setSelectedClient(finalData)
    toggle()
    reset({ name: '', email: '', company: '', address: '', country: 'USA', contact: '', bankname: '', bankcountry: '', bankcoordonnee: '' })
  }

  const handleDrawerClose = () => {
    toggle()
    reset({ name: '', email: '', company: '', address: '', country: 'USA', contact: '', bankname: '', bankcountry: '', bankcoordonnee: '' })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
    >
      <Header>
        <Typography variant='h6'>Add New Customer</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </Header>
      <Box component='form' sx={{ p: theme => theme.spacing(0, 6, 6) }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                label='Name'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.name)}
              />
            )}
          />
          {errors.name && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-name-error'>
              {errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='company'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Company'
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.company)}
              />
            )}
          />
          {errors.company && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-company-error'>
              {errors.company.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type='email'
                label='Email'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.email)}
              />
            )}
          />
          {errors.email && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-email-error'>
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                rows={6}
                multiline
                value={value}
                label='Address'
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.address)}
                placeholder='1037 Lady Bug  Drive New York'
              />
            )}
          />
          {errors.address && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-address-error'>
              {errors.address.message}
            </FormHelperText>
          )}
        </FormControl>
        {/* <FormControl fullWidth sx={{ mb: 5 }}>
          <InputLabel id='invoice-country'>Country</InputLabel>

          <Controller
            name='country'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Country'
                value={value}
                onChange={onChange}
                labelId='invoice-country'
                error={Boolean(errors.country)}
              >
                <MenuItem value='Niger'>Niger</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
              </Select>
            )}
          />
          {errors.country && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
              {errors.country.message}
            </FormHelperText>
          )}
        </FormControl> */}
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='contact'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type='number'
                value={value}
                variant='outlined'
                onChange={onChange}
                label='Contact Number'
                placeholder='763-242-9206'
                error={Boolean(errors.contact)}
              />
            )}
          />
          {errors.contact && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-contact-error'>
              {errors.contact.message}
            </FormHelperText>
          )}

        </FormControl>
        <div style={{paddingTop:'30px', paddingBottom:"20px"}}>
          <Divider />
        </div>
        <Typography style={{padding:"10px"}} variant='h6'>Customer Bank Infos</Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='bankname'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                label='Bank Name'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.name)}
              />
            )}
          />
          {errors.name && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-name-error'>
              {errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='bankcountry'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                label='Bank Country'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.name)}
              />
            )}
          />
          {errors.name && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-name-error'>
              {errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <Controller
            name='bankcoordonnee'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                label='Bank Coordonnee'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.name)}
              />
            )}
          />
          {errors.name && (
            <FormHelperText sx={{ color: 'error.main' }} id='invoice-name-error'>
              {errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <div>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleDrawerClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default AddNewCustomer
