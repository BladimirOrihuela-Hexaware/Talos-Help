import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styled from 'styled-components';
import { Text } from "@common/components";
import { Button } from "@common/components";
import { Link } from "@mui/material";

const MainContainer = styled.div`
    background-color: #D3D2D2;
    width:100vw;
    height:100vh; 
    display:flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 70vw;
    height: 80vh;
    margin: 0 auto;
    position: relative;
    display: flex;
    border-radius: 30px;
    @media screen and (max-width: 600px) {
        position: absolute;
        display:grid;
    }

`;

const SingInContainer = styled.div`
    width:50%;
    height:100%;
    display:flex;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const SingInArea = styled.div`
    width: 100%;
    height: 100%;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: white;
`;

const WelcomeContainer = styled.div`
    width: 100%;
    height: 20%;
    justify-content: center;
    align-items:center;
    display:flex;
`;

const WelcomeArea = styled.div`
    width:90%;
    height:80%;
    align-items:center;
    display:flex;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    height: 80%;
`;

const ButtonsArea = styled.div`
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
    display: grid;
`;

const TextArea = styled.div`
    width:100%;
    height: 50%;
    justify-content: center;
    align-items:center;
    display:flex;
`;

const TextContainer = styled.div`
    width: 90%;
    height:90%;
`;

class Login extends React.Component{

    onClick = () =>{
        console.log("Hola mundo");
    }

    render() {
        return( 
            <MainContainer>
                <Container>
                    <SingInContainer>
                        <SingInArea>

                            <WelcomeContainer>
                                <WelcomeArea>
                                    <Text type="h4" noWrap sx={{ display: { sm: "block" } }}>
                                        Welcome
                                    </Text>
                                </WelcomeArea>
                            </WelcomeContainer>

                            <ButtonsContainer>
                                <ButtonsArea>
                                    <Button
                                       onClick={this.onClick}
                                       text={"Upload License"}
                                    />
                                    <Button
                                       onClick={this.onClick}
                                       text={"SSO"}
                                    />
                                </ButtonsArea>  
                                
                               <TextArea>
                                    <TextContainer>
                                        <Link href="#">
                                            <Text type="body">Generate License</Text>
                                        </Link>
                                    </TextContainer>
                                    
                               </TextArea>
                                    
                               
                                
                            </ButtonsContainer>

                        </SingInArea>
                    </SingInContainer>
                    <SingInContainer>
                        div2
                    </SingInContainer>
                </Container>
            </MainContainer> 
        );
    }
}

export default Login;