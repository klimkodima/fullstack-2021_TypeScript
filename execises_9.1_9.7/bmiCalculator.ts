const calculateBmi = (height: number, mass: number): string => {
   let message = '';
   const bmi = mass/height/height*10000;
   if(bmi < 18.5) message = 'underweight';
   if(bmi >= 30) message = 'obese';
   if(bmi >= 18.5 && bmi < 24.9) message = 'normal weight';
   if(bmi >= 24.9 && bmi < 30) message = 'overweight';
   return message;
};
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAndCalculateBmi = (height: any, mass: any): string => {
    if (!height || !mass) {
        throw new Error("You need to provide both height and weight");
      }
    const value1 = Number(height);
    const value2 = Number(mass);
    if (isNaN(value1) || isNaN(value2)) {
        throw new Error('malformatted parameters');
    } 
    return calculateBmi(value1, value2);
};

try {
    console.log(parseAndCalculateBmi(process.argv[2], process.argv[3]));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}