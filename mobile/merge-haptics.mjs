import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function playMergeHaptic() {
  return Haptics.impact({ style: ImpactStyle.Light });
}
