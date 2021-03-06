import CircularProgress from "@material-ui/core/CircularProgress";
import React, { FunctionComponent , useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../API/services";
import Box from "@material-ui/core/Box";
import { Header } from "./Header";
import { UserDisplay } from "./UserDisplay";
import { Repositories } from "./Repositories";
import Skeleton from "@material-ui/lab/Skeleton";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from "./ScrollTop";

export const Home : FunctionComponent = ()=>{
    const [isLoaded, setIsLoaded]=useState(false);
    const [user,setUser]=useState<{login: string} | null>(null);
    const {userId} = useParams<{userId: string}>();    
    useEffect(()=>{  
        getUser(userId).then((response)=>{
            setUser(response.data);
            setIsLoaded(true);
        }).catch(
            ()=>{
                setIsLoaded(true);
                setUser(null);
            }
        )
    },[userId]);

    if(!isLoaded){
        return  <CircularProgress /> 
    }
    console.log("######:", userId);
    return <>
        
        {user? <>
                <Header />
                <Toolbar id="back-to-top-anchor" />
                <UserDisplay /> 
                <Repositories user={user.login}/>
                <ScrollTop >
                <Fab color="secondary" size="small">
                    <KeyboardArrowUpIcon />
                </Fab>
                </ScrollTop>
            </>: 
                <Box alignItems="center" justifyContent="center" flexDirection="row" display="flex"  >
                    <Skeleton variant="circle" width={80} height={80} />
                    <Skeleton width={150} height={50}>No such user found</Skeleton>
                </Box>
        }
    </>
}