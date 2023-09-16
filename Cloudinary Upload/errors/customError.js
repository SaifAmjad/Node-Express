class CustomError extends Error{
    constructor(msg){
        super(msg);
        this.msg=msg
    }
}

class BadRequest extends CustomError{
    constructor(msg){
        super(msg);
        this.status=400;
    }
}

class UnAuth extends CustomError{
    constructor(msg){
        super(msg);
        this.status=401;
    }
}

class NotFound extends CustomError{
    constructor(msg){
        super(msg);
        this.status=404;
    }
}

module.exports={BadRequest,UnAuth,NotFound}