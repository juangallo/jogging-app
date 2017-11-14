export function iterateRecords(records) {
    const res = [];
    for (const uniqueId in records) {
        const item = records[uniqueId];
        item.id = uniqueId;
        res.push(item);
    }
    return res;
}

export function convertToKmH(speed) {
    return speed * 3.6;
}
