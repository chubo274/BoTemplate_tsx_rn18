// Enum
export enum ActionStatus {
    None = 'none',
    Fetching = 'fetching',
    Refreshing = 'refreshing',
    LoadMore = 'loadmore',
    Done = 'done',
}

export enum StoreKey {
    User = 'User',
    Token = 'Token',
    Localization = 'Localization',
}

export enum DateTimeFormat {
    FullDateTime = 'DD-MM-YYYY hh:mm:ss',
    DateTimeAmPm = 'DD-MM-YYYY hh A',
    DateTime24h = 'DD-MM-YYYY HH:mm',
    FullDateDash = 'DD-MM-YYYY',
    Time = 'hh:mm:ss',
    TimeHourMinPM = 'HH:mm A',
    APIFormat = 'YYYY-MM-DD HH:mm:ss',    // default format
    FullDateShortMonth = 'MMM DD, YYY',
}

export enum EmitType {
}

// Const
