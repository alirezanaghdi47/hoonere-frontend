const BlankLayout = ({children}) => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 min-vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 w-sm-500px p-10">
                {children}
            </div>
        </div>
    )
}

export default BlankLayout;