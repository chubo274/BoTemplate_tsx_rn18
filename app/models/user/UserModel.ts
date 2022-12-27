export class UserModel {
    token: string
    refreshToken?: string

    constructor (token: string) {
        this.token = token
    }

    static parseFromJson = (data: any) => {
        const obj = new UserModel('')
        const { access_token, refresh_token } = data

        obj.token = access_token ?? ''
        obj.refreshToken = refresh_token

        return obj
    }
}
