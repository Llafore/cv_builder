export const splitBullets = (arr) => {
    const middle = Math.ceil(arr.length / 2);
    return {
        left: arr.slice(0, middle), 
        right: arr.slice(middle)
    };
}