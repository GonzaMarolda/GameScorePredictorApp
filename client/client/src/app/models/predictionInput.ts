export interface PredictionInput {
  price: number;
  requiredAge: number;
  isIndie: boolean;
  supportsEnglish: boolean;
  supportedLanguagesAmount: number;
  tags: string[];        
  publishers: string[];  
}