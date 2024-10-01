const checkValid = (inputObject, allowedUpdates) => {
    const updates = Object.keys(inputObject)

    const isValid = updates.every((update) => allowedUpdates.includes(update))
    return {
        isValid,
        updates
    }
}

module.exports = {
    checkValid
}