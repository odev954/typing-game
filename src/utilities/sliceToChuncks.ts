export default function sliceToChuncks<T>(array: T[], maxSize: number): T[][] {
    let sections: T[][] = [];
    let sectionsIndex = 0;
    let count = 0;

    sections.push([])
    array.forEach((element) => {
        if(count === maxSize) {
            sectionsIndex++;
            count = 0;
            sections.push([]);
        }        
        sections[sectionsIndex].push(element);
    })

    return sections;
}