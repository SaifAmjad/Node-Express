class CustomError extends Error{
    constructor(msg){
        super(msg);
    }
}

class BadRequest extends CustomError{
    constructor(msg){
        super(msg);
        this.status=400;
    }
}

class UnAuthorized extends CustomError{
    constructor(msg){
        super(msg);
        this.status=401;
    }
}

module.exports={BadRequest,UnAuthorized};