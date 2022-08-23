const mongoose = require("mongoose")

module.exports = {
    checkEmpty(checker) {
        return checker
            .notEmpty()
            .withMessage("Field are required")
            .bail();
    },
    checkObjectId(checker) {
        return checker
            .custom(value =>
                mongoose.Types.ObjectId.isValid(value)
                    ? true : Promise.reject("id invalid"))
            .bail()
    }
}