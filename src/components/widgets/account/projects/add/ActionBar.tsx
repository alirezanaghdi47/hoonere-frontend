// modules
import Button from "@/modules/Button.tsx";

const ActionBar = () => {
    return (
        <div className="d-flex justify-content-end align-items-center gap-5 w-100">
            <Button
                color="success"
                onClick={() => console.log("submit")}
            >
                افزودن پروژه
            </Button>
        </div>
    )
}

export default ActionBar;