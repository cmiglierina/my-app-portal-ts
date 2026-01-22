import { Col, Container, Row } from "react-bootstrap";
import SimpleScatterChart from "../../components/charts/Scatter";
import TwoLevelPieChart from "../../components/charts/Pie";
import SimpleAreaChart from "../../components/charts/Area";
import SimpleBarChart from "../../components/charts/BarChart";



function Home() {

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