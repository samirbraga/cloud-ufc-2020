import React, { FunctionComponent, useEffect } from 'react';
import Header from '@/components/Header';
import Post from '@/components/Post';
import DateForm from '@/components/DateForm';
import styles from './styles.less';
import BASE_URL from '../../endpoint';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Grid, Avatar, IconButton, Container } from '@material-ui/core';

const Home: FunctionComponent<HomeProps> =  (props) => {

  const [posts, setPosts] = React.useState(Array<PostType>());
  const [getInfo, setGetInfo] = React.useState(true)
  const [user, setUser] = React.useState({name: "", photo: ""})
  const [token, setToken] = React.useState({id: 0, token: localStorage.getItem("token"), userId: localStorage.getItem("userId")});
  const [selectedStart, setSelectedStart] = React.useState(new Date().toISOString());
  const [selectedEnd, setSelectedEnd] = React.useState(new Date().toISOString());
 
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [click, setClick] = React.useState(false);

  const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/feed`, {
      method: 'GET'
    })

    const res = await response.json();

    if (await response != undefined) {
      setPosts(res)
    }
  }

  
  const getPostsFiltered = async () => {
    if (selectedStart && selectedStart) {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/feed?startDate=${selectedStart}&endDate=${selectedEnd}`, {
          method: 'GET'
        })
    
        const res = await response.json();
    
        if (await response != undefined) {
          setPosts(res)
          setSuccess(true);
          setLoading(false);
        } else {
          setSuccess(false);
          setLoading(false);
          setClick(true)
        }
      } catch {
        setSuccess(false);
        setLoading(false);
        setClick(true)
      }
    }
  }

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/user/${token.userId}`, {
      method: 'GET'
    })

    const res = await response.json();

    if (await response != undefined) {
      setUser({name: `${res.firstName} ${res.lastName}`, photo: res.profilePhoto})
    }
  }

  useEffect(() => {
    if(getInfo) {
      setGetInfo(false)
      getPosts()
      getUser()
    }
  }, [])


  const handleDateStartChance: (date: MaterialUiPickersDate) => void = (date: MaterialUiPickersDate) => {
    if ( date ) setSelectedStart(date.toISOString());
  };
  
  const handleDateEndChance: (date: MaterialUiPickersDate) => void = (date: MaterialUiPickersDate) => {
    if ( date ) setSelectedEnd(date.toISOString());
  };

  const handleClose = () => {
    setClick(false);
  };
  return (
      <Grid>
        <Header title='Instagram'/>
        <Container className={styles.styles}>
          <Grid 
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <DateForm 
                onSubmit={() => getPostsFiltered()} 
                start={handleDateStartChance} 
                end={handleDateEndChance} 
                selectedEnd={selectedEnd} 
                selectedStart={selectedStart}
                handleClose={handleClose}
                click={click}
                loading={loading}
              />
              </Grid>

            {posts.map((post: PostType, i: number) => (
              <Grid item key={i}>
                <Post 
                  id={post.id} 
                  likes={post.users} 
                  description={post.description} 
                  photo={post.s3Address} 
                  username={user.username} 
                  name={user.name} 
                  userId={post.userId}  
                  profile={user.photo}
                  />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>


  );
}
export default Home