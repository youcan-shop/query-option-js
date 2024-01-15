export function slice(items: Array<any>, n: Number): Array<any> {
    let counter = 0;
    let result = [];
    let tmp = [];

    for (let i = 0; i < items.length; i++) {
        tmp.push(items[i]);
        counter++;

        if (counter === n) {
            result.push(tmp);
            counter = 0;
            tmp = [];
        }
    }

    return result;
}
