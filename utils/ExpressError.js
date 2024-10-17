class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass message to the parent Error constructor
        this.statusCode = statusCode;
        this.message = message;
        this.stack = (new Error()).stack; // Capture stack trace
        // Set the prototype explicitly to maintain instanceof checks
        Object.setPrototypeOf(this, ExpressError.prototype);
    }
}

module.exports = ExpressError;