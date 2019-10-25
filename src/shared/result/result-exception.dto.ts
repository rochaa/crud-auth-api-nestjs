export class ResultExceptionDto {
    constructor(
        public message: string,
        public errors: any,
    ) { }
}
