export class Post {
  constructor(
    public userId: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public id? : string
  ) {}
}
