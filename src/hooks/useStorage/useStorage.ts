export default function useStorage()
{
    let scores = {};
    
    scores = localStorage.getItem('scores');

    if(!scores) 
    {
        localStorage.setItem('scores', JSON.stringify({}));
    }

    return (score : { date: Date, count: number }) => {
        let scores = JSON.parse(localStorage.getItem('scores'));

        scores[score.date.toDateString()] = score.count;

        localStorage.setItem('scores', JSON.stringify(scores));
    }
}