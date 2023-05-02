module.exports = title => title['english']
    ? title['english']
    : title['romaji']
        ? title['romaji']
        : title['native']
            ? title['native']
            : 'Title is unknown'