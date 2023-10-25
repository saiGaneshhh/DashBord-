import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css'


//This is for tabs
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// here we use useState for storing all the info of the API 
const App = () => {
  const [users, setUsers] = useState([])

  let [userInput, setUserInput] = useState("")
  

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

// Here we used Fetch method to Fetch the Data 
  const fetchUserData = () => {
    fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1458/data.json")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })

  }
  //Used Filter method which is used while searching 
  const filterData = users.filter((val) => {
    return val.name.toUpperCase().includes(userInput.toUpperCase())
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>

      <div class="d-flex" role="search" style={{marginTop:'20px'}}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setUserInput(e.target.value)} style={{ height: 'fit-content',width:'500px', marginLeft:'25px' }} />
      </div>
      {
        filterData.map((user) => {
          return (
            <div>
              <h1 style={{fontFamily:'Georgia, serif',textAlign:'center',}}>{user.name}</h1>
              <img src={user.backgroundUrl} alt="..." style={{textAlign:'center',width:'100%' }} />
              <div>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{backgroundColor:'lightgray', position:'relative'}}>
                      <Tab label="PLACES" {...a11yProps(0)} />
                      <Tab label="RESTAURANTS" {...a11yProps(1)} />
                      <Tab label="HOTELS" {...a11yProps(2)} />
                      <Tab label="OFFICES" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    {user.categories.places.map(data => (
                      <div key={user.id}>
                        {/* //Here we used Bootstrap for Looking Good */}
                        <div class="card mb-3" style={{maxWidth: "900px", backgroundColor:'rgb(235,235,236)'}}>
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img src={data.imageUrl} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <div>
                                <h5 class="card-title"> Place - {data.name}</h5>
                                <p class="card-text"> Rating : {data.rating}</p>
                                <p class="card-text">{data.desc}</p>
                                
                                <div className="item1" style={{ color:'rgb(150,82,170)'}}>
                                <p class="card-text">Opens-{data.openAt}</p>
                                <p class="card-text">Closes-{data.closeAt}</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                                
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {user.categories.restaurants.map(data => (
                      <div key={user.id}>
                       
                          <div class="card mb-3" style={{maxWidth: "900px" ,backgroundColor:'rgb(235,235,236)'}}>
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img src={data.imageUrl} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <div>
                                <h5 class="card-title">{data.name}</h5>
                                <p class="card-text"> Rating : {data.rating}</p>
                                <p class="card-text"> Price : {data.price} /-</p>
                                <p class="card-text">{data.address}</p>
                                
                                <div className="item1"style={{ color:'rgb(150,82,170)'}}>
                                <p class="card-text">Opens-{data.openAt}</p>
                                <p class="card-text">Closes-{data.closeAt}</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                                
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    {user.categories.hotels.map(data => (
                      <div key={user.id}>
                        
                        <div class="card mb-3" style={{maxWidth: "900px",backgroundColor:'rgb(235,235,236)'}}>
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img src={data.imageUrl} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <div>
                                <h5 class="card-title">{data.name}</h5>
                                <p class="card-text"> Rating : {data.rating}</p>
                                <p class="card-text"> Price : {data.price}/-</p>
                                <p class="card-text">{data.address}</p>
                                
                                <div className="item1" style={{ color:'rgb(150,82,170)'}}>
                                <p class="card-text">Opens-{data.checkIn}</p>
                                <p class="card-text">Closes-{data.checkOut}</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                                
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    {user.categories.offices.map(data => (
                      <div key={user.id}>
                       
                         <div class="card mb-3" style={{maxWidth: "900px",backgroundColor:'rgb(235,235,236)'}}>
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img src={data.imageUrl} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                
                                <h5 class="card-title">{data.name}</h5>
                                <p class="card-text"> Seats : {data.seats}</p>
                                <p class="card-text"> Price: {data.price}/-</p>
                                <p class="card-text"> Cabins: {data.cabins}</p>
                                <p class="card-text"> {data.desc}</p>
                                <p class="card-text"> Area: {data.area}</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                
                                
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                     
                    ))}
                  </CustomTabPanel>
                </Box>
              </div>

            </div>


          )

        })

      }

      {/* <div className="tab">
        <Tabs value={value} onChange={handleTabs}
          textColor="primary"
          indicatorColor="primary">
          <Tab lable='Item1' style={{ textcolor: 'red', fontSize: '900px' }} />
          <Tab lable="Item2" />
          <Tab lable="Item3" />
        </Tabs>

        <p>{value}</p>
      </div> */}
      {/* <TabPanel value={value} index={0} >hii</TabPanel>
     <TabPanel value={value} index={1}>Item 2</TabPanel>
     <TabPanel value={value} index={2}>Item 3</TabPanel> */}

    </div>

  );

}
// function TabPanel(props)
// {
//   const{children,value,index}=props;
//   return(
//     <div>
//       {
//         value===index && (
//           <h1>{children}</h1>
//         )
//       }
//     </div>
//   )
// }


export default App;