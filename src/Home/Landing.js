import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import TopMenu from './TopMenu'
import img1 from '../images/car-wash-2.png'
import img2 from '../images/man-wash-car-3.png'
import img3 from '../images/man-wash-car-4.png'
import './style.css'

function Landing() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Matron Backgroun',
    key: '2345',
    imgPath: img1
  },
  {
    label: 'Matron Background',
    key: '678',
    imgPath: img2
  },
  {
    label: 'Matron Background',
    key: '865',
    imgPath: img3
  }
];

const theme = useTheme();
const [activeStep, setActiveStep] = React.useState(0);
const maxSteps = images.length;

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleStepChange = (step) => {
  setActiveStep(step);
};

  return (
    <div className="top-nav">
      <div id="top-content">
        <Box sx={{ maxWidth: "100vw", maxHeight: '100vh', overflow: 'hidden', background: '#000' }} id='carousel-box'>
          <Paper
            square
            elevation={0}
            sx={{
              alignItems: 'center',
              maxHeight: 80,
              height: 80,
              position: 'absolute',
              zIndex: 1,
              top: 0,
              right: 0,
              // pl: 2,
              // bgcolor: 'inherit',
              opacity: .5,
              color: '#000',
              border: 'none',
              width: '100%'
            }}
          >
            <TopMenu />
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.key} style={{width: '100vw', background: "#fff", padding: '0px'}}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: '100vh',
                      display: 'block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      width: '100%',
                      borderRadius: '0%',
                      margin: '0px'
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  stepper={
                    <MobileStepper
                      steps={maxSteps}
                      position="static"
                      activeStep={activeStep}
                      sx={{display: 'flex', justifyContent: 'center', position: 'relative', bottom: '-50px'}}
                      // nextButton={
                      //   <Button
                      //     size="small"
                      //     onClick={handleNext}
                      //     disabled={activeStep === maxSteps - 1}
                      //   >
                      //     Next
                      //     {theme.direction === 'rtl' ? (
                      //       <KeyboardArrowLeft />
                      //     ) : (
                      //       <KeyboardArrowRight />
                      //     )}
                      //   </Button>
                      // }
                      // backButton={
                      //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      //     {theme.direction === 'rtl' ? (
                      //       <KeyboardArrowRight />
                      //     ) : (
                      //       <KeyboardArrowLeft />
                      //     )}
                      //     Back
                      //   </Button>
                      // }
                    />
                  }
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          
        </Box>
      </div>
    </div>
  )
}

export default Landing