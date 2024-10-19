export type UserType = {
    uid: string,
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | null;
    emailVerified: boolean,
    gender: string | undefined;
    image: string | undefined;
}