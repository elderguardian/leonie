export const query_mediaByType = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $type: MediaType) {
  Page (page: $page, perPage: $perPage) {
    media (id: $id, search: $search, type: $type) {
      siteUrl
      id
      title {
        romaji
        english
        native
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      coverImage {
        large
        medium
      }
      bannerImage
      status
      episodes
      duration
      chapters
      volumes
      season
      description
      genres
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
}
`;
