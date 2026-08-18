export type SiteQuizInfo = {
    dateTime: string,
    info: string,
    additionalInfo?: string
}

export type ApiResponse = Record<'shaker' | 'mohito' | 'quizPlease' | 'smuzi', SiteQuizInfo[] >