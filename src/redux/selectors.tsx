interface userInterface {
    name: string | null,
}
interface stateInterface {
    user: userInterface ,
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserName = (state:stateInterface): string | null => (state?.user?.name);

