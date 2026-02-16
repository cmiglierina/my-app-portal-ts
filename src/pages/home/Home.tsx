import { Col, Container, Row } from "react-bootstrap";
import SimpleScatterChart from "../../components/charts/Scatter";
import TwoLevelPieChart from "../../components/charts/Pie";
import SimpleAreaChart from "../../components/charts/Area";
import SimpleBarChart from "../../components/charts/BarChart";
import { useAppDispatch, useAppSelector } from "../../statemanagement/storehooks";
import { useNavigate } from "react-router";
import { getUserFromStorage } from "../../utils/utils";
import type { User } from "../../model/user";
import { setAuthUser } from "../../statemanagement/slices/AuthSlice";
import { useEffect } from "react";



function Home() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let authuser = useAppSelector(state => state.auth.user);
    if (!authuser) {
        authuser = getUserFromStorage() as User;
        if (authuser) {
            
            dispatch(setAuthUser(authuser));
        }
    }

    useEffect(() => {
        if (!authuser) {
            navigate('/login');
        }

        return () => {

        }
    })

    return (
        <>
            <h2>Home</h2>
            <div className="div-home">
                <Container>
                    <Row>
                        <Col ><SimpleScatterChart></SimpleScatterChart> </Col>

                        <Col><TwoLevelPieChart></TwoLevelPieChart> </Col>
                    </Row>
                    <Row>
                        <Col > <SimpleAreaChart></SimpleAreaChart> </Col>

                        <Col> <SimpleBarChart></SimpleBarChart> </Col>
                    </Row>
                </Container>
            </div>
        </>);
}


export default Home;