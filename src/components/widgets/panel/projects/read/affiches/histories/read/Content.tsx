// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/affiches/histories/read/DataModal.tsx";

// services
import {
    readAllProjectAfficheActorService,
    readAllProjectAfficheAddressService,
    readAllProjectAfficheMemberService,
    readAllProjectAfficheReceptionService,
    readAllProjectAfficheScreenPlayService,
    readProjectAfficheService
} from "@/services/projectAfficheService.ts";

// types
import {
    IReadAllProjectAfficheActor,
    IReadAllProjectAfficheAddress,
    IReadAllProjectAfficheMember,
    IReadAllProjectAfficheReception,
    IReadAllProjectAfficheScreenPlay,
    IReadProjectAffiche
} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const [data , setData] = useState({});

    const readProjectAfficheAction = useMutation({
        mutationFn: (data: IReadProjectAffiche) => readProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , ...data?.data?.affiche_info}));
            }
        }
    });

    const readAllProjectAfficheActorAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheActor) => readAllProjectAfficheActorService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , actors: data?.data?.actors || []}));
            }
        }
    });

    const readAllProjectAfficheMemberAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheMember) => readAllProjectAfficheMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , members: data?.data?.members || []}));
            }
        }
    });

    const readAllProjectAfficheReceptionAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheReception) => readAllProjectAfficheReceptionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , receptions: data?.data?.receptions || []}));
            }
        }
    });

    const readAllProjectAfficheScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheScreenPlay) => readAllProjectAfficheScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , screenplays: data?.data?.screenplays || []}));
            }
        }
    });

    const readAllProjectAfficheAddressAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheAddress) => readAllProjectAfficheAddressService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , addresses: data?.data?.addresses || []}));
            }
        }
    });

    useLayoutEffect(() => {
        readProjectAfficheAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 0
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheActorAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 0
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheMemberAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 0
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheReceptionAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 0
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheScreenPlayAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            page: 1,
            per_page: 96,
            get_last: 0
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheAddressAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 0,
        });
    }, []);

    return !readProjectAfficheAction.isPending && readProjectAfficheAction.data?.data?.affiche_info && Object.keys(readProjectAfficheAction.data?.data?.affiche_info).length > 0 &&
        !readAllProjectAfficheActorAction.isPending &&
        !readAllProjectAfficheMemberAction.isPending &&
        !readAllProjectAfficheReceptionAction.isPending &&
        !readAllProjectAfficheScreenPlayAction.isPending && (
            <DataModal history={data}/>
        )
}

export default Content;