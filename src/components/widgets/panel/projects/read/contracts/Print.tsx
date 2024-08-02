// libraries
import {forwardRef, useImperativeHandle, useRef} from "react";
import {useReactToPrint} from "react-to-print";

const Print = forwardRef((props, ref) => {
    const printRef = useRef();

    const _handlePrint = useReactToPrint({
        documentTitle: `contract-${ref?.current?.contract_info?.contract_number}`,
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

            <div className="page__header">
                {ref?.current?.contract_info?.contract_number}
            </div>

            <div className="page__footer">

            </div>

            <table>
                <thead>
                <tr>
                    <td>
                        <div className="page__header__space"/>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>
                        <div className="page">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt officiis, voluptas.
                            Adipisci autem
                            distinctio eaque laudantium maxime pariatur tempore, totam vel. Dicta eaque laboriosam neque
                            odit
                            sapiente ut voluptatem. Vel?
                        </div>
                    </td>
                </tr>
                </tbody>

                <tfoot>
                <tr>
                    <td>
                        <div className="page__footer__space"/>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
});

export default Print;