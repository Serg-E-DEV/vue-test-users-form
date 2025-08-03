import { RecordLabels } from '@/interfaces/recordLabel.interface';

export function normalizeLabelsInput(labelsText: string): string {
  if (!labelsText) {
    return '';
  }

  let normalized = labelsText.replace(/[\n\r\t]/g, ' ');

  normalized = normalized.replace(/ {2,}/g, ' ');

  normalized = normalized.replace(/ *; */g, '; ');

  const labels = normalized
    .split(';')
    .map((label) => label.trim().replace(/ /g, ''))
    .filter((label) => label !== '');

  return labels.join('; ');
}

export function stringToRecordLabels(label: string | RecordLabels): RecordLabels {
  if (!label) {
    return [];
  }

  if (Array.isArray(label)) {
    return label;
  }

  return label
    .split(';')
    .map((label) => ({ text: label.trim() }))
    .filter((label) => label.text !== '');
}

export function recordLabelsToString(labels: RecordLabels): string {
  return labels.map((label) => label.text).join('; ');
}
