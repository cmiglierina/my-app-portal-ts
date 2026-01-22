import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { Outlet } from 'react-router'
import NavigationBar from './components/navigation/NavigationBar'
import TopBar from './components/navigation/TopBar'
import Footer from './components/footer/Footer'

function App() {


  return (
    <div>
      <Container className='portal-page'>
        <Row>
          <Col xs={12}><TopBar></TopBar> </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="div-body">
              <div className="wrapper grid-layout">
                <div className="lateral-menu my-col"><NavigationBar></NavigationBar> </div>
                <div className="page my-col">
                  <Outlet/>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}> <Footer></Footer> </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
