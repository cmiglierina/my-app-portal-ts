import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { Outlet } from 'react-router'

function App() {


  return (
    <div>
      <Container>
        <Row>
          <Col xs={12}>HEADER</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="div-body">
              <div className="wrapper">
                <div className="lateral-menu"></div>
                <div className="page">
                  <Outlet/>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
