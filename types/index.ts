export type SiteQuizInfo = {
    dateTime: string,
    info: string,
    additionalInfo?: string
}
export type QuizType = 'shaker' | 'mohito' | 'quizPlease' | 'smuzi';
export type ApiResponse = Record<QuizType, SiteQuizInfo[] >