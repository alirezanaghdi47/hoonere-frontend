// modules
import Stepper from "@/modules/Stepper.tsx";

const steps = [
    {id: 1, label: "اطلاعات اولیه"},
    {id: 2, label: "افراد و تدارکات"},
    {id: 3, label: "فیلم نامه"}
];

const Navigation = ({currentStep}) => {

    return (
        <div className="row gy-5 w-100">
            <div className="col-12">
                <Stepper
                    steps={steps}
                    activeStep={currentStep}
                />
            </div>
        </div>
    )
}

export default Navigation;