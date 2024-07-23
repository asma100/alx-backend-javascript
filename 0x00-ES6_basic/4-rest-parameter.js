export default function returnHowManyArguments(... argumentts) {
    let count = 0;
    for (const arg in argumentts){
	count = count + 1;
    }
    return count;
}
