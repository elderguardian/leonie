
const hasPerms = (permissions, wantedPermissions) => {
    let missingPerms = false

    for (let i = 0; i < wantedPermissions.length; i++) {
        if (!permissions.has(wantedPermissions[i])) {
            missingPerms = true
            break
        }
    }

    return !missingPerms
}

module.exports = {
    hasPerms,
}