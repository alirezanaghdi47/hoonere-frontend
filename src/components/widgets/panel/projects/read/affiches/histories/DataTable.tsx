// libraries
import {useLayoutEffect, useMemo} from "react";
import Loadable from "@loadable/component";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuInfo} from "react-icons/lu";

// components
const ReadHistoryModal = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/histories/ReadHistoryModal.tsx"));

import Finder from "@/components/widgets/panel/projects/read/affiches/histories/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/affiches/histories/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Table from "@/modules/Table.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";

// services
import {
    readAllProjectAfficheActorService,
    readAllProjectAfficheMemberService,
    readAllProjectAfficheReceptionService, readAllProjectAfficheScreenPlayService,
    readProjectAfficheService
} from "@/services/projectAffichesService.ts";

// types
import {
    IReadAllProjectAfficheActor,
    IReadAllProjectAfficheMember,
    IReadAllProjectAfficheReception, IReadAllProjectAfficheScreenPlay,
    IReadProjectAffiche
} from "@/types/serviceType.ts";

const DataTable = ({
                       readAllProjectAfficheHistoryAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter
                   }) => {
    const {modal, changeModal, _handleShowModal, _handleHideModal} = useModal();

    const readProjectAfficheAction = useMutation({
        mutationFn: (data: IReadProjectAffiche) => readProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                changeModal(data?.data?.affiche_info);
            }
        }
    });

    const readAllProjectAfficheActorAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheActor) => readAllProjectAfficheActorService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                changeModal({actors: data?.data?.actors});
            }
        }
    });

    const readAllProjectAfficheMemberAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheMember) => readAllProjectAfficheMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                changeModal({members: data?.data?.members});
            }
        }
    });

    const readAllProjectAfficheReceptionAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheReception) => readAllProjectAfficheReceptionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                changeModal({receptions: data?.data?.receptions});
            }
        }
    });

    const readAllProjectAfficheScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheScreenPlay) => readAllProjectAfficheScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                changeModal({screenplays: data?.data?.screenplays});
            }
        }
    });

    const tableColumns = useMemo(() => [
            {
                accessorKey: 'number',
                header: () => '#',
                cell: ({row}) => filter.page * filter.per_page - filter.per_page + row.index + 1,
                sortingFn: (rowA, rowB, columnId) => rowA.index - rowB.index
            },
            {
                accessorKey: 'number_string',
                header: () => 'شماره',
                cell: ({row}) => (
                    <div className="w-50px fs-6 text-dark text-truncate">
                        {row.original.number_string}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'date',
                header: () => 'تاریخ',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        {format(row.original.created_at, "yyyy-MM-dd")}
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    return new Date(rowA.original.created_at).getTime() - new Date(rowB.original.created_at).getTime();
                }
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-start align-items-center w-max gap-2">
                        <IconButton
                            color="light-info"
                            size="sm"
                            onClick={() => _handleShowModal({
                                project_id: row.original.project_id,
                                affiche_id: row.original.id.toString()
                            })}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="جزییات آفیش"
                            isLoading={readProjectAfficheAction.isPending && readAllProjectAfficheActorAction.isPending && readAllProjectAfficheMemberAction.isPending && readAllProjectAfficheReceptionAction.isPending && readAllProjectAfficheScreenPlayAction.isPending}
                        >
                            <LuInfo
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                ),
                enableSorting: false
            },
        ], []
    );

    useLayoutEffect(() => {
        if (modal.data) {
            readProjectAfficheAction.mutate({
                project_id: modal?.data?.project_id,
                affiche_id: modal?.data?.affiche_id,
            });
        }
    }, [modal?.isOpen]);

    useLayoutEffect(() => {
        if (modal.data) {
            readAllProjectAfficheActorAction.mutate({
                project_id: modal?.data?.project_id,
                affiche_id: modal?.data?.affiche_id,
            });
        }
    }, [modal?.isOpen]);

    useLayoutEffect(() => {
        if (modal.data) {
            readAllProjectAfficheMemberAction.mutate({
                project_id: modal?.data?.project_id,
                affiche_id: modal?.data?.affiche_id,
            });
        }
    }, [modal?.isOpen]);

    useLayoutEffect(() => {
        if (modal.data) {
            readAllProjectAfficheReceptionAction.mutate({
                project_id: modal?.data?.project_id,
                affiche_id: modal?.data?.affiche_id,
            });
        }
    }, [modal?.isOpen]);

    useLayoutEffect(() => {
        if (modal.data) {
            readAllProjectAfficheScreenPlayAction.mutate({
                project_id: modal?.data?.project_id,
                affiche_id: modal?.data?.affiche_id,
                page: 1,
                per_page: 96
            });
        }
    }, [modal?.isOpen]);

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <Filter
                        readAllProjectAfficheHistoryAction={readAllProjectAfficheHistoryAction}
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        isOpenFilter={isOpenFilter}
                        showFilter={showFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                    />

                    {
                        readAllProjectAfficheHistoryAction.data?.data?.history.length > 0 && (
                            <Table
                                data={readAllProjectAfficheHistoryAction?.data?.data?.history}
                                columns={tableColumns}
                            />
                        )
                    }

                    {
                        readAllProjectAfficheHistoryAction.data?.data?.history.length === 0 && (
                            <Empty
                                title="تاریخچه ای یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    <Finder
                        readAllProjectAfficheHistoryAction={readAllProjectAfficheHistoryAction}
                        filter={filter}
                        changeFilter={changeFilter}
                    />
                </div>
            </div>

            {
                modal.isOpen &&
                !readProjectAfficheAction.isPending && readProjectAfficheAction.data?.data?.affiche_info && Object.keys(readProjectAfficheAction.data?.data?.affiche_info).length > 0 &&
                !readAllProjectAfficheActorAction.isPending &&
                !readAllProjectAfficheMemberAction.isPending &&
                !readAllProjectAfficheReceptionAction.isPending &&
                !readAllProjectAfficheScreenPlayAction.isPending && (
                    <ReadHistoryModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                    />
                )
            }

            <Tooltip/>
        </>
    )
}

export default DataTable;