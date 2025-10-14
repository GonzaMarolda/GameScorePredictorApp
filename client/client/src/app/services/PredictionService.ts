import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionInput } from '../models/predictionInput';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PredictionService {
    http = inject(HttpClient);
    errorMessage = signal<string>("");
    private url = 'TODO'; 

    async predict(input: PredictionInput) : Promise<number> {
        try {
            const data = await firstValueFrom(
                this.http.post<number>(this.url, input)
            )
            return data
        } catch (err) {
            this.processError(err)
            throw err
        }
    }

    private async processError(err: any) {
        err.status === 400 ? this.errorMessage.set(err.message) : this.errorMessage.set("There was an error")
    }
}