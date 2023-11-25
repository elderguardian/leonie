export const query_character = `
query($search: String!) {
    Character(search: $search) {
        name {
            userPreferred
        }
        siteUrl
        favourites
        image {
            large
        }
        gender
        dateOfBirth {
          year
          month
          day
        }
        age
        bloodType
    }
}
`