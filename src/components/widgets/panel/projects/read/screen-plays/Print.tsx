// libraries
import {forwardRef, useImperativeHandle, useRef} from "react";
import {useReactToPrint} from "react-to-print";
import parse from "html-react-parser";

const Print = forwardRef((props, ref) => {
    const printRef = useRef();

    const _handlePrint = useReactToPrint({
        documentTitle: `screenplay-${ref?.current?.screenplay_info?.created}`,
        content: () => printRef.current,
    });

    useImperativeHandle(ref, () => {
        return {
            print() {
                setTimeout(() => {
                    _handlePrint();
                } , 100);
            }
        }
    }, []);

    return (
        <div
            ref={printRef}
            className='d-none d-print-block'
        >
            <table>
                <tbody>
                <tr>
                    <td>
                        <div className="page">
                            {parse(`${ref?.current?.screenplay_info?.description}`)}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
})

export default Print;