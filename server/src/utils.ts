import { Response } from "express";

export const ResponseProcessor = (
  res: Response,
  status: number,
  message: string | object
) => res.status(status).json(message);

export async function errorHandler(
  res: Response,
  toRun: any,
  successStatus: number,
  errorStatus: number,
  optionalBody?: any
) {
  try {
    const result = await toRun;
    return ResponseProcessor(res, successStatus, { result, optionalBody });
  } catch (error) {
    return ResponseProcessor(res, errorStatus, {
      message: error.message,
      error,
    });
  }
}
