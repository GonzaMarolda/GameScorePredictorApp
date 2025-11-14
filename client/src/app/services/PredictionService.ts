import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionInput } from '../models/predictionInput';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PredictionService {
    http = inject(HttpClient);
    errorMessage = signal<string>("");
    private url = 'http://127.0.0.1:5000'; 

    async predict(input: PredictionInput) : Promise<number> {
        try {
            const data = await firstValueFrom(
                this.http.post<{ prediction: number }>(this.url, input)
            )
            return data.prediction
        } catch (err) {
            this.processError(err)
            throw err
        }
    }

    async getTags(): Promise<string[]> {
        try {
            const data = await firstValueFrom(
                this.http.get<{ tags: string[] }>(`${this.url}/tags`)
            )
            return data.tags
        } catch (err) {
            this.processError(err)
            throw err
        }
    }

    async getPublishers(): Promise<string[]> {
        try {
            const data = await firstValueFrom(
                this.http.get<{ publishers: string[] }>(`${this.url}/publishers`)
            )
            return data.publishers
        } catch (err) {
            this.processError(err)
            throw err
        }
    }

    private async processError(err: any) {
        err.status === 400 ? this.errorMessage.set(err.message) : this.errorMessage.set("There was an error")
    }
}