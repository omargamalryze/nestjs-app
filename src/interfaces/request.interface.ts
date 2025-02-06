import { Request } from 'express';
import { Payload } from 'src/auth/auth.service';

export interface IRequestWithPayload extends Request {
  payload: Payload;
}
