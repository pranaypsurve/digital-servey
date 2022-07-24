import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { Container , Grid , Typography , Box ,  TextField , FormLabel , RadioGroup , FormControlLabel , Radio , Checkbox , FormControl , Select , MenuItem , InputLabel , Button , Snackbar , Alert , CircularProgress} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import moment from "moment";

export default function Home() {
  const inputFields = {
    name:'',
    email:'',
    mobile:'',
    dob:null,
    gender:'',
    social:{
      whatsaap:true,
      telegram:false,
      facebook:false,
      instagram:false
    },
    shoping:{
      amazon:true,
      flipkart:false,
      myntra:false,
      shopClues:false
    },
    country:'',
    state:'',
    city:'',
    food:'',
    profession:'',
    colour:'',
    income_source:'',
    ip:'',
  }
  const [formValues, setFormValue] = useState(inputFields);
  const [countryList, setcountryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [nameSpace, setNameSpace] = useState(false);
 
  const handleInput = (e)=>{
    setFormValue({...formValues,[e.target.name]:e.target.value});
  };
  const dateHandle = (date)=>{
    setFormValue({...formValues,['dob']:date});
  }
  const handleInputCheckbox = (e)=>{
    setFormValue({...formValues,social:{...formValues.social,[e.target.value]:e.target.checked}})
  }
  const handlePreferedShopingInputCheckbox = (e)=>{
    setFormValue({...formValues,shoping:{...formValues.shoping,[e.target.value]:e.target.checked}})
  }
  const handleCountryChange = (e)=>{
    setFormValue({...formValues,[e.target.name]:e.target.value});
  }
  
  async function fetchCountry() {
    axios.get("https://countriesnow.space/api/v0.1/countries/states")
    .then(function (response) {
      console.log(response.data);
      setcountryList(response.data.data);
    })
    .catch(function (error) {
      console.log('error',error);
    })
  }
  async function getUserCountryAndIP() {
    axios.get("https://api.country.is")
    .then(function (response) {
      setFormValue({...formValues,ip:response.data});
    })
    .catch(function (error) {
      console.log('error',error);
    })
  }
  const handleSubmit = (e)=>{
    setLoader(true)
    e.preventDefault();
    axios.post("/api/post/servey",formValues)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log('error',error);
    })
    setTimeout(()=>{
      setLoader(false)
    },600);
    setTimeout(()=>{
      e.target.reset();
      setSnackbarOpen(true)
    },1000);
    // setTimeout(()=>{
    //   setSnackbarOpen(false)
    // },3000);
    
    // e.target.reset();
  }
  useEffect(()=>{
    fetchCountry();
    getUserCountryAndIP();
    // 
  },[]);
  return (
    <Container maxWidth='flase'>
      <Grid container pb={6}>
        <Grid item={true} xs={12} sm={12} md={12} >
          <Typography variant='h2' p={2} textAlign='center'>
              Digital Servey
          </Typography>
        </Grid>
        <Grid container item={true}>
          <Grid item={true} xs={12} sm={12} md={12} >
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container item={true}>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField variant='outlined' margin='normal' required fullWidth id='fullname' label='Full Name' name='name' onChange={handleInput} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField variant='outlined' margin='normal' type="email" required fullWidth id='email' label='Email' name='email' onChange={handleInput} autoComplete='email' />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField  inputProps={{ inputMode: 'numeric' }} 
                  // error={formValues.mobile === ""}
                  helperText={formValues.mobile === "" ? '10 Digits Mobile Number' : ' '}
                  variant='outlined' margin='normal' required fullWidth id='mobilenumber' label='Mobile Number' name='mobile' onChange={handleInput} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <Stack py={2} >
                      <DatePicker value={formValues.dob} disableFuture label="Date Of Birth"  openTo="year" views={['year', 'month', 'day']} onChange={(newValue) => { dateHandle(moment(newValue).format('MM/DD/YYYY')) }} renderInput={(params) => <TextField {...params} />} />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item={true} xs={6} sm={4} md={4} px={1}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="gender" onChange={handleInput}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={6} sm={4} md={4} px={1}>
                  <FormControl fullWidth>
                    <FormLabel id="demo-row-radio-buttons-group-label">Selecy social platform</FormLabel>
                    <RadioGroup  aria-labelledby="demo-row-radio-buttons-group-label" name="social" >
                      <FormControlLabel name="whatsaap" value="whatsaap" control={<Checkbox onChange={handleInputCheckbox} defaultChecked />} label="What's App" />
                      <FormControlLabel name="telegram" value="telegram" control={<Checkbox onChange={handleInputCheckbox} />} label="Telegram" />
                      <FormControlLabel name="facebook" value="facebook" control={<Checkbox onChange={handleInputCheckbox} />} label="Facebook" />
                      <FormControlLabel name="instagram" value="instagram" control={<Checkbox onChange={handleInputCheckbox} />} label="Instagram" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={6} sm={4} md={4} px={1}>
                  <FormControl fullWidth>
                    <FormLabel id="demo-row-radio-buttons-group-label">Prefered Shoping Website</FormLabel>
                    <RadioGroup  aria-labelledby="demo-row-radio-buttons-group-label" name="social" >
                      <FormControlLabel name="amazon" value="amazon" control={<Checkbox onChange={handlePreferedShopingInputCheckbox} defaultChecked />} label="Amazon" />
                      <FormControlLabel name="flipkart" value="flipkart" control={<Checkbox onChange={handlePreferedShopingInputCheckbox} />} label="Flipkart" />
                      <FormControlLabel name="myntra" value="myntra" control={<Checkbox onChange={handlePreferedShopingInputCheckbox} />} label="Myntra" />
                      <FormControlLabel name="shopClues" value="shopClues" control={<Checkbox onChange={handlePreferedShopingInputCheckbox} />} label="ShopClues" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-helper-label">Source Of Income</InputLabel>
                    <Select required labelId="demo-simple-select-helper-label" name="income_source" id="demo-simple-select-helper" label="Source Of Income" onChange={handleInput}>
                      <MenuItem value='null'>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='student'>Student/Part Time Job</MenuItem>
                      <MenuItem value='salaried'>Salaried</MenuItem>
                      <MenuItem value='government'>Government Employee</MenuItem>
                      <MenuItem value='bussiness'>Bussiness</MenuItem>
                      <MenuItem value='other'>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-helper-label">Profession</InputLabel>
                    <Select required labelId="demo-simple-select-helper-label" name="profession" id="demo-simple-select-helper" label="profession" onChange={handleInput}>
                      <MenuItem value='null'>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='accountant'>Accountant</MenuItem>
                      <MenuItem value='consultant'>Consultant</MenuItem>
                      <MenuItem value='electrician'>Electrician</MenuItem>
                      <MenuItem value='dentist'>Dentist</MenuItem>
                      <MenuItem value='mechanic'>Mechanic</MenuItem>
                      <MenuItem value='lawyer'>Lawyer</MenuItem>
                      <MenuItem value='engineer'>Engineer</MenuItem>
                      <MenuItem value='programmer'>Programmer</MenuItem>
                      <MenuItem value='photographer'>Photographer</MenuItem>
                      <MenuItem value='freelancer'>Freelancer</MenuItem>
                      <MenuItem value='other'>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField variant='outlined' margin='normal' required fullWidth id='city' label='Favourite   Food (comma seprated , )' name='food' onChange={handleInput} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField variant='outlined' margin='normal' required fullWidth id='city' label='Favourite Colour' name='colour' onChange={handleInput} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                    <Select required labelId="demo-simple-select-helper-label" name="country" id="demo-simple-select-helper" label="Country" onChange={handleCountryChange}>
                      <MenuItem value='null'>
                        <em>None</em>
                      </MenuItem>
                      {
                        countryList.map((index,item)=>{
                          return <MenuItem value={index.name} key={item.toString()}>{index.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField sx={{ mt: 3 }} variant='outlined' margin='normal' required fullWidth id='state' label='State' name='state' onChange={handleInput} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} px={1}>
                  <TextField variant='outlined' margin='normal' required fullWidth id='city' label='City' name='city' onChange={handleInput} />
                </Grid>
                
              </Grid>
              {
                loader ? <> <Button sx={{mt:3,mb:3}} type='submit' fullWidth variant='contained' disabled >Submiting &nbsp;&nbsp;&nbsp;&nbsp; <CircularProgress size={20}
                thickness={4} /></Button>  </> : <><Button sx={{mt:3,mb:3}} type='submit' fullWidth variant='contained' >Submit</Button></>
              }
              {
                snackbarOpen ? <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={(e)=>setSnackbarOpen(false)} >
                <Alert onClose={(e)=>setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                  Thanks For Your Valuable Time
                </Alert>
              </Snackbar> : ''
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
