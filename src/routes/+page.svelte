<script>
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';

  let { data } = $props();
  let selected = $state(null);

  let headline = 'Recent Consumer Complaints';
  let byline = 'Jack Walker';
  let pubDate = '2026-03-29';

  function formatReportedDate(dateString) {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'N/A';

    const datePart = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);

    const timePart = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);

    return `${datePart} (${timePart})`;
  }
</script>

<svelte:head>
  <title>{headline} | NYCity News Service</title>
</svelte:head>

<div class="container header-container">
  <ArticleHeader
    {headline}
    {byline}
    {pubDate}
  />
</div>

<div class="blurb">
  <p>This dataset contains the latest consumer complaints submitted to the New York City Department of Consumer and Worker Protection. (<a href="https://data.cityofnewyork.us/Business/DCWP-Consumer-Complaints/nre2-6m2s/" target="_blank" rel="noopener noreferrer">You can find the data here.</a>)</p>
    <br>
  <p>Complaints that lack important values, like business name and complaint type, have been removed. All complaints come directly from the city's dataset, and have not been edited for accuracy or clarity.</p>
</div>

<div class="wide-container">
  <div class="complaints">
    {#each data.complaints as complaint, index (`${complaint.record_id}-${index}`)}
      <div class="card" onclick={() => selected = complaint}>
        <h3>{complaint.business_name}</h3>
        <p>{complaint.complaint_code}</p>
      </div>
    {/each}
  </div>
</div>

{#if selected}
  <div class="overlay" onclick={() => selected = null}>
    <div class="popup" onclick={(e) => e.stopPropagation()}>
      <button class="close-btn" onclick={() => selected = null}>&times;</button>
      <h2>{selected.business_category}</h2>
      <p><strong>Location:</strong> {selected.street1}</p>
      <p><strong>Borough:</strong> {selected.borough}</p>
      <p><strong>Reported:</strong> {formatReportedDate(selected.intake_date)}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles' as *;

  .complaints {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
  }

  .card {
    padding: var(--spacing-sm);
    border: var(--border-width-thin) solid var(--color-border);
    cursor: pointer;

    &:hover {
      background-color: var(--color-light-gray);
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup {
    position: relative;
    background: white;
    padding: var(--spacing-lg);
    max-width: 500px;
    width: 90%;
  }

  .popup button {
    float: right;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    background: none;
    border: none;
    font-size: var(--font-size-3xl);
    line-height: 1;
    color: var(--color-medium-gray);
    cursor: pointer;

    &:hover {
      color: var(--color-dark);
    }
  }

  .wide-container {
    max-width: 1300px;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
  }

  .blurb {
    max-width: var(--max-width);
    margin: 0 auto var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-light-gray);
    color: var(--color-text);
    font-family: var(--font-sans);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 2px 8px var(--color-shadow);
  }

  .blurb p {
    margin: 0;
    line-height: var(--leading-caption);
    font-size: var(--font-size-base);
  }

  .header-container {
    padding-bottom: var(--spacing-xs);
  }

  .header-container :global(.article-header) {
    margin-bottom: var(--spacing-xs);
  }

</style>