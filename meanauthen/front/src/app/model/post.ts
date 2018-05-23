export class Post {
    public id_userpost:string;
    public plaintext:string;
    public create_on:string;
    public like_by:[string];
    public comment:[{id_usercomment:string,plaintext_comment:string}];
    public shared_by: [string];
    public name: string;
    public email: string;
    public imageprofile: string;
}
