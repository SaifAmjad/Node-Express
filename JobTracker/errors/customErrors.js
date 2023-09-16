class BadRequest extends Error{
    constructor(msg){
        super(msg);
        this.status=401;
    }
}

class UnAuth extends Error{
    constructor(msg){
        super(msg);
        this.status=402;
    }
}

class NotFound extends Error{
    constructor(msg){
        super(msg);
        this.status=404;
    }
}

module.exports={BadRequest,UnAuth,NotFound}