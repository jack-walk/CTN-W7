// Page settings
import complaints from '$lib/data/consumer-values.json';

function isBlankValue(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

function isBlankEntry(entry) {
  if (!entry || typeof entry !== 'object') return true;
  const values = Object.values(entry);
  if (values.length === 0) return true;
  return values.every((value) => isBlankValue(value));
}

function isNotAvailableValue(value) {
  if (typeof value !== 'string') return false;

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');

  return normalized === 'na' || normalized === 'notavailable';
}

function getIntakeTimestamp(complaint) {
  const timestamp = Date.parse(complaint?.intake_date ?? '');
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

const cleanedComplaints = complaints.filter((entry) => {
  if (isBlankEntry(entry)) return false;
  if (isBlankValue(entry.business_name)) return false;
  if (isNotAvailableValue(entry.business_name)) return false;
  if (isBlankValue(entry.complaint_code)) return false;
  return true;
});

const complaintsByRecency = [...cleanedComplaints].sort(
  (a, b) => getIntakeTimestamp(b) - getIntakeTimestamp(a)
);

// These values are passed to the layout to control what appears on the page.
export function load() {
  return {
    // Set to false to hide the NYCity News Service header
    showHeader: true, 
    // Set to false to hide the site footer
    showFooter: true,
    complaints: complaintsByRecency,
  };
}