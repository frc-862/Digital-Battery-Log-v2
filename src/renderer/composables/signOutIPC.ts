export async function signOut(battery: string, soc: string, rint: string): Promise<boolean> {
    try {
        const date = new Date();
        const success: boolean = await window.electronAPI.logOut({battery: battery, soc: soc, rint: rint, time: date.toISOString()})
        console.log(success)
        return success;
    } catch (error) { 
        console.log(error);
        return false;
    }
}