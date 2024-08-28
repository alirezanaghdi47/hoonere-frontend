// components
import ActionBar from "@/components/partials/panel/ActionBar.tsx";

// modules
import Typography from "@/modules/Typography";

const Header = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 bg-primary">
            <div className="row gy-5 w-100 mw-950px p-5 mb-lg-15">
                <div className="order-2 order-md-1 col-12 col-md-4 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="light"
                        size="xxl"
                        isBold
                    >
                        داشبورد
                    </Typography>
                </div>

                <ActionBar/>
            </div>
        </div>
    )
}

export default Header;