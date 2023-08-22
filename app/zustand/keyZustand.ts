import { StoreKey } from 'shared/helpers/constant';

export type KeyZustand =
    StoreKey.Localization |
    'SelectedChild' |
    'AllChildrenData' |
    'GetDiligenceData' |
    'dataFilterClub' |
    'dataDetailInfoRequestClub' |
    'NewsTabLoading' |
    'NewsTabInternalLoading' |
    'NewsTabSmisLoading' |
    'currentTabNews' |
    'currentTabShuttle' |
    'dataCountAllClassCancel' |
    'isFetchShuttleHistory' |
    'NotiChildrenSelected' |
    'LoadingClubListRegister' |
    'LoadingClubListUnRegister' |
    'TotalNotiUnread' |
    'pickupPoint' |
    'pickoffPoint' |
    'ProcessPolicyLoading' |
    'dataGetAllLeaveRequest' |
    'loadingContactExchange' |
    'isFetchAllNews' | 
    'refetchContactData' | 
    'translatedState' | 
    'playerIdOnesignal'