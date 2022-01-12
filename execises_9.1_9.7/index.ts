import express from 'express';
import { Request, Response } from 'express';
import { parseAndCalculateBmi } from "./bmiCalculator";
import { parseAndCalculateExecises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
    res.send("Hello Full Stack!");
  });

app.get("/bmi", (req: Request, res: Response) => {

    try {
      const height = req.query.height;
      const weight = req.query.weight;
      res.status(200).send({ weight, height, bmi: parseAndCalculateBmi(height, weight) });
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send({
        error: errorMessage
      });
    }
});

app.post("/exercises", (req: Request, res: Response) => {

  try {
    const { daily_exercises, target } = req.body;
    res.status(200).send( parseAndCalculateExecises(daily_exercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({
      error: errorMessage
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});