import { z } from "zod";
import apiRequest from "./api";

export const dashboardFilterValidator = z.object({
    date: z.string().transform((val) => new Date(val))
});

export const usernameValidator = z.string().min(3, "Username deve contenere almeno 3 caratteri");

export const asyncUsernameValidator = z.string().min(3, "Username deve contenere almeno 3 caratteri").refine(async (value) => {
    const res = await apiRequest(`/users/check-username?username=${value}`);
    return res.data.available;
}, "Username già utilizzato");

export const emailValidator = z.string().email("Email non valida");

export const asyncEmailValidator = z.string().email("Email non valida").refine(async (value) => {
    const res = await apiRequest(`/users/check-email?email=${value}`);
    return res.data.available;
}, "Email già utilizzata");

export const passwordValidator = z.string().min(6, "Password deve contenere almeno 6 caratteri");

export const confirmPasswordValidator = z.string().min(6, "Password deve contenere almeno 6 caratteri").refine((value) => value === z.ref.password, "Le password non coincidono");

export const loginValidator = z.object({
    username: usernameValidator,
    password: passwordValidator
});

export const registerValidator = z.object({
    username: usernameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator
});

export const updatePasswordValidator = z.object({
    currentPassword: z.string().min(6, "Password attuale troppo corta"),
    newPassword: z.string().min(6, "Nuova password troppo corta"),
    confirmNewPassword: z.string().min(6, "La conferma deve corrispondere alla nuova password")
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Le password non coincidono",
    path: ["confirmNewPassword"]
});

export const userUpdateValidator = z.object({
    username: usernameValidator,
    email: emailValidator,
    role: z.enum(["admin", "user"]),
    isActive: z.boolean()
});

export const dashboardValidator = z.object({
    date: z.string().transform((val) => new Date(val)),
});

export const baseProductValidator = z.object({
    name: z.string().min(1, "Il nome del prodotto non può essere vuoto"),
    code: z.string().min(1, "Il codice del prodotto non può essere vuoto"),
    type: z.string().min(1, "Il tipo di prodotto non può essere vuoto")
});

export const createProductValidator = baseProductValidator.extend({
    initialQuantity: z.number().min(0, "La quantità iniziale deve essere zero o maggiore").optional(),
    minStock: z.number().min(0, "La quantità minima deve essere zero o maggiore").optional(),
    maxStock: z.number().min(0, "La quantità massima deve essere zero o maggiore").optional(),
    unitOfMeasure: z.string().min(1, "L'unità di misura non può essere vuota")
});

export const updateProductValidator = baseProductValidator.extend({
    id: z.string().min(1, "L'ID del prodotto non può essere vuoto"),
    initialQuantity: z.number().min(0, "La quantità iniziale deve essere zero o maggiore").optional(),
    minStock: z.number().min(0, "La quantità minima deve essere zero o maggiore").optional(),
    maxStock: z.number().min(0, "La quantità massima deve essere zero o maggiore").optional(),
    unitOfMeasure: z.string().min(1, "L'unità di misura non può essere vuota")
});

export const dashboardProductValidator = z.object({
    productId: z.string(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
});

export const dashboardUpdateValidator = dashboardValidator.extend({
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const dashboardCreateValidator = dashboardValidator.extend({
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const dashboardDeleteValidator = dashboardValidator.extend({
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const productValidator = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    type: z.string(),
    initialQuantity: z.number(),
    minStock: z.number(),
    maxStock: z.number(),
    unitOfMeasure: z.string()
});

export const productionOrderValidator = z.object({
    id: z.string(),
    productId: z.string(),
    quantity: z.number(),
    status: z.string(),
    createdAt: z.string().transform((val) => new Date(val)),
    updatedAt: z.string().transform((val) => new Date(val))
});

export const productionOrderCreateValidator = z.object({
    productId: z.string(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore"),
    status: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const productionOrderUpdateValidator = z.object({
    id: z.string(),
    productId: z.string(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore"),
    status: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const productionOrderDeleteValidator = z.object({
    id: z.string()
});

export const stockMovementValidator = z.object({
    id: z.string(),
    productId: z.string(),
    quantity: z.number(),
    type: z.string(),
    createdAt: z.string().transform((val) => new Date(val)),
    updatedAt: z.string().transform((val) => new Date(val))
});

export const stockMovementCreateValidator = z.object({
    productId: z.string(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore"),
    type: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const stockMovementUpdateValidator = z.object({
    id: z.string(),
    productId: z.string(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore"),
    type: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const stockMovementDeleteValidator = z.object({
    id: z.string()
});

export const stockHistoryValidator = z.object({
    productId: z.string(),
    date: z.string().transform((val) => new Date(val)),
    quantity: z.number(),
    type: z.string(),
    createdAt: z.string().transform((val) => new Date(val)),
    updatedAt: z.string().transform((val) => new Date(val))
});

export const stockHistoryCreateValidator = z.object({
    productId: z.string(),
    date: z.string().transform((val) => new Date(val)).optional(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore").optional(),
    type: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const stockHistoryUpdateValidator = z.object({
    id: z.string(),
    productId: z.string(),
    date: z.string().transform((val) => new Date(val)).optional(),
    quantity: z.number().min(0, "La quantità deve essere zero o maggiore").optional(),
    type: z.string().optional(),
    createdAt: z.string().transform((val) => new Date(val)).optional(),
    updatedAt: z.string().transform((val) => new Date(val)).optional()
});

export const stockHistoryDeleteValidator = z.object({
    id: z.string()
});

export const dashboardReportValidator = z.object({
    startDate: z.string().transform((val) => new Date(val)),
    endDate: z.string().transform((val) => new Date(val)),
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
}); 

export const stockReportCreateValidator = z.object({
    startDate: z.string().transform((val) => new Date(val)).optional(),
    endDate: z.string().transform((val) => new Date(val)).optional(),
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const dashboardReportUpdateValidator = z.object({
    id: z.string(),
    startDate: z.string().transform((val) => new Date(val)).optional(),
    endDate: z.string().transform((val) => new Date(val)).optional(),
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const stockReportUpdateValidator = z.object({
    id: z.string(),
    startDate: z.string().transform((val) => new Date(val)).optional(),
    endDate: z.string().transform((val) => new Date(val)).optional(),
    products: z.array(
        z.object({
            id: z.string(),
            quantity: z.number().min(0, "La quantità deve essere zero o maggiore")
        })
    ).optional()
});

export const stockReportDeleteValidator = z.object({
    id: z.string()
});

