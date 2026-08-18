export type SiteQuizInfo = {
    dateTime: string,
    info: string,
    additionalInfo?: string
}

export type ApiResponse = {
    shaker: SiteQuizInfo[],
    quizPlease: SiteQuizInfo[],
    smuzi: SiteQuizInfo[]
}