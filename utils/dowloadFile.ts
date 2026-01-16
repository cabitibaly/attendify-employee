import { Directory, File, Paths } from 'expo-file-system';

export const downloadFile = async (url: string, onLoading?: (bool: boolean) => void): Promise<number | null> => {
    if (!url) return null;

    onLoading?.(true);

    try {
        
        const cacheDir = new Directory(Paths.cache, 'temp'); 
        cacheDir.delete();   
        cacheDir.create();

        const tempFile = await File.downloadFileAsync(
            url, 
            cacheDir,
        );               

        return tempFile.size

    } catch (error) {
        console.log("une erreur est survenue:", error)
        return null;
    } finally {
        onLoading?.(false);
    }
}