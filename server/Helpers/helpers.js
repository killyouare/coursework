module.exports = {
    checkEmpty(checker) {
        return checker
            .notEmpty()
            .withMessage("Field are required");
    }
}