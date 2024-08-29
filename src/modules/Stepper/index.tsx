// libraries
import {CSSProperties, HTMLProps} from "react";
import {Stepper as ReactStepper} from 'react-form-stepper';
import classNames from "classnames";

// styles
import "./index.style.scss";

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

type TStepper = {
    steps: { label: string }[],
    activeStep: number
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Stepper;