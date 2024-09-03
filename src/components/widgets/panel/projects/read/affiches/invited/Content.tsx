// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/affiches/invited/DataModal.tsx";

// services
import {
    readInvitedProjectAfficheService,
    readAllInvitedProjectAfficheActorService,
    readAllInvitedProjectAfficheAddressService,
    readAllInvitedProjectAfficheMemberService,
    readAllInvitedProjectAfficheReceptionService,
    readAllInvitedProjectAfficheScreenPlayService,
    IReadInvitedProjectAffiche,
    IReadAllInvitedProjectAfficheActor,
    IReadAllInvitedProjectAfficheAddress,
    IReadAllInvitedProjectAfficheMember,
    IReadAllInvitedProjectAfficheReception,
    IReadAllInvitedProjectAfficheScreenPlay,
} from "@/services/projectAfficheService.ts";

const Content = () => {
    const params = useParams();
    const [data , setData] = useState({});

    const readInvitedProjectAfficheAction = useMutation({
        mutationFn: (data: IReadInvitedProjectAffiche) => readInvitedProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , ...data?.data?.affiche_info , project_title: data?.data?.project_title}));
            }
        }
    });

    const readAllProjectAfficheActorAction = useMutation({
        mutationFn: (data: IReadAllInvitedProjectAfficheActor) => readAllInvitedProjectAfficheActorService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , actors: data?.data?.actors || []}));
            }
        }
    });

    const readAllProjectAfficheMemberAction = useMutation({
        mutationFn: (data: IReadAllInvitedProjectAfficheMember) => readAllInvitedProjectAfficheMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , members: data?.data?.members || []}));
            }
        }
    });

    const readAllInvitedProjectAfficheReceptionAction = useMutation({
        mutationFn: (data: IReadAllInvitedProjectAfficheReception) => readAllInvitedProjectAfficheReceptionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , receptions: data?.data?.receptions || []}));
            }
        }
    });

    const readAllInvitedProjectAfficheScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllInvitedProjectAfficheScreenPlay) => readAllInvitedProjectAfficheScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , screenplays: data?.data?.screenplays || []}));
            }
        }
    });

    const readAllInvitedProjectAfficheAddressAction = useMutation({
        mutationFn: (data: IReadAllInvitedProjectAfficheAddress) => readAllInvitedProjectAfficheAddressService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState , addresses: data?.data?.addresses || []}));
            }
        }
    });

    useLayoutEffect(() => {
        readInvitedProjectAfficheAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheActorAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheMemberAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1
        });
    }, []);

    useLayoutEffect(() => {
        readAllInvitedProjectAfficheReceptionAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1
        });
    }, []);

    useLayoutEffect(() => {
        readAllInvitedProjectAfficheScreenPlayAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            page: 1,
            per_page: 96,
            get_last: 1
        });
    }, []);

    useLayoutEffect(() => {
        readAllInvitedProjectAfficheAddressAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    return !readInvitedProjectAfficheAction.isPending && readInvitedProjectAfficheAction.data?.data?.affiche_info && Object.keys(readInvitedProjectAfficheAction.data?.data?.affiche_info).length > 0 &&
        !readAllProjectAfficheActorAction.isPending &&
        !readAllProjectAfficheMemberAction.isPending &&
        !readAllInvitedProjectAfficheReceptionAction.isPending &&
        !readAllInvitedProjectAfficheScreenPlayAction.isPending && (
            <DataModal affiche={data}/>
        )
}

export default Content;