import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

let sharing = false;

export async function shareSave(text, name) {
  if (sharing) return false;
  sharing = true;
  const path = `dustgame-exports/${name}`;
  try {
    const { uri } = await Filesystem.writeFile({
      path,
      data: text,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    try {
      await Share.share({ files: [uri] });
      return true;
    } catch (error) {
      if (error.message === 'Share canceled') return false;
      throw error;
    } finally {
      await Filesystem.deleteFile({ path, directory: Directory.Cache }).catch(() => {});
    }
  } finally {
    sharing = false;
  }
}
