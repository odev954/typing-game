export default function useStorage() : [() => any, (score : { date: Date, count: number }) => void] 
{
    let scores = {};
    
    scores = localStorage.getItem('scores');

    if(!scores) 
    {
        localStorage.setItem('scores', JSON.stringify({}));
    }

    return [
            //getter
            () => JSON.parse(localStorage.getItem('scores')),
            
            (score : { date: Date, count: number }) => {
            let scores = JSON.parse(localStorage.getItem('scores'));

            scores[score.date.toLocaleString()] = score.count;

            localStorage.setItem('scores', JSON.stringify(scores));
        }
    ]
}