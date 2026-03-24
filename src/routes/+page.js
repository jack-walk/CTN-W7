// Page settings
import permits from '$lib/data/permits.json';

// These values are passed to the layout to control what appears on the page.
export function load() {
  return {
    // Set to false to hide the NYCity News Service header
    showHeader: true, 
    // Set to false to hide the site footer
    showFooter: true,
    permits,
  };
}