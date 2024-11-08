import { body, param } from "express-validator";

export default [
    // Validate ID parameter
    param("id")
        .exists()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid category ID format"),

    // Ensure at least one field is present
    body().custom((value) => {
        if (Object.keys(value).length === 0) {
            throw new Error("At least one field must be provided for update");
        }
        return true;
    }),

    // Name validation (if provided)
    body("name")
        .optional()
        .isString()
        .withMessage("Category name should be a string")
        .trim()
        .notEmpty()
        .withMessage("Category name cannot be empty"),

    // Price configuration validation (if provided)
    body("priceConfiguration")
        .optional()
        .custom((value) => {
            if (typeof value !== "object" || value === null) {
                throw new Error("Price configuration must be an object");
            }
            return true;
        }),

    body("priceConfiguration.*.priceType")
        .optional()
        .custom((value: "base" | "aditional") => {
            const validKeys = ["base", "aditional"];
            if (!validKeys.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType field. Possible values are: [${validKeys.join(
                        ", ",
                    )}]`,
                );
            }
            return true;
        }),

    body("priceConfiguration.*.availableOptions")
        .optional()
        .isArray()
        .withMessage("Available options should be an array")
        .custom((value: string[]) => {
            if (
                !value.every(
                    (option) =>
                        typeof option === "string" && option.trim().length > 0,
                )
            ) {
                throw new Error(
                    "All available options must be non-empty strings",
                );
            }
            return true;
        }),

    // Attributes validation (if provided)
    body("attributes")
        .optional()
        .isArray()
        .withMessage("Attributes should be an array"),

    body("attributes.*.name")
        .optional()
        .isString()
        .withMessage("Attribute name should be a string")
        .trim()
        .notEmpty()
        .withMessage("Attribute name cannot be empty"),

    body("attributes.*.widgetType")
        .optional()
        .custom((value: string) => {
            const validTypes = ["switch", "radio"];
            if (!validTypes.includes(value)) {
                throw new Error(
                    `Invalid widget type. Possible values are: [${validTypes.join(
                        ", ",
                    )}]`,
                );
            }
            return true;
        }),

    body("attributes.*.defaultValue")
        .optional()
        .notEmpty()
        .withMessage("Default value is required for attributes"),

    body("attributes.*.availableOptions")
        .optional()
        .isArray()
        .withMessage("Available options should be an array")
        .custom((value: string[]) => {
            if (
                !value.every(
                    (option) =>
                        typeof option === "string" && option.trim().length > 0,
                )
            ) {
                throw new Error(
                    "All available options must be non-empty strings",
                );
            }
            return true;
        }),
];
