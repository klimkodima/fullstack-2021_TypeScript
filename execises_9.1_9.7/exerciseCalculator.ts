interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}

const calculateExercises = (hoursInDay: Array<number>, target:number): Result => {
    
    const periodLength = hoursInDay.length;
    const trainingDays = hoursInDay.filter(hour => hour !== 0).length;
    const average = hoursInDay.reduce(function(sum, elem) {
        return sum + elem;
    }, 0)/periodLength;
    const success = hoursInDay.filter(hour => hour >= 2).length === periodLength;
    let rating = 1; 
    let ratingDescription  = 'bad';
    if(success === true) {
        rating = 3;
        ratingDescription = 'Great!!!';
    }

    if(average > 1.5 && success === false) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }


    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average 
    };
};

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAndCalculateExecises = ( stringHours: any[], stringTarget:any) => {
    
    if (!stringTarget || !stringHours) {
      throw new Error('Not enough arguments');
    }

    const hours = stringHours.map(hour =>Number(hour));
    const target = Number(stringTarget);

    if (hours.includes(NaN) || target !== target ) {
        throw new Error('Provided values were not numbers!');
    }

    return calculateExercises(hours, target);
};
  
try {

    if (process.argv.length > 2) {
        const [, , target, ...exercises] = process.argv;
        console.log(parseAndCalculateExecises( exercises, target));
    }

} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
 