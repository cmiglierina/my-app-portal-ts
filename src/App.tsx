import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { Outlet } from 'react-router'
import NavigationBar from './components/navigation/NavigationBar'
import TopBar from './components/navigation/TopBar'
import Footer from './components/footer/Footer'
import ErrorBoundary from './components/error/ErrorBoundary'
import { Bounce, ToastContainer } from 'react-toastify'

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
                  <ErrorBoundary>

                    <Outlet />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}> <Footer></Footer> </Col>
        </Row>
      </Container>
      <ToastContainer
                  containerId='APP_TOASTIFY'
                  position="top-center"
                  autoClose={880}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Bounce}
              />
    </div>
  )
}

export default App
