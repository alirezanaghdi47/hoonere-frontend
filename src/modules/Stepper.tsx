// libraries
import {Stepper as ReactStepper} from 'react-form-stepper';
import classNames from "classnames";

// styles
import "@/styles/modules/stepper.scss";

// types
import {TStepper} from "@/types/moduleType.ts";

const Stepper = ({steps, activeStep = 1, ...props}: TStepper) => {
    return (
        <ReactStepper
            {...props}
            steps={steps}
            activeStep={activeStep - 1}
            className={classNames("stepper__container" , props.className)}
            style={{direction: "ltr" , ...props.style}}
        />
    )
}

export default Stepper;