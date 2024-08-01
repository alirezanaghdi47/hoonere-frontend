// libraries
import {forwardRef} from "react";
import parse from "html-react-parser";

const Print = forwardRef(({screenPlay}, ref) => {
    console.log(screenPlay)
    return (
        <div
            ref={ref}
            className='d-none d-print-block'
        >
            <table>
                <tbody>
                <tr>
                    <td>
                        <div className="page">
                            {parse(`${screenPlay?.description}`)}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
})

export default Print;