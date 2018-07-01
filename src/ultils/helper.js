export default function findIndex(items, id) {
    var result = -1;
    items.forEach((items, index) => {
        if (items.id === id) {
            result = index;
        }
    })
    return result
}

