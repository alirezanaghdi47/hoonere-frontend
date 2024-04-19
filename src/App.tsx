// providers
import RouterProvider from "@/providers/RouterProvider.tsx";
import ToastProvider from "@/providers/ToastProvider.tsx";

// styles
import "@/styles/bootstrap.css";
import "@/styles/font-awesome.css";
import "@/styles/iran-sans.css";
import "@/styles/global.scss";

const App = () => {
    return (
        <>
            <RouterProvider/>
            <ToastProvider/>
        </>
    )
}

export default App;