//connecting to a MongoDB instance running on the cloud
export const DB_CONNECT="mongodb+srv://todo-list:admin%40todo@cluster0.prutudr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
;
//todo-list:<password>@cluster0.prutudr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


// connecting to a MongoDB instance running on the local machine
//export const DB_CONNECT="mongodb://localhost:27017/todolist";  ---  This URL is not working for my system to connenct mongoDB on local machine
//export const DB_CONNECT="mongodb://127.0.0.1:27017/todolist";   //-- This URL is working properly



export const JWT_TOKEN_SECRET="shajkdjksahjkdhjkash";

export const StatusCode={
    success:200,
    VALIDATION_ERROR:201,
    UNPROCESSABLE_ENTITY:202,
    AUTH_ERROR:203,

}