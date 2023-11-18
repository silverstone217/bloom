

export interface BlogType {
    title: string
    content : string
    image : string
    genre : string
}

export interface BlogsType{
    id:  string 
    title: string
    image: string
    content: string
    createdAt: DateTime 
    updatedAt : DateTime 
    author? : string
    userId  :string 
    user   : User 
    comments : Comment[]
    genre : string
    stats  :   BlogStats[]
    _count : {
        comments: number|string,
        stats: number | string
    }
}

export interface Comment {
    id:        string 
    text:      string
    userId:    string
    blogId:    string
    blog :     BlogsType[]
    createdAt: DateTime 
}

export interface BlogStats{
    id:        string
    views :    number 
    userId?:    string
    blogId:    string
    blog :     BlogsType[]
    user?   : User
}